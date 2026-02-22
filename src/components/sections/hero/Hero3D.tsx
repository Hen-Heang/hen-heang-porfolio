"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei"
import { Suspense, useRef, useState } from "react"
import { motion } from "framer-motion-3d"
import * as THREE from "three"

function AnimatedSphere(props: any) {
    const mesh = useRef<THREE.Mesh>(null!)
    const [hovered, setHover] = useState(false)

    useFrame((state, delta) => {
        if (mesh.current) {
            mesh.current.rotation.x += delta * 0.2
            mesh.current.rotation.y += delta * 0.3
        }
    })

    return (
        <Sphere args={[1, 100, 200]} scale={2.4} ref={mesh} {...props}>
            <MeshDistortMaterial
                color={hovered ? "#4f46e5" : "#14b8a6"} // Indigo to Teal
                attach="material"
                distort={0.5}
                speed={2}
                roughness={0.4}
                metalness={0.8}
            />
        </Sphere>
    )
}

function FloatingShapes() {
    return (
        <Float
            speed={4} // Animation speed, defaults to 1
            rotationIntensity={1} // XYZ rotation intensity, defaults to 1
            floatIntensity={2} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        >
            <AnimatedSphere />
            
            {/* Tiny orbiting particles */}
            <mesh position={[2, 2, 2]}>
                <sphereGeometry args={[0.2, 32, 32]} />
                <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={2} />
            </mesh>
            <mesh position={[-2, -2, -1]}>
                <sphereGeometry args={[0.15, 32, 32]} />
                <meshStandardMaterial color="#14b8a6" emissive="#14b8a6" emissiveIntensity={2} />
            </mesh>
            <mesh position={[2, -1, 1]}>
                <sphereGeometry args={[0.1, 32, 32]} />
                <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={2} />
            </mesh>
        </Float>
    )
}

export default function Hero3D() {
    return (
        <div className="w-full h-full min-h-[400px] flex items-center justify-center relative z-10">
            <Canvas className="w-full h-full bg-transparent">
                <ambientLight intensity={0.5} />
                <directionalLight position={[3, 2, 1]} intensity={1.5} />
                <Suspense fallback={null}>
                    <FloatingShapes />
                </Suspense>
            </Canvas>
        </div>
    )
}
