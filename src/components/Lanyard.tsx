import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera, Environment } from '@react-three/drei';
import { Physics, RigidBody, BallCollider } from '@react-three/rapier';
import * as THREE from 'three';
import cardGLB from '../assets/card.glb';
import lanyard from '../assets/lanyard.png';

function Card({ scale = 1 }) {
  const group = useRef<THREE.Group>(null);
  const rigidBodyRef = useRef<any>(null);
  const { scene } = useGLTF(cardGLB);
  const cardModel = scene.clone();

  const [isDragging, setIsDragging] = useState(false);
  const [hasSettled, setHasSettled] = useState(false);
  const [initialRotation] = useState(new THREE.Euler(0.1, 0.2, 0));
  const mousePos = useRef(new THREE.Vector2(0, 0));
  const targetPos = useRef(new THREE.Vector3(0, 0, 0));
  const { camera, size } = useThree();

  useEffect(() => {
    cardModel.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (mesh.material) {
          const material = mesh.material as THREE.MeshStandardMaterial;
          material.metalness = 0.6;
          material.roughness = 0.4;
          material.envMapIntensity = 1.5;
        }
      }
    });
  }, [cardModel]);

  useFrame((state) => {
    if (!rigidBodyRef.current || !group.current) return;

    const currentPos = rigidBodyRef.current.translation();

    // Check if the card has fallen to its resting position
    if (!hasSettled && currentPos.y <= 0.1) {
        setHasSettled(true);
        rigidBodyRef.current.setGravityScale(0, true);
        rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
        rigidBodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
        rigidBodyRef.current.setTranslation({ x: 0, y: 0, z: 0}, true);
    }


    if (hasSettled && !isDragging) {
      const time = state.clock.getElapsedTime();
      const hoverY = Math.sin(time * 0.5) * 0.1;
      const hoverRotation = Math.sin(time * 0.3) * 0.05;

      rigidBodyRef.current.setTranslation(
        { x: 0, y: hoverY, z: 0 },
        true
      );

      group.current.rotation.x = initialRotation.x + hoverRotation;
      group.current.rotation.y = initialRotation.y + Math.sin(time * 0.4) * 0.1;
    } else if (isDragging) {
      const mouse3D = new THREE.Vector3(
        (mousePos.current.x / size.width) * 2 - 1,
        -(mousePos.current.y / size.height) * 2 + 1,
        0.5
      );

      mouse3D.unproject(camera);
      mouse3D.sub(camera.position).normalize();
      const distance = -camera.position.z / mouse3D.z;
      targetPos.current.copy(camera.position).add(mouse3D.multiplyScalar(distance));

      targetPos.current.y = Math.max(-2, Math.min(2, targetPos.current.y));
      targetPos.current.x = Math.max(-3, Math.min(3, targetPos.current.x));

      const currentPos = rigidBodyRef.current.translation();
      const lerpFactor = 0.15;
      const newX = THREE.MathUtils.lerp(currentPos.x, targetPos.current.x, lerpFactor);
      const newY = THREE.MathUtils.lerp(currentPos.y, targetPos.current.y, lerpFactor);

      rigidBodyRef.current.setTranslation({ x: newX, y: newY, z: 0 }, true);

      const velocity = rigidBodyRef.current.linvel();
      group.current.rotation.x = initialRotation.x - velocity.y * 0.3;
      group.current.rotation.y = initialRotation.y + velocity.x * 0.3;
      group.current.rotation.z = -velocity.x * 0.2;
    }
  });

  const handlePointerDown = () => {
    if (!hasSettled) return;
    setIsDragging(true);
    if (rigidBodyRef.current) {
      rigidBodyRef.current.setGravityScale(0, true);
    }
  };

  const handlePointerUp = () => {
    if (!hasSettled) return;
    setIsDragging(false);
    if (rigidBodyRef.current) {
      rigidBodyRef.current.setGravityScale(0, true);
      rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      rigidBodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
    }
  };

  const handlePointerMove = (e: any) => {
    if (!isDragging) return;
    mousePos.current.set(e.clientX, e.clientY);
  };

  return (
    <RigidBody
      ref={rigidBodyRef}
      colliders={false}
      position={[0, 4, 0]}
      gravityScale={1}
      linearDamping={0.5}
      angularDamping={1}
    >
      <BallCollider args={[0.5]} />
      <group
        ref={group}
        scale={scale}
        rotation={initialRotation}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerOut={handlePointerUp}
        onPointerMove={handlePointerMove}
      >
        <primitive object={cardModel} />
      </group>
    </RigidBody>
  );
}

function Rope() {
  const points = [];
  const numPoints = 30;

  for (let i = 0; i < numPoints; i++) {
    const y = (i / (numPoints - 1)) * 4 - 0.2; // Made the rope longer
    points.push(new THREE.Vector3(0, y, 0));
  }

  const curve = new THREE.CatmullRomCurve3(points);
  const tubeGeometry = new THREE.TubeGeometry(curve, 64, 0.015, 8, false);

  const texture = new THREE.TextureLoader().load(lanyard);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 4);

  return (
    <mesh geometry={tubeGeometry} position={[0, 1.3, 0]}>
      <meshStandardMaterial
        map={texture}
        roughness={0.7}
        metalness={0.1}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <spotLight
        position={[-5, 5, 2]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        castShadow
      />
      <Environment preset="studio" />
      <Rope />
      <Physics gravity={[0, -9.8, 0]}>
        <Card scale={1.8} />
      </Physics>
    </>
  );
}

export default function Lanyard() {
  return (
    <div className="relative w-full h-full pointer-events-none bg-black/95 backdrop-blur-sm">
      <Canvas shadows className="pointer-events-auto">
        <Scene />
      </Canvas>
    </div>
  );
}
