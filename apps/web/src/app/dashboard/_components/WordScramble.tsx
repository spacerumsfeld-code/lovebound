'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from 'src/components/ui/button'
import { Input } from 'src/components/ui/input'
import { Check } from 'lucide-react'

const words = [
    'STORY',
    'NOVEL',
    'PLOT',
    'CHARACTER',
    'SETTING',
    'ROMANCE',
    'ADVENTURE',
    'MYSTERY',
    'FANTASY',
    'DRAMA',
]

export function WordScrambleGame({ isOpen }: { isOpen: boolean }) {
    const [currentWord, setCurrentWord] = useState('')
    const [scrambledWord, setScrambledWord] = useState('')
    const [userGuess, setUserGuess] = useState('')
    const [score, setScore] = useState(0)
    const [timeLeft, setTimeLeft] = useState(60)
    const [gameOver, setGameOver] = useState(false)

    const startNewRound = useCallback(() => {
        const newWord = words[Math.floor(Math.random() * words.length)]
        setCurrentWord(newWord)
        setScrambledWord(scrambleWord(newWord))
        setUserGuess('')
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (userGuess.toUpperCase() === currentWord) {
            setScore(score + 1)
            startNewRound()
        }
    }

    const resetGame = () => {
        setScore(0)
        setTimeLeft(60)
        setGameOver(false)
        startNewRound()
    }

    useEffect(() => {
        if (isOpen && !gameOver) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timer)
                        setGameOver(true)
                        return 0
                    }
                    return prevTime - 1
                })
            }, 1000)

            return () => clearInterval(timer)
        }
    }, [isOpen, gameOver])

    useEffect(() => {
        if (isOpen) {
            startNewRound()
        }
    }, [isOpen, startNewRound])

    const scrambleWord = (word: string) => {
        return word
            .split('')
            .sort(() => Math.random() - 0.5)
            .join('')
    }

    return (
        <div className="flex flex-col items-center space-y-4">
            {!gameOver ? (
                <>
                    <div className="text-2xl font-bold">{scrambledWord}</div>
                    <form
                        onSubmit={handleSubmit}
                        className="flex w-full max-w-sm items-center space-x-2"
                    >
                        <Input
                            type="text"
                            placeholder="Unscramble the word"
                            value={userGuess}
                            onChange={(e) => setUserGuess(e.target.value)}
                        />
                        <Button type="submit" variant="primary">
                            <Check className="h-4 w-4" />
                        </Button>
                    </form>
                    <div className="flex justify-between w-full">
                        <div>Score: {score}</div>
                        <div>Time: {timeLeft}s</div>
                    </div>
                </>
            ) : (
                <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4">Game Over!</h3>
                    <p className="text-xl mb-4">Your final score: {score}</p>
                    <Button variant="primary" onClick={resetGame}>
                        Play Again
                    </Button>
                </div>
            )}
        </div>
    )
}
