// src/app/animate/AnimationContent.js
'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import perplexityLogo from '../Primary w. Off-White@2x.png'

export default function AnimationContent() {
  const [typedQuery, setTypedQuery] = useState('')
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [showCursor, setShowCursor] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const inputRef = useRef(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get('q')

  const typeQuery = useCallback(() => {
    if (!query) return;
    setIsTyping(true);
    let index = 0;

    const typeChar = () => {
      if (index < query.length) {
        setTypedQuery(query.slice(0, index + 1));
        index++;
        setTimeout(typeChar, 100);
      } else {
        setIsTyping(false);
        setTimeout(() => {
          router.push(`https://www.perplexity.ai/search?q=${encodeURIComponent(query)}`);
        }, 1000);
      }
    };

    typeChar();
  }, [query, router]);

  useEffect(() => {
    if (!query) return

    let typingTimeout

    const animateCursor = () => {
      const inputRect = inputRef.current.getBoundingClientRect()
      const targetX = inputRect.left + inputRect.width / 2
      const targetY = inputRect.top + inputRect.height / 2

      let startTime
      const duration = 1000 // 1 second for cursor movement

      function moveCursor(timestamp) {
        if (!startTime) startTime = timestamp
        const progress = (timestamp - startTime) / duration

        if (progress < 1) {
          setCursorPosition({
            x: progress * targetX,
            y: progress * targetY
          })
          requestAnimationFrame(moveCursor)
        } else {
          setCursorPosition({ x: targetX, y: targetY })
          setTimeout(() => {
            setShowCursor(false)
            typeQuery()
          }, 500) // Wait 500ms before starting to type
        }
      }

      requestAnimationFrame(moveCursor)
    }

    animateCursor()

    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout)
      }
    }
  }, [query, router])

  const [showAskButton, setShowAskButton] = useState(true)
  const askButtonRef = useRef(null)

  const moveToAskButton = useCallback(() => {
    if (!askButtonRef.current) return

    const buttonRect = askButtonRef.current.getBoundingClientRect()
    const targetX = buttonRect.left + buttonRect.width / 2
    const targetY = buttonRect.top + buttonRect.height / 2

    let startTime
    const duration = 1000 // 1 second for cursor movement to button

    function moveCursor(timestamp) {
      if (!startTime) startTime = timestamp
      const progress = (timestamp - startTime) / duration

      if (progress < 1) {
        setCursorPosition(prevPos => ({
          x: prevPos.x + (targetX - prevPos.x) * progress,
          y: prevPos.y + (targetY - prevPos.y) * progress
        }))
        requestAnimationFrame(moveCursor)
      } else {
        setCursorPosition({ x: targetX, y: targetY })
        setTimeout(() => {
          setShowCursor(false)
          router.push(`https://www.perplexity.ai/search?q=${encodeURIComponent(query)}`)
        }, 200)
      }
    }

    setShowCursor(true)
    requestAnimationFrame(moveCursor)
  }, [cursorPosition, query, router])

  useEffect(() => {
    if (!isTyping && typedQuery === query) {
      moveToAskButton()
    }
  }, [isTyping, typedQuery, query, moveToAskButton])

  if (!query) {
    return <div className="text-center text-red-500 mt-8">Error: No search query provided.</div>
  }

  return (
    <div className="w-full min-h-screen bg-[#121212] text-white flex flex-col items-center justify-center p-4">
      {showCursor && (
        <div 
          className="fixed pointer-events-none z-50"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
            transition: 'all 0.1s ease-out',
            transform: 'translate(-4px, -2px)' // Adjust cursor position
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.500002 1.19841L0.500002 16.8829L5.31717 12.4976L5.46026 12.3673H5.65376H11.7841L0.500002 1.19841Z" fill="black" stroke="white"/>
            <path d="M5.65376 12.3673L11.7841 12.3673L7.5 16L5.65376 12.3673Z" fill="black" stroke="white"/>
          </svg>
        </div>
      )}
      <Image
        src={perplexityLogo}
        alt="Perplexity Logo"
        width={200}
        height={50}
        className="mb-6"
      />
      <h1 className="text-4xl font-bold mb-8">Where knowledge begins</h1>
      <div className="w-full max-w-2xl">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={typedQuery}
            readOnly
            className="w-full px-6 py-4 text-lg bg-[#1E1E1E] text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
          </div>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            <span className="text-gray-400">Pro</span>
            {showAskButton && (
              <button
                ref={askButtonRef}
                className="bg-white text-black px-4 py-2 rounded-full"
              >
                Ask
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 w-full max-w-2xl">
        <button className="bg-[#1E1E1E] text-white px-4 py-3 rounded-xl text-left">
          🔍 How is Perplexity AI different?
        </button>
        <button className="bg-[#1E1E1E] text-white px-4 py-3 rounded-xl text-left">
          💾 Size of the Meta GPU cluster
        </button>
        <button className="bg-[#1E1E1E] text-white px-4 py-3 rounded-xl text-left">
          ✈️ Most popular travel destinations 2024
        </button>
        <button className="bg-[#1E1E1E] text-white px-4 py-3 rounded-xl text-left">
          💰 What is a high-yield savings account?
        </button>
      </div>
    </div>
  )
}
