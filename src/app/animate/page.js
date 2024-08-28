// src/app/animate/page.js
import { Suspense } from 'react'
import AnimationContent from './AnimationContent'

export default function Animate() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Suspense fallback={<div>Loading...</div>}>
        <AnimationContent />
      </Suspense>
    </div>
  )
}