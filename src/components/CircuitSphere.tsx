"use client";
import { useEffect, useRef } from "react";

interface Props {
  mouseX: number;
  mouseY: number;
}

export default function CircuitSphere({ mouseX, mouseY }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const rotRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 520;
    canvas.width = size;
    canvas.height = size;

    const cx = size / 2;
    const cy = size / 2;
    const R = 200;

    // Generate nodes on sphere surface
    const nodes: { x3: number; y3: number; z3: number }[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
    for (let i = 0; i < 80; i++) {
      const y = 1 - (i / 79) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      nodes.push({
        x3: Math.cos(theta) * r,
        y3: y,
        z3: Math.sin(theta) * r,
      });
    }

    // Generate circuit-like edges
    const edges: [number, number][] = [];
    for (let i = 0; i < nodes.length; i++) {
      const n1 = nodes[i];
      const distances: { idx: number; d: number }[] = [];
      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue;
        const n2 = nodes[j];
        const d = Math.sqrt(
          (n1.x3 - n2.x3) ** 2 +
            (n1.y3 - n2.y3) ** 2 +
            (n1.z3 - n2.z3) ** 2
        );
        distances.push({ idx: j, d });
      }
      distances.sort((a, b) => a.d - b.d);
      distances.slice(0, 2).forEach(({ idx }) => {
        if (!edges.find(([a, b]) => (a === i && b === idx) || (a === idx && b === i))) {
          edges.push([i, idx]);
        }
      });
    }

    function rotateX(
      x: number,
      y: number,
      z: number,
      angle: number
    ): [number, number, number] {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return [x, y * cos - z * sin, y * sin + z * cos];
    }

    function rotateY(
      x: number,
      y: number,
      z: number,
      angle: number
    ): [number, number, number] {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return [x * cos + z * sin, y, -x * sin + z * cos];
    }

    function project(x: number, y: number, z: number): [number, number, number] {
      const fov = 800;
      const scale = fov / (fov + z * R);
      return [cx + x * R * scale, cy + y * R * scale, z];
    }

    let t = 0;

    function draw() {
      ctx!.clearRect(0, 0, size, size);

      // Smooth rotation toward mouse
      rotRef.current.x += (targetRef.current.x - rotRef.current.x) * 0.04;
      rotRef.current.y += (targetRef.current.y - rotRef.current.y) * 0.04;

      const autoRotY = t * 0.003;
      const mouseRotX = rotRef.current.x * 0.4;
      const mouseRotY = rotRef.current.y * 0.4;

      // Project all nodes
      const projected = nodes.map((n) => {
        let [x, y, z] = rotateY(n.x3, n.y3, n.z3, autoRotY + mouseRotY);
        [x, y, z] = rotateX(x, y, z, mouseRotX);
        const [px, py, pz] = project(x, y, z);
        return { px, py, pz, z };
      });

      // Draw edges (back to front)
      edges.forEach(([ai, bi]) => {
        const a = projected[ai];
        const b = projected[bi];
        const avgZ = (a.pz + b.pz) / 2;
        const opacity = (avgZ + 1) / 2;

        ctx!.beginPath();
        ctx!.moveTo(a.px, a.py);

        // Circuit-style: orthogonal segments
        const midX = (a.px + b.px) / 2;
        ctx!.lineTo(midX, a.py);
        ctx!.lineTo(midX, b.py);
        ctx!.lineTo(b.px, b.py);

        ctx!.strokeStyle = `rgba(0, 85, 164, ${opacity * 0.35})`;
        ctx!.lineWidth = 0.8;
        ctx!.stroke();
      });

      // Draw nodes
      projected.forEach(({ px, py, pz }) => {
        const opacity = (pz + 1) / 2;
        const r = 3 + opacity * 2;

        // Outer ring
        ctx!.beginPath();
        ctx!.arc(px, py, r + 2, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(0, 85, 164, ${opacity * 0.25})`;
        ctx!.lineWidth = 1;
        ctx!.stroke();

        // Inner dot
        ctx!.beginPath();
        ctx!.arc(px, py, r * 0.5, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(0, 51, 102, ${opacity * 0.85})`;
        ctx!.fill();

        // Square connector style on some nodes
        if (Math.random() > 0.85) {
          ctx!.strokeStyle = `rgba(0, 85, 164, ${opacity * 0.5})`;
          ctx!.strokeRect(px - 4, py - 4, 8, 8);
        }
      });

      // Outer circle border
      ctx!.beginPath();
      ctx!.arc(cx, cy, R + 10, 0, Math.PI * 2);
      ctx!.strokeStyle = "rgba(0, 51, 102, 0.1)";
      ctx!.lineWidth = 1;
      ctx!.stroke();

      // Subtle radial gradient overlay
      const grad = ctx!.createRadialGradient(cx, cy, 0, cx, cy, R + 10);
      grad.addColorStop(0, "rgba(249,249,249,0)");
      grad.addColorStop(1, "rgba(249,249,249,0.15)");
      ctx!.fillStyle = grad;
      ctx!.beginPath();
      ctx!.arc(cx, cy, R + 10, 0, Math.PI * 2);
      ctx!.fill();

      t++;
      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  // Sync mouse
  useEffect(() => {
    targetRef.current = { x: mouseY, y: mouseX };
  }, [mouseX, mouseY]);

  return (
    <div style={{ position: "relative" }}>
      {/* Glow background */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "360px",
          height: "360px",
          background:
            "radial-gradient(circle, rgba(0,85,164,0.12) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(20px)",
          pointerEvents: "none",
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          maxWidth: "100%",
          height: "auto",
        }}
      />
    </div>
  );
}
