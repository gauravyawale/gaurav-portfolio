"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      // Fallback if WebGL is disabled
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 32;

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle nodes configuration
    const particleCount = 130;
    const maxDistance = 7.5;
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    // Create random particles in a bounded volume
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 45;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 35;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      velocities.push({
        x: (Math.random() - 0.5) * 0.025,
        y: (Math.random() - 0.5) * 0.025,
        z: (Math.random() - 0.5) * 0.015,
      });
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    // Dynamic texture generation based on theme
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");

    let isDark = document.documentElement.classList.contains("dark");

    const updateCanvasTexture = (darkMode: boolean) => {
      if (!ctx) return;
      ctx.clearRect(0, 0, 32, 32);
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      if (darkMode) {
        gradient.addColorStop(0, "rgba(56, 189, 248, 1)");
        gradient.addColorStop(0.3, "rgba(56, 189, 248, 0.7)");
        gradient.addColorStop(0.7, "rgba(168, 85, 247, 0.35)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else {
        gradient.addColorStop(0, "rgba(2, 132, 199, 0.95)");
        gradient.addColorStop(0.35, "rgba(14, 165, 233, 0.65)");
        gradient.addColorStop(0.7, "rgba(124, 58, 237, 0.3)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      }
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(16, 16, 16, 0, Math.PI * 2);
      ctx.fill();
    };

    updateCanvasTexture(isDark);
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particlesMaterial = new THREE.PointsMaterial({
      size: 1.3,
      map: particleTexture,
      transparent: true,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particleSystem);

    // Connecting Lines
    const maxLineConnections = 250;
    const linePositions = new Float32Array(maxLineConnections * 2 * 3);
    const lineColors = new Float32Array(maxLineConnections * 2 * 3);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    );
    lineGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(lineColors, 3)
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.35 : 0.4,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
    });

    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    // Listen for class changes on document.documentElement to switch materials
    const mutationObserver = new MutationObserver(() => {
      const currentDark = document.documentElement.classList.contains("dark");
      if (currentDark !== isDark) {
        isDark = currentDark;
        updateCanvasTexture(isDark);
        particleTexture.needsUpdate = true;
        particlesMaterial.blending = isDark
          ? THREE.AdditiveBlending
          : THREE.NormalBlending;
        particlesMaterial.needsUpdate = true;

        lineMaterial.blending = isDark
          ? THREE.AdditiveBlending
          : THREE.NormalBlending;
        lineMaterial.opacity = isDark ? 0.35 : 0.45;
        lineMaterial.needsUpdate = true;
      }
    });

    mutationObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Mouse Interaction
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetMouseX = x * 6;
      targetMouseY = -y * 6;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Lerp mouse effect
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      camera.position.x = mouseX;
      camera.position.y = mouseY;
      camera.lookAt(scene.position);

      // Particle movements & boundary bounces
      const posArray = particlesGeometry.attributes.position.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        posArray[i3] += velocities[i].x;
        posArray[i3 + 1] += velocities[i].y;
        posArray[i3 + 2] += velocities[i].z;

        // Boundaries
        if (posArray[i3] > 25 || posArray[i3] < -25) velocities[i].x *= -1;
        if (posArray[i3 + 1] > 20 || posArray[i3 + 1] < -20) velocities[i].y *= -1;
        if (posArray[i3 + 2] > 12 || posArray[i3 + 2] < -12) velocities[i].z *= -1;
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      // Update lines between nearby particles
      let lineIndex = 0;
      let colorIndex = 0;
      const linePosArray = lineGeometry.attributes.position.array as Float32Array;
      const lineColArray = lineGeometry.attributes.color.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          if (lineIndex >= maxLineConnections * 6) break;

          const dx = posArray[i * 3] - posArray[j * 3];
          const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
          const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance) {
            // First vertex
            linePosArray[lineIndex++] = posArray[i * 3];
            linePosArray[lineIndex++] = posArray[i * 3 + 1];
            linePosArray[lineIndex++] = posArray[i * 3 + 2];

            // Second vertex
            linePosArray[lineIndex++] = posArray[j * 3];
            linePosArray[lineIndex++] = posArray[j * 3 + 1];
            linePosArray[lineIndex++] = posArray[j * 3 + 2];

            const alphaFactor = 1 - dist / maxDistance;
            if (isDark) {
              // Dark mode neon cyan to violet
              lineColArray[colorIndex++] = 0.22 * alphaFactor;
              lineColArray[colorIndex++] = 0.74 * alphaFactor;
              lineColArray[colorIndex++] = 0.97 * alphaFactor;

              lineColArray[colorIndex++] = 0.66 * alphaFactor;
              lineColArray[colorIndex++] = 0.33 * alphaFactor;
              lineColArray[colorIndex++] = 0.97 * alphaFactor;
            } else {
              // Light mode deep cyan-blue to purple
              lineColArray[colorIndex++] = 0.02 * alphaFactor;
              lineColArray[colorIndex++] = 0.52 * alphaFactor;
              lineColArray[colorIndex++] = 0.78 * alphaFactor;

              lineColArray[colorIndex++] = 0.48 * alphaFactor;
              lineColArray[colorIndex++] = 0.23 * alphaFactor;
              lineColArray[colorIndex++] = 0.92 * alphaFactor;
            }
          }
        }
      }

      lineGeometry.setDrawRange(0, lineIndex / 3);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      // Gentle global rotation
      particleSystem.rotation.y = elapsedTime * 0.03;
      lineMesh.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      mutationObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-75 transition-opacity duration-300"
      aria-hidden="true"
    />
  );
}
