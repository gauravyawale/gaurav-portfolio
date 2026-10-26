"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    // Isometric-angled camera looking down onto architectural CAD drafting plane
    camera.position.set(0, 24, 38);
    camera.lookAt(0, 0, 0);

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    let isDark = document.documentElement.classList.contains("dark");

    // Colors matching Architectural Studio aesthetic
    const getGridColor = (dark: boolean) =>
      dark ? new THREE.Color("#1e2330") : new THREE.Color("#d2d7e2");
    const getMajorLineColor = (dark: boolean) =>
      dark ? new THREE.Color("#2a2e3d") : new THREE.Color("#b8c0d1");
    const getCrosshairColor = (dark: boolean) =>
      dark ? new THREE.Color("#f59e0b") : new THREE.Color("#d97706");

    // Construct Architectural CAD Drafting Plane Lines
    const gridSize = 64;
    const gridDivisions = 32;
    const step = gridSize / gridDivisions;
    const half = gridSize / 2;

    const linePositions: number[] = [];
    const lineColors: number[] = [];

    const baseColor = getGridColor(isDark);
    const majorColor = getMajorLineColor(isDark);

    for (let i = 0; i <= gridDivisions; i++) {
      const coord = -half + i * step;
      const isMajor = i % 4 === 0;
      const col = isMajor ? majorColor : baseColor;

      // X lines (parallel to Z)
      linePositions.push(-half, 0, coord, half, 0, coord);
      lineColors.push(col.r, col.g, col.b, col.r, col.g, col.b);

      // Z lines (parallel to X)
      linePositions.push(coord, 0, -half, coord, 0, half);
      lineColors.push(col.r, col.g, col.b, col.r, col.g, col.b);
    }

    const gridGeometry = new THREE.BufferGeometry();
    gridGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    gridGeometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(lineColors, 3)
    );

    const gridMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.75 : 0.6,
      depthWrite: false,
    });

    const gridMesh = new THREE.LineSegments(gridGeometry, gridMaterial);
    scene.add(gridMesh);

    // Architectural Datum Crosshair Markers at Major Intersections
    const crosshairPositions: number[] = [];
    const crosshairSize = 0.35;

    for (let x = -half; x <= half; x += step * 4) {
      for (let z = -half; z <= half; z += step * 4) {
        // Horizontal tick
        crosshairPositions.push(
          x - crosshairSize,
          0.02,
          z,
          x + crosshairSize,
          0.02,
          z
        );
        // Vertical tick
        crosshairPositions.push(
          x,
          0.02,
          z - crosshairSize,
          x,
          0.02,
          z + crosshairSize
        );
      }
    }

    const crosshairGeometry = new THREE.BufferGeometry();
    crosshairGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(crosshairPositions, 3)
    );

    const crosshairMaterial = new THREE.LineBasicMaterial({
      color: getCrosshairColor(isDark),
      transparent: true,
      opacity: isDark ? 0.45 : 0.4,
      depthWrite: false,
    });

    const crosshairMesh = new THREE.LineSegments(
      crosshairGeometry,
      crosshairMaterial
    );
    scene.add(crosshairMesh);

    // Structural CAD Elevation Rulers along margins
    const rulerPositions: number[] = [];
    for (let x = -half; x <= half; x += step) {
      rulerPositions.push(x, 0.02, -half, x, 0.02, -half - 0.4);
      rulerPositions.push(x, 0.02, half, x, 0.02, half + 0.4);
    }

    const rulerGeometry = new THREE.BufferGeometry();
    rulerGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(rulerPositions, 3)
    );

    const rulerMaterial = new THREE.LineBasicMaterial({
      color: isDark ? 0xf59e0b : 0xd97706,
      transparent: true,
      opacity: isDark ? 0.5 : 0.4,
      depthWrite: false,
    });

    const rulerMesh = new THREE.LineSegments(rulerGeometry, rulerMaterial);
    scene.add(rulerMesh);

    // Watch Theme Changes
    const updateThemeColors = (dark: boolean) => {
      isDark = dark;
      const bColor = getGridColor(isDark);
      const mColor = getMajorLineColor(isDark);
      const cColor = getCrosshairColor(isDark);

      const colorAttr = gridGeometry.attributes.color as THREE.BufferAttribute;
      const colors = colorAttr.array as Float32Array;

      let cIdx = 0;
      for (let i = 0; i <= gridDivisions; i++) {
        const isMajor = i % 4 === 0;
        const col = isMajor ? mColor : bColor;
        for (let k = 0; k < 4; k++) {
          colors[cIdx++] = col.r;
          colors[cIdx++] = col.g;
          colors[cIdx++] = col.b;
        }
      }
      colorAttr.needsUpdate = true;

      crosshairMaterial.color.set(cColor);
      crosshairMaterial.opacity = isDark ? 0.45 : 0.4;
      crosshairMaterial.needsUpdate = true;

      rulerMaterial.color.set(isDark ? 0xf59e0b : 0xd97706);
      rulerMaterial.opacity = isDark ? 0.5 : 0.4;
      rulerMaterial.needsUpdate = true;
    };

    const mutationObserver = new MutationObserver(() => {
      const currentDark = document.documentElement.classList.contains("dark");
      if (currentDark !== isDark) {
        updateThemeColors(currentDark);
      }
    });

    mutationObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Mouse Interaction: Architectural Camera Pan / Tilt
    let targetX = 0;
    let targetZ = 38;
    let currentX = 0;
    let currentZ = 38;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = nx * 8;
      targetZ = 38 + ny * 6;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Resize
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

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      if (prefersReducedMotion) {
        renderer.render(scene, camera);
        return;
      }

      animationFrameId = requestAnimationFrame(animate);

      // Smooth camera interpolation
      currentX += (targetX - currentX) * 0.04;
      currentZ += (targetZ - currentZ) * 0.04;

      camera.position.x = currentX;
      camera.position.z = currentZ;
      camera.lookAt(0, 0, 0);

      // Very subtle slow drift along drafting axis
      gridMesh.rotation.y = Math.sin(Date.now() * 0.0001) * 0.02;
      crosshairMesh.rotation.y = gridMesh.rotation.y;
      rulerMesh.rotation.y = gridMesh.rotation.y;

      renderer.render(scene, camera);
    };

    if (prefersReducedMotion) {
      renderer.render(scene, camera);
    } else {
      animate();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      mutationObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      gridGeometry.dispose();
      gridMaterial.dispose();
      crosshairGeometry.dispose();
      crosshairMaterial.dispose();
      rulerGeometry.dispose();
      rulerMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-60 dark:opacity-75 transition-opacity duration-300"
      aria-hidden="true"
    />
  );
}
