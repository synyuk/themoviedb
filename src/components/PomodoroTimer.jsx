import { useEffect, useMemo, useState } from 'react'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import './PomodoroTimer.css'

const WORK_MINUTES = 25
const BREAK_MINUTES = 5

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function PomodoroTimer() {
  const [isRunning, setIsRunning] = useState(false)
  const [mode, setMode] = useState('work')
  const [timeLeft, setTimeLeft] = useState(WORK_MINUTES * 60)
  const [completedPomodoros, setCompletedPomodoros] = useState(0)

  const totalForMode = mode === 'work' ? WORK_MINUTES * 60 : BREAK_MINUTES * 60
  const progress = useMemo(() => ((totalForMode - timeLeft) / totalForMode) * 100, [timeLeft, totalForMode])

  useEffect(() => {
    if (!isRunning) return undefined

    const timerId = window.setInterval(() => {
      setTimeLeft((previous) => {
        if (previous > 1) {
          return previous - 1
        }

        if (mode === 'work') {
          setCompletedPomodoros((count) => count + 1)
          setMode('break')
          return BREAK_MINUTES * 60
        }

        setMode('work')
        return WORK_MINUTES * 60
      })
    }, 1000)

    return () => {
      window.clearInterval(timerId)
    }
  }, [isRunning, mode])

  const handleToggleRunning = () => {
    setIsRunning((previous) => !previous)
  }

  const handleReset = () => {
    setIsRunning(false)
    setMode('work')
    setTimeLeft(WORK_MINUTES * 60)
    setCompletedPomodoros(0)
  }

  const handleSkip = () => {
    setIsRunning(false)

    if (mode === 'work') {
      setCompletedPomodoros((count) => count + 1)
      setMode('break')
      setTimeLeft(BREAK_MINUTES * 60)
      return
    }

    setMode('work')
    setTimeLeft(WORK_MINUTES * 60)
  }

  return (
    <main className={`pomodoro-page pomodoro-page--${mode}`}>
      <section className={`pomodoro-card pomodoro-card--${mode}`} aria-live="polite">
        <p className="pomodoro-kicker">Daily rhythm</p>
        <h1>Easy Pomodoro Timer</h1>
        <p className="pomodoro-mode">{mode === 'work' ? 'Focus time' : 'Break time'}</p>

        <div className="pomodoro-clock">{formatTime(timeLeft)}</div>

        <div className="pomodoro-progress" role="progressbar" aria-valuenow={Math.floor(progress)} aria-valuemin="0" aria-valuemax="100">
          <span style={{ width: `${progress}%` }} />
        </div>

        <div className="pomodoro-actions">
          <button type="button" className="pomodoro-button pomodoro-button--primary" onClick={handleToggleRunning}>
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button type="button" className="pomodoro-button" onClick={handleSkip}>Skip</button>
          <button type="button" className="pomodoro-button" onClick={handleReset}>Reset</button>
        </div>

        <p className="pomodoro-count">Completed pomodoros: {completedPomodoros}</p>
      </section>
    </main>
  )
}

export default PomodoroTimer
