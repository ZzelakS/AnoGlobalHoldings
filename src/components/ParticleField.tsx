'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * THE PARTICLE FIELD
 *
 * The masked particle dome returns, recoloured to the brand. A hemisphere of
 * points cropped by the frame so the rim reads as a horizon, dense at the edge
 * and dissolving toward the crown, drifting slowly.
 *
 * Gold carries the band low on the dome, forest green sits behind it, and a
 * thin sage line runs the rim. Pointer proximity lifts nearby points; tapping
 * sends a ripple across the surface.
 *
 * THEME: additive blending on a light parchment ground turns to mush, so the
 * material switches. Dark mode blends additively with luminous points; light
 * mode blends normally with dark points that read as ink on paper. Both the
 * palette and the blend mode swap when the theme does.
 */

const VERT = /* glsl */ `
  attribute float aSeed;
  attribute float aKind;   // 0 base, 1 gold, 2 sage
  attribute float aJitter;

  uniform float uTime, uSpeed, uPointSize, uDpr;
  uniform float uMaskStart, uMaskSolid;
  uniform float uRipple, uRippleAmp, uIntro;
  uniform vec3  uPointer;

  varying float vAlpha;
  varying float vKind;
  varying float vHot;

  void main() {
    vec3 p = position;

    float wob = sin(uTime * 0.35 * uSpeed + aSeed * 6.2831) * 0.5 + 0.5;
    p *= 1.0 + wob * 0.012 * aJitter;

    float d = distance(normalize(p), uPointer);
    float band = exp(-pow((d - uRipple * 3.2) * 3.4, 2.0)) * uRippleAmp;
    p *= 1.0 + band * 0.045;

    // the mask: crown dissolves, rim stays solid
    float h = clamp(p.y / 3.0, 0.0, 1.0);
    float mask = mix(1.0, 0.14, smoothstep(uMaskStart, uMaskSolid, h));
    float rim = smoothstep(0.55, 0.02, h);

    float near = 1.0 - smoothstep(0.0, 0.7, d);

    vHot = band;
    vKind = aKind;
    vAlpha = mask * (0.45 + rim * 0.8) * (0.65 + near * 0.6 + band * 1.4) * uIntro;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = clamp(
      uPointSize * 34.0 * uDpr * (0.7 + aSeed * 0.7) / max(-mv.z, 0.1),
      0.5, 6.0 * uDpr
    );
  }
`

const FRAG = /* glsl */ `
  precision mediump float;
  uniform vec3  uBase, uGold, uSage, uFlash;
  uniform float uOpacity;
  varying float vAlpha;
  varying float vKind;
  varying float vHot;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float soft = smoothstep(0.5, 0.06, d);

    vec3 col = uBase;
    if (vKind > 1.5) col = uSage;
    else if (vKind > 0.5) col = uGold;
    col = mix(col, uFlash, vHot * 0.8);

    gl_FragColor = vec4(col, soft * vAlpha * uOpacity);
  }
`

const PALETTE = {
  dark: {
    base: 0x2f6f57,
    gold: 0xd9a94e,
    sage: 0x74c476,
    flash: 0xfff3dc,
    opacity: 1.0,
  },
  light: {
    base: 0x1b4332,
    gold: 0xb8893b,
    sage: 0x2d6a4f,
    flash: 0x0e1a14,
    opacity: 0.62,
  },
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true })
    } catch {
      return
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    renderer.setPixelRatio(dpr)
    renderer.setSize(window.innerWidth, window.innerHeight, false)
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100)
    const group = new THREE.Group()
    scene.add(group)

    const narrow = window.innerWidth < 760
    const COUNT = narrow ? 14000 : 38000
    const R = 3.0

    const positions = new Float32Array(COUNT * 3)
    const seeds = new Float32Array(COUNT)
    const kinds = new Float32Array(COUNT)
    const jitter = new Float32Array(COUNT)

    for (let i = 0; i < COUNT; i++) {
      const cosT = Math.random()
      const phi = Math.random() * Math.PI * 2
      const sinT = Math.sqrt(1 - cosT * cosT)
      const r = R * (1 - Math.pow(Math.random(), 2.6) * 0.05)

      const x = r * sinT * Math.cos(phi)
      const y = r * cosT
      const z = r * sinT * Math.sin(phi)

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      seeds[i] = Math.random()
      jitter[i] = Math.random()

      const hNorm = y / R
      let kind = 0
      if (hNorm < 0.36 && Math.random() < 0.5) kind = 1 // gold band low on the dome
      if (hNorm < 0.09 && Math.random() < 0.35) kind = 2 // sage at the rim
      kinds[i] = kind
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))
    geo.setAttribute('aKind', new THREE.BufferAttribute(kinds, 1))
    geo.setAttribute('aJitter', new THREE.BufferAttribute(jitter, 1))
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), R * 1.4)

    const uniforms: Record<string, THREE.IUniform> = {
      uTime: { value: 0 },
      uSpeed: { value: 1 },
      uPointSize: { value: narrow ? 0.095 : 0.105 },
      uDpr: { value: dpr },
      uMaskStart: { value: 0.2 },
      uMaskSolid: { value: 0.62 },
      uOpacity: { value: 0 },
      uIntro: { value: 0 },
      uRipple: { value: 2 },
      uRippleAmp: { value: 0 },
      uPointer: { value: new THREE.Vector3(0, 1, 0) },
      uBase: { value: new THREE.Color() },
      uGold: { value: new THREE.Color() },
      uSage: { value: new THREE.Color() },
      uFlash: { value: new THREE.Color() },
    }

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      depthTest: false,
    })

    let targetOpacity = 0.9

    /** Palette and blend mode both follow the theme. */
    const applyTheme = () => {
      const isDark = document.documentElement.classList.contains('dark')
      const p = isDark ? PALETTE.dark : PALETTE.light
      uniforms.uBase.value.setHex(p.base)
      uniforms.uGold.value.setHex(p.gold)
      uniforms.uSage.value.setHex(p.sage)
      uniforms.uFlash.value.setHex(p.flash)
      targetOpacity = p.opacity
      material.blending = isDark ? THREE.AdditiveBlending : THREE.NormalBlending
      material.needsUpdate = true
    }
    applyTheme()

    const themeWatcher = new MutationObserver(applyTheme)
    themeWatcher.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    const points = new THREE.Points(geo, material)
    points.frustumCulled = false
    group.add(points)

    const place = () => {
      const w = window.innerWidth
      if (w < 760) {
        camera.position.set(0, 0.2, 5.6)
        camera.fov = 56
        group.position.set(0, -1.0, 0)
      } else if (w < 1180) {
        camera.position.set(0, 0.3, 5.4)
        camera.fov = 50
        group.position.set(0.3, -1.1, 0)
      } else {
        camera.position.set(0, 0.35, 5.2)
        camera.fov = 46
        group.position.set(0.9, -1.15, 0)
      }
      camera.lookAt(group.position.x * 0.5, -0.1, 0)
      camera.aspect = w / window.innerHeight
      camera.updateProjectionMatrix()
    }

    const resize = () => {
      place()
      const next = Math.min(window.devicePixelRatio || 1, 2)
      renderer.setPixelRatio(next)
      renderer.setSize(window.innerWidth, window.innerHeight, false)
      uniforms.uDpr.value = next
    }
    window.addEventListener('resize', resize, { passive: true })
    resize()

    const ndc = new THREE.Vector2(0, 0)
    const eased = new THREE.Vector2(0, 0)
    const ray = new THREE.Raycaster()
    const sphere = new THREE.Sphere(new THREE.Vector3(), R)
    const hit = new THREE.Vector3()

    const onMove = (e: PointerEvent) => {
      ndc.x = (e.clientX / window.innerWidth) * 2 - 1
      ndc.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }

    let ripple = 2
    let rippleAmp = 0
    const onDown = (e: PointerEvent) => {
      const el = e.target as HTMLElement | null
      if (el?.closest('a, button, input, textarea, label, select')) return
      ripple = 0
      rippleAmp = 1
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })

    const clock = new THREE.Clock()
    let raf = 0
    let elapsed = 0
    let veil = 1

    if (reduced) {
      uniforms.uTime.value = 20
      uniforms.uIntro.value = 1
      uniforms.uOpacity.value = targetOpacity
      renderer.render(scene, camera)
      const still = () => {
        resize()
        renderer.render(scene, camera)
      }
      window.addEventListener('resize', still, { passive: true })
      return () => {
        themeWatcher.disconnect()
        window.removeEventListener('resize', still)
        window.removeEventListener('resize', resize)
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerdown', onDown)
        geo.dispose()
        material.dispose()
        renderer.dispose()
      }
    }

    const frame = () => {
      raf = requestAnimationFrame(frame)
      if (document.hidden) return

      const dt = Math.min(clock.getDelta(), 0.05)
      elapsed += dt
      uniforms.uTime.value += dt
      uniforms.uIntro.value = Math.min(1, elapsed / 2.2)

      eased.x += (ndc.x - eased.x) * 0.045
      eased.y += (ndc.y - eased.y) * 0.045

      ray.setFromCamera(eased, camera)
      const local = ray.ray.intersectSphere(sphere.clone().translate(group.position), hit)
      if (local) uniforms.uPointer.value.copy(hit.clone().sub(group.position).normalize())

      if (rippleAmp > 0) {
        ripple += dt * 0.55
        rippleAmp = Math.max(0, 1 - ripple / 1.05)
      }
      uniforms.uRipple.value = ripple
      uniforms.uRippleAmp.value = rippleAmp

      const scrolled = window.scrollY / Math.max(1, window.innerHeight)
      veil += ((scrolled > 0.06 ? 0.4 : 1) - veil) * 0.05
      uniforms.uOpacity.value += (targetOpacity * veil - uniforms.uOpacity.value) * 0.08

      group.rotation.y += dt * 0.035
      group.rotation.z += (eased.x * 0.03 - group.rotation.z) * 0.03
      group.rotation.x += (-eased.y * 0.05 + scrolled * 0.1 - group.rotation.x) * 0.03

      renderer.render(scene, camera)
    }
    frame()

    return () => {
      cancelAnimationFrame(raf)
      themeWatcher.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      geo.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] block h-full w-full"
    />
  )
}
