// src/app/page.js
'use client'

import { useState, useEffect, useRef } from 'react'

export default function Home() {
  const [query, setQuery] = useState('')
  const [clipboardMessage, setClipboardMessage] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [generatedUrl, setGeneratedUrl] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      const path = `/go?q=${encodeURIComponent(query)}`
      const fullUrl = `${window.location.origin}${path}`
      setGeneratedUrl(fullUrl)
      navigator.clipboard.writeText(fullUrl).then(() => {
        setClipboardMessage('Copied to clipboard')
        setIsVisible(true)
        setTimeout(() => setIsVisible(false), 2700) // Start fade out after 2.7 seconds
      })
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedUrl).then(() => {
      setClipboardMessage('Copied to clipboard')
      setIsVisible(true)
      setTimeout(() => setIsVisible(false), 2700)
    })
  }

  const handleTryIt = () => {
    window.open(generatedUrl, '_blank')
  }

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 relative"
      style={{
        backgroundImage: "url('/background.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <h1 className="text-4xl font-bold mb-2 text-white text-shadow-lg">
        Let me <span className="line-through text-red-300">google</span> plex that for you.
      </h1>
      <p className="text-lg mb-8 text-center text-white text-shadow">It&apos;s a new world. Teach your friends.</p>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What do you want them to know?"
          className="w-full px-4 py-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ref={inputRef}
          autoFocus
        />
        <button
          type="submit"
          className="w-full mt-4 px-4 py-2 text-lg text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Generate & Copy Link
        </button>
      </form>
      <div 
        className={`mt-4 text-yellow-300 font-bold text-shadow-lg bg-black bg-opacity-50 px-3 py-1 rounded transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {clipboardMessage}
      </div>
      {generatedUrl && (
        <div className="w-full max-w-md mt-4 flex items-center">
          <input
            type="text"
            value={generatedUrl}
            readOnly
            className="flex-grow px-4 py-2 text-sm bg-gray-100 border border-gray-300 rounded-l-md focus:outline-none"
          />
          <button
            onClick={handleCopy}
            className="px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Copy
          </button>
          <button
            onClick={handleTryIt}
            className="px-4 py-2 text-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-r-md flex items-center"
          >
            Try it
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
        </div>
      )}
      
      <p className="mt-8 text-sm text-white text-shadow text-center max-w-2xl">
        Yes, the verb is &quot;plex,&quot; <a href="https://x.com/aravsrinivas/status/1827484208459345995" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">according to</a> the founder of Perplexity.
        <br />
        Made by{' '}
        <a href="https://www.gkogan.co" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">
          Greg Kogan
        </a>{' '}
        (<a href="https://x.com/grigoriy_kogan" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">
          X
        </a>
        ). Not affiliated with Perplexity in any way.
      </p>
    </div>
  )
}