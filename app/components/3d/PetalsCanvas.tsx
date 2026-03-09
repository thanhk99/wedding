"use client";

import { Canvas } from "@react-three/fiber";
import Petals from "./Petals";

export default function PetalsCanvas() {
    return (
        <Canvas
            camera={{ position: [0, 0, 10], fov: 60 }}
            style={{ width: "100%", height: "100%" }}
        >
            <ambientLight intensity={0.5} />
            <Petals count={80} />
        </Canvas>
    );
}
