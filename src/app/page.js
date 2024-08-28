// src/app/page.js
'use client'

import { useState, useEffect, useRef } from 'react'

export default function Home() {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      window.open(`/animate?q=${encodeURIComponent(query)}`, '_blank')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Let Me Plex That</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your search query"
          className="w-full px-4 py-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ref={inputRef}
          autoFocus
        />
        <button
          type="submit"
          className="w-full mt-4 px-4 py-2 text-lg text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Generate Link
        </button>
      </form>
    </div>
  )
}