/* eslint-disable react/no-unknown-property */
import React, { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  RigidBodyProps
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';
import cardGLB from '../assets/card.glb';
import lanyard from '../assets/lanyard.png';

extend({ MeshLineGeometry, MeshLineMaterial });

function Band({ maxSpeed = 50, minSpeed = 10, onDismiss, scrollJolt, onDragStart, onDragEnd, onPositionUpdate }: { maxSpeed?: number; minSpeed?: number; onDismiss: () => void; scrollJolt: number; onDragStart: () => void; onDragEnd: () => void; onPositionUpdate: (x: number, y: number) => void; }) {
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps: RigidBodyProps = {
    type: 'dynamic',
    canSleep: true,
    colliders: false,
    angularDamping: 5,
    linearDamping: 5
  };

  const { nodes, materials } = useGLTF(cardGLB) as any;
  const texture = useTexture(lanyard);
  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]));
  const [dragged, drag] = useState<THREE.Vector3 | false>(false);
  const [hovered, hover] = useState(false);
  const lastPointerY = useRef(0);
  const pointerYBeforeLast = useRef(0);
  const vel = useRef([0, 0, 0]);
  const lastPos = useRef([0, 0, 0]);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => {
        document.body.style.cursor = 'auto';
      };
    }
  }, [hovered, dragged]);

  useEffect(() => {
    if (scrollJolt !== 0 && j1.current) {
      j1.current.applyImpulse({ x: scrollJolt * 0.02, y: 0, z: 0 }, true);
    }
  }, [scrollJolt]);

  useFrame((state, delta) => {
    if (dragged) {
      pointerYBeforeLast.current = lastPointerY.current;
      lastPointerY.current = state.pointer.y;
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));

      if (lastPos.current) {
        const [lx, ly, lz] = lastPos.current;
        const newVelX = (vec.x - lx) / delta;
        const newVelY = (vec.y - ly) / delta;
        const newVelZ = (vec.z - lz) / delta;
        vel.current = [newVelX, newVelY, newVelZ];
      }
      lastPos.current = [vec.x, vec.y, vec.z];

      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }

    if (fixed.current) {
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.translation());
      curve.points[2].copy(j1.current.translation());
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));

      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });

      if (card.current) {
        const screenPosition = new THREE.Vector3();
        card.current.getWorldPosition(screenPosition);
        screenPosition.project(state.camera);
        const x = (screenPosition.x * 0.5 + 0.5) * state.size.width;
        const y = (-screenPosition.y * 0.5 + 0.5) * state.size.height;
        onPositionUpdate(x, y);
      }
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[6, 6, 0]}>
        <RigidBody ref={fixed} type="fixed" {...segmentProps} />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.8, 1.125, 0.08]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              onDragEnd();
              e.target.releasePointerCapture(e.pointerId);
              drag(false);

              const [vx, vy, vz] = vel.current;
              card.current.applyImpulse({ x: vx * 2, y: vy * 2, z: vz * 2 }, true);

              console.log('Vertical Flick Velocity:', vy);
              if (vy < -20) {
                onDismiss();
              }
            }}
            onPointerDown={(e) => {
              onDragStart();
              e.target.setPointerCapture(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={materials.base.map}
                map-anisotropy={16}
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.3}
                metalness={0.5}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={[1024, 1024]}
          useMap
          map={texture}
          repeat={[-3, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}

export default function Lanyard({ onDismiss, scrollJolt }: { onDismiss: () => void; scrollJolt: number }) {
  const wittyMessages = [
    'Hadi, daha hızlı fırlat!',
    'Yapabilirsin, az kaldı!',
    'Allync AI hizmetinizde.',
    'Beni göndermek için biraz daha salla!',
    'Hey, naber?',
    'Matrix\'e hoş geldin...',
    'Sıkı tut!'
  ];

  const [bubble, setBubble] = useState({ visible: false, text: '', x: 0, y: 0 });

  const handleDragStart = () => {
    const randomText = wittyMessages[Math.floor(Math.random() * wittyMessages.length)];
    setBubble(prev => ({ ...prev, visible: true, text: randomText }));
  };

  const handleDragEnd = () => {
    setBubble(prev => ({ ...prev, visible: false }));
  };

  const handleCardPositionUpdate = (x: number, y: number) => {
    setBubble(prev => ({ ...prev, x, y }));
  };

  return (
    <div className="w-full h-full pointer-events-none">
      <AnimatePresence>
        {bubble.visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 10 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            style={{
              position: 'absolute',
              top: bubble.y,
              left: bubble.x,
              transform: 'translate(20px, -110%)',
              zIndex: 999,
            }}
            className="pointer-events-none"
          >
            <div className="relative bg-white text-black py-2 px-4 rounded-lg shadow-xl">
              <p className="whitespace-nowrap font-semibold">{bubble.text}</p>
              <div
                className="absolute left-0 bottom-0 w-0 h-0 border-8 border-transparent border-t-white border-l-white"
                style={{ transform: 'translate(20px, 8px) rotate(45deg)' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
       <Canvas
        camera={{ position: [0, 0, 20], fov: 25 }}
        gl={{ alpha: true }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color('black'), 0)}
        style={{ pointerEvents: 'auto' }}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={[0, -40, 0]} timeStep={1 / 60}>
          <Band
            onDismiss={onDismiss}
            scrollJolt={scrollJolt}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onPositionUpdate={handleCardPositionUpdate}
          />
        </Physics>
        <Environment resolution={256}>
            <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}
