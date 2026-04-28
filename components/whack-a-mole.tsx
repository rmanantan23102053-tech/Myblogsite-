"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Play, RotateCcw, Trophy, Timer, Zap } from "lucide-react"

type MoleState = "hidden" | "visible" | "whacked"

interface Hole {
  id: number
  state: MoleState
}

export function WhackAMole() {
  const [holes, setHoles] = useState<Hole[]>(
    Array.from({ length: 9 }, (_, i) => ({ id: i, state: "hidden" as MoleState }))
  )
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [isPlaying, setIsPlaying] = useState(false)
  const [combo, setCombo] = useState(0)
  const [lastWhackTime, setLastWhackTime] = useState(0)
  const gameIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Load high score from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("whackamole-highscore")
    if (saved) setHighScore(parseInt(saved, 10))
  }, [])

  // Save high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score)
      localStorage.setItem("whackamole-highscore", score.toString())
    }
  }, [score, highScore])

  const startGame = useCallback(() => {
    setScore(0)
    setTimeLeft(30)
    setIsPlaying(true)
    setCombo(0)
    setHoles(Array.from({ length: 9 }, (_, i) => ({ id: i, state: "hidden" })))
  }, [])

  const endGame = useCallback(() => {
    setIsPlaying(false)
    if (gameIntervalRef.current) clearInterval(gameIntervalRef.current)
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current)
    setHoles(Array.from({ length: 9 }, (_, i) => ({ id: i, state: "hidden" })))
  }, [])

  // Game timer
  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endGame()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current)
    }
  }, [isPlaying, endGame])

  // Mole spawning logic
  useEffect(() => {
    if (isPlaying) {
      const spawnMole = () => {
        setHoles((prev) => {
          const hiddenHoles = prev.filter((h) => h.state === "hidden")
          if (hiddenHoles.length === 0) return prev

          const randomHole = hiddenHoles[Math.floor(Math.random() * hiddenHoles.length)]
          const newHoles = prev.map((h) =>
            h.id === randomHole.id ? { ...h, state: "visible" as MoleState } : h
          )

          // Auto-hide mole after random time (800-1500ms based on time left)
          const hideDelay = Math.max(600, 1500 - (30 - timeLeft) * 30)
          setTimeout(() => {
            setHoles((current) =>
              current.map((h) =>
                h.id === randomHole.id && h.state === "visible"
                  ? { ...h, state: "hidden" as MoleState }
                  : h
              )
            )
          }, hideDelay)

          return newHoles
        })
      }

      // Spawn rate increases as time decreases
      const spawnRate = Math.max(400, 1000 - (30 - timeLeft) * 20)
      gameIntervalRef.current = setInterval(spawnMole, spawnRate)

      return () => {
        if (gameIntervalRef.current) clearInterval(gameIntervalRef.current)
      }
    }
  }, [isPlaying, timeLeft])

  // Reset combo after 1.5 seconds of no whacks
  useEffect(() => {
    if (lastWhackTime > 0) {
      const timeout = setTimeout(() => {
        setCombo(0)
      }, 1500)
      return () => clearTimeout(timeout)
    }
  }, [lastWhackTime])

  const whackMole = (id: number) => {
    if (!isPlaying) return

    setHoles((prev) => {
      const hole = prev.find((h) => h.id === id)
      if (hole?.state !== "visible") return prev

      // Calculate score with combo multiplier
      const comboMultiplier = Math.min(combo + 1, 5)
      const points = 10 * comboMultiplier
      setScore((s) => s + points)
      setCombo((c) => c + 1)
      setLastWhackTime(Date.now())

      return prev.map((h) =>
        h.id === id ? { ...h, state: "whacked" as MoleState } : h
      )
    })

    // Reset whacked state after animation
    setTimeout(() => {
      setHoles((prev) =>
        prev.map((h) => (h.id === id ? { ...h, state: "hidden" as MoleState } : h))
      )
    }, 200)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold mb-2">
          Whack-a-Mole
        </h3>
        <p className="text-sm text-muted-foreground">
          Click the moles as fast as you can!
        </p>
      </div>

      {/* Stats Bar */}
      <div className="flex items-center justify-between mb-6 p-4 bg-card rounded-xl border border-border">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Score</p>
            <p className="font-bold text-lg">{score}</p>
          </div>
        </div>
        
        {combo > 1 && (
          <div className="flex items-center gap-1 px-3 py-1 bg-primary/10 rounded-full animate-pulse">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-bold text-primary">{combo}x Combo!</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Timer className="h-5 w-5 text-primary" />
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Time</p>
            <p className={`font-bold text-lg ${timeLeft <= 5 ? "text-red-500 animate-pulse" : ""}`}>
              {timeLeft}s
            </p>
          </div>
        </div>
      </div>

      {/* Game Board */}
      <div className="relative bg-gradient-to-b from-green-800 to-green-900 rounded-2xl p-6 shadow-inner">
        {/* Grass texture overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0idHJhbnNwYXJlbnQiLz4KPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMSIgZmlsbD0icmdiYSgwLDAsMCwwLjEpIi8+Cjwvc3ZnPg==')] opacity-50 rounded-2xl" />
        
        <div className="grid grid-cols-3 gap-4 relative z-10">
          {holes.map((hole) => (
            <button
              key={hole.id}
              onClick={() => whackMole(hole.id)}
              disabled={!isPlaying}
              className="relative aspect-square cursor-pointer group"
              aria-label={`Hole ${hole.id + 1}`}
            >
              {/* Hole */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-amber-900 to-amber-950 rounded-[50%] shadow-inner" />
              
              {/* Mole */}
              <div
                className={`
                  absolute bottom-1/4 left-1/2 -translate-x-1/2 w-4/5
                  transition-all duration-100 ease-out origin-bottom
                  ${hole.state === "visible" ? "translate-y-0 scale-100" : "translate-y-full scale-75"}
                  ${hole.state === "whacked" ? "scale-110" : ""}
                `}
              >
                {/* Mole body */}
                <div className={`
                  relative aspect-square rounded-t-full 
                  ${hole.state === "whacked" 
                    ? "bg-gradient-to-b from-amber-600 to-amber-700" 
                    : "bg-gradient-to-b from-amber-700 to-amber-800"
                  }
                  shadow-lg
                `}>
                  {/* Mole face */}
                  <div className="absolute inset-x-2 top-1/4 flex flex-col items-center">
                    {/* Eyes */}
                    <div className="flex gap-2 mb-1">
                      <div className={`w-2 h-2 rounded-full bg-white flex items-center justify-center ${hole.state === "whacked" ? "" : ""}`}>
                        <div className={`w-1 h-1 rounded-full ${hole.state === "whacked" ? "bg-amber-800" : "bg-gray-900"}`} />
                      </div>
                      <div className={`w-2 h-2 rounded-full bg-white flex items-center justify-center`}>
                        <div className={`w-1 h-1 rounded-full ${hole.state === "whacked" ? "bg-amber-800" : "bg-gray-900"}`} />
                      </div>
                    </div>
                    {/* Nose */}
                    <div className="w-3 h-2 bg-pink-400 rounded-full" />
                    {/* Cheeks */}
                    <div className="flex gap-3 mt-0.5">
                      <div className="w-1.5 h-1 bg-pink-300 rounded-full opacity-70" />
                      <div className="w-1.5 h-1 bg-pink-300 rounded-full opacity-70" />
                    </div>
                  </div>
                  
                  {/* Whacked stars effect */}
                  {hole.state === "whacked" && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-yellow-400 animate-ping">
                      ★
                    </div>
                  )}
                </div>
              </div>
              
              {/* Hit effect */}
              {hole.state === "whacked" && (
                <div className="absolute inset-0 bg-yellow-400/30 rounded-full animate-ping" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* High Score */}
      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">
          High Score: <span className="font-bold text-foreground">{highScore}</span>
        </p>
      </div>

      {/* Controls */}
      <div className="flex gap-3 mt-6">
        {!isPlaying ? (
          <Button onClick={startGame} className="flex-1 gap-2" size="lg">
            <Play className="h-5 w-5" />
            {score > 0 ? "Play Again" : "Start Game"}
          </Button>
        ) : (
          <Button onClick={endGame} variant="outline" className="flex-1 gap-2" size="lg">
            <RotateCcw className="h-5 w-5" />
            Reset
          </Button>
        )}
      </div>

      {/* Game Over Modal */}
      {!isPlaying && score > 0 && (
        <div className="mt-6 p-6 bg-card rounded-xl border border-border text-center">
          <h4 className="font-[family-name:var(--font-display)] text-xl font-bold mb-2">
            Game Over!
          </h4>
          <p className="text-3xl font-bold text-primary mb-2">{score} points</p>
          {score >= highScore && score > 0 && (
            <p className="text-sm text-primary flex items-center justify-center gap-1">
              <Trophy className="h-4 w-4" />
              New High Score!
            </p>
          )}
        </div>
      )}
    </div>
  )
}
