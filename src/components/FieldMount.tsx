'use client'

import dynamic from 'next/dynamic'

/** Three.js loads as its own chunk and never touches the server render. */
const ParticleField = dynamic(() => import('./ParticleField'), { ssr: false })

export default function FieldMount() {
  return <ParticleField />
}
