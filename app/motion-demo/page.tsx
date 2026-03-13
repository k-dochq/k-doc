"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CalendarCard {
  id: number
  month: string
  day: number
  dayOfWeek: string
  color: string
}

const calendarData: CalendarCard[] = [
  { id: 1, month: "September", day: 15, dayOfWeek: "FRIDAY", color: "#3B82F6" },
  { id: 2, month: "September", day: 16, dayOfWeek: "MONDAY", color: "#EF4444" },
  { id: 3, month: "September", day: 17, dayOfWeek: "TUESDAY", color: "#3B82F6" },
  { id: 4, month: "September", day: 18, dayOfWeek: "WEDNESDAY", color: "#10B981" },
  { id: 5, month: "September", day: 19, dayOfWeek: "THURSDAY", color: "#F59E0B" },
]

export default function MotionDemoPage() {
  const [currentIndex, setCurrentIndex] = useState(1)
  const [direction, setDirection] = useState(0)

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev === 0 ? calendarData.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev === calendarData.length - 1 ? 0 : prev + 1))
  }

  const getCardIndex = (offset: number) => {
    const index = currentIndex + offset
    if (index < 0) return calendarData.length + index
    if (index >= calendarData.length) return index - calendarData.length
    return index
  }

  const cardVariants = {
    left: {
      x: -280,
      rotateY: 45,
      scale: 0.85,
      zIndex: 1,
      opacity: 0.7,
    },
    center: {
      x: 0,
      rotateY: 0,
      scale: 1,
      zIndex: 10,
      opacity: 1,
    },
    right: {
      x: 280,
      rotateY: -45,
      scale: 0.85,
      zIndex: 1,
      opacity: 0.7,
    },
    exitLeft: {
      x: -400,
      rotateY: 60,
      scale: 0.7,
      zIndex: 0,
      opacity: 0,
    },
    exitRight: {
      x: 400,
      rotateY: -60,
      scale: 0.7,
      zIndex: 0,
      opacity: 0,
    },
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8">
      <h1 className="text-white text-3xl font-bold mb-12">3D Calendar Carousel</h1>
      
      <div 
        className="relative w-full max-w-4xl h-[500px] flex items-center justify-center"
        style={{ perspective: "1200px" }}
      >
        {/* Left Card */}
        <motion.div
          key={`left-${getCardIndex(-1)}`}
          className="absolute"
          initial={direction > 0 ? "exitLeft" : "center"}
          animate="left"
          variants={cardVariants}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            mass: 1
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <CalendarCardComponent card={calendarData[getCardIndex(-1)]} />
        </motion.div>

        {/* Center Card */}
        <motion.div
          key={`center-${currentIndex}`}
          className="absolute"
          initial={direction > 0 ? "right" : "left"}
          animate="center"
          variants={cardVariants}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            mass: 1
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <CalendarCardComponent card={calendarData[currentIndex]} isCenter />
        </motion.div>

        {/* Right Card */}
        <motion.div
          key={`right-${getCardIndex(1)}`}
          className="absolute"
          initial={direction < 0 ? "exitRight" : "center"}
          animate="right"
          variants={cardVariants}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            mass: 1
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <CalendarCardComponent card={calendarData[getCardIndex(1)]} />
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-6 mt-8">
        <button
          onClick={handlePrev}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <div className="flex gap-2">
          {calendarData.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1)
                setCurrentIndex(index)
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-white" : "bg-white/30"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

function CalendarCardComponent({ 
  card, 
  isCenter = false 
}: { 
  card: CalendarCard
  isCenter?: boolean 
}) {
  return (
    <div 
      className={`
        w-72 h-96 bg-[#F5F5F0] rounded-3xl shadow-2xl overflow-hidden
        flex flex-col items-center justify-between py-8
        ${isCenter ? "shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]" : ""}
      `}
      style={{ backfaceVisibility: "hidden" }}
    >
      {/* Month */}
      <span className="text-xl font-medium text-neutral-800 tracking-wide">
        {card.month}
      </span>

      {/* Day Number with decorative element */}
      <div className="relative flex items-center justify-center">
        <span 
          className="text-[140px] font-bold leading-none text-neutral-900"
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          {card.day}
        </span>
        
        {/* Decorative circle overlay */}
        <div 
          className="absolute w-24 h-24 rounded-full opacity-90"
          style={{ 
            backgroundColor: card.color,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            mixBlendMode: "multiply"
          }}
        />
      </div>

      {/* Day of Week */}
      <span className="text-lg font-bold tracking-widest text-neutral-900">
        {card.dayOfWeek}
      </span>
    </div>
  )
}
