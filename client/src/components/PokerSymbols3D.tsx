import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface SymbolProps {
  position: [number, number, number];
  color: string;
  rotation?: [number, number, number];
  scale?: number;
  speed?: number;
}

const Heart: React.FC<SymbolProps> = ({ position, color, rotation, scale = 1, speed = 1 }) => {
  const mesh = useRef<THREE.Mesh>(null);
  
  const heartShape = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    
    shape.moveTo(x, y + 0.5);
    shape.bezierCurveTo(x, y + 0.5, x - 0.5, y, x - 0.5, y - 0.5);
    shape.bezierCurveTo(x - 0.5, y - 1.5, x, y - 1.5, x, y - 1.5);
    shape.bezierCurveTo(x, y - 1.5, x + 0.5, y - 1.5, x + 0.5, y - 0.5);
    shape.bezierCurveTo(x + 0.5, y, x, y + 0.5, x, y + 0.5);
    
    return shape;
  }, []);
  
  const geometry = useMemo(() => {
    return new THREE.ExtrudeGeometry(heartShape, {
      depth: 0.2,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.1,
      bevelThickness: 0.1
    });
  }, [heartShape]);
  
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.003 * speed;
      mesh.current.rotation.y += 0.005 * speed;
    }
  });
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh
        ref={mesh}
        position={position}
        rotation={rotation}
        scale={[scale, scale, scale]}
        geometry={geometry}
      >
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
      </mesh>
    </Float>
  );
};

const Diamond: React.FC<SymbolProps> = ({ position, color, rotation, scale = 1, speed = 1 }) => {
  const mesh = useRef<THREE.Mesh>(null);
  
  const diamondShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 1);
    shape.lineTo(1, 0);
    shape.lineTo(0, -1);
    shape.lineTo(-1, 0);
    shape.lineTo(0, 1);
    return shape;
  }, []);
  
  const geometry = useMemo(() => {
    return new THREE.ExtrudeGeometry(diamondShape, {
      depth: 0.2,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.1,
      bevelThickness: 0.1
    });
  }, [diamondShape]);
  
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.003 * speed;
      mesh.current.rotation.y += 0.005 * speed;
    }
  });
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh
        ref={mesh}
        position={position}
        rotation={rotation}
        scale={[scale, scale, scale]}
        geometry={geometry}
      >
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
      </mesh>
    </Float>
  );
};

const Club: React.FC<SymbolProps> = ({ position, color, rotation, scale = 1, speed = 1 }) => {
  const mesh = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.003 * speed;
      mesh.current.rotation.y += 0.005 * speed;
    }
  });
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group
        ref={mesh}
        position={position}
        rotation={rotation}
        scale={[scale, scale, scale]}
      >
        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
        </mesh>
        <mesh position={[-0.5, -0.2, 0]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
        </mesh>
        <mesh position={[0.5, -0.2, 0]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
        </mesh>
        
        <mesh position={[0, -1, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 1.2, 16]} />
          <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
};

const Spade: React.FC<SymbolProps> = ({ position, color, rotation, scale = 1, speed = 1 }) => {
  const mesh = useRef<THREE.Group>(null);
  
  const spadeShape = useMemo(() => {
    const shape = new THREE.Shape();
    
    shape.moveTo(0, 1);
    shape.bezierCurveTo(0, 1, -1, 0.5, -1, -0.5);
    shape.bezierCurveTo(-1, -1.5, 0, -1.5, 0, -1);
    shape.bezierCurveTo(0, -1.5, 1, -1.5, 1, -0.5);
    shape.bezierCurveTo(1, 0.5, 0, 1, 0, 1);
    
    return shape;
  }, []);
  
  const geometry = useMemo(() => {
    return new THREE.ExtrudeGeometry(spadeShape, {
      depth: 0.2,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.1,
      bevelThickness: 0.1
    });
  }, [spadeShape]);
  
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.003 * speed;
      mesh.current.rotation.y += 0.005 * speed;
    }
  });
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group
        ref={mesh}
        position={position}
        rotation={rotation}
        scale={[scale, scale, scale]}
      >
        <mesh geometry={geometry}>
          <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
        </mesh>
        {/* La tige du pique */}
        <mesh position={[0, -1.3, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.7, 16]} />
          <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
};

interface SymbolData {
  type: 'heart' | 'diamond' | 'club' | 'spade';
  color: string;
  position: [number, number, number];
  scale: number;
  speed: number;
}

// Composant principal qui crée plusieurs symboles
const PokerSymbols3D: React.FC = () => {
  // Données des symboles à afficher
  const symbols: SymbolData[] = [
    { type: 'spade', color: '#aaaaaa', position: [-10, 3, -10], scale: 0.6, speed: 0.7 },
    { type: 'heart', color: '#d64545', position: [8, -3, -8], scale: 0.8, speed: 1.2 },
    { type: 'diamond', color: '#d64545', position: [-5, -5, -12], scale: 0.7, speed: 0.9 },
    { type: 'club', color: '#aaaaaa', position: [14, 6, -15], scale: 0.6, speed: 0.8 },
    { type: 'spade', color: '#aaaaaa', position: [5, 8, -18], scale: 0.9, speed: 1.3 },
    { type: 'heart', color: '#d64545', position: [-12, -8, -15], scale: 0.7, speed: 1 },
    { type: 'diamond', color: '#d64545', position: [18, -5, -20], scale: 0.8, speed: 1.5 },
    { type: 'club', color: '#aaaaaa', position: [-15, 10, -25], scale: 0.7, speed: 0.6 },
  ];

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" style={{ opacity: 0.5 }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.15} />
        
        {symbols.map((item, index) => {
          if (item.type === 'heart') {
            return (
              <Heart 
                key={index} 
                position={item.position} 
                color={item.color}
                speed={item.speed}
                scale={item.scale}
              />
            );
          } else if (item.type === 'diamond') {
            return (
              <Diamond 
                key={index} 
                position={item.position} 
                color={item.color}
                speed={item.speed}
                scale={item.scale}
              />
            );
          } else if (item.type === 'club') {
            return (
              <Club 
                key={index} 
                position={item.position} 
                color={item.color}
                speed={item.speed}
                scale={item.scale}
              />
            );
          } else if (item.type === 'spade') {
            return (
              <Spade 
                key={index} 
                position={item.position} 
                color={item.color}
                speed={item.speed}
                scale={item.scale}
              />
            );
          }
          return null;
        })}
      </Canvas>
    </div>
  );
};

export default PokerSymbols3D; 