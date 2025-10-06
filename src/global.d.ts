declare module 'meshline' {
  import { BufferGeometry, Material } from 'three';

  export class MeshLine extends BufferGeometry {
    setGeometry(geometry: BufferGeometry | Float32Array): void;
    setPoints(points: number[] | Float32Array): void;
  }

  export class MeshLineMaterial extends Material {
    constructor(parameters?: any);
    lineWidth: number;
    color: THREE.Color;
    opacity: number;
    resolution: THREE.Vector2;
    sizeAttenuation: number;
    dashArray: number;
    dashOffset: number;
    dashRatio: number;
    useMap: number;
    useAlphaMap: number;
    map: THREE.Texture | null;
    alphaMap: THREE.Texture | null;
    repeat: THREE.Vector2;
    visibility: number;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any;
      meshLineMaterial: any;
    }
  }
}

export {};
