// src/app/animate/page.js
'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function Animate() {
  const [typedQuery, setTypedQuery] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get('q')

  useEffect(() => {
    if (!query) {
      return
    }

    let charIndex = 0
    const typingInterval = setInterval(() => {
      if (charIndex < query.length) {
        setTypedQuery(prev => prev + query[charIndex])
        charIndex++
      } else {
        clearInterval(typingInterval)
        setTimeout(() => {
          router.push(`https://www.perplexity.ai/search?q=${encodeURIComponent(query)}`)
        }, 1000)
      }
    }, 100)

    return () => clearInterval(typingInterval)
  }, [query, router])

  if (!query) {
    return <div className="text-center text-red-500 mt-8">Error: No search query provided.</div>
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-4 bg-white rounded-lg shadow-md">
        <div className="mb-4 p-2 bg-gray-200 rounded">
          <span className="text-gray-600">https://www.perplexity.ai</span>
        </div>
        <div className="mt-8">
          <input
            type="text"
            value={typedQuery}
            readOnly
            className="w-full px-4 py-2 text-lg border border-gray-300 rounded-md"
          />
        </div>
      </div>
    </div>
  )
}
