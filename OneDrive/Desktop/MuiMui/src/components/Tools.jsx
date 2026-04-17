import { useState, useEffect, useRef } from 'react'
import { useLang } from '../context/LanguageContext'
import './Tools.css'

const activityValues = ['1.2', '1.375', '1.55', '1.725', '1.9']

function CalorieCalc({ tc }) {
  const [form, setForm] = useState({ weight: '', height: '', age: '', gender: 'male', activity: '1.55' })
  const [result, setResult] = useState(null)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const { weight, height, age, gender, activity } = form
    if (!weight || !height || !age) return
    const bmr = gender === 'male'
      ? 10 * +weight + 6.25 * +height - 5 * +age + 5
      : 10 * +weight + 6.25 * +height - 5 * +age - 161
    const tdee = Math.round(bmr * +activity)
    setResult({ maintain: tdee, loss: tdee - 500, gain: tdee + 300 })
  }

  return (
    <div className="tool-card">
      <div className="tool-icon">{tc.icon}</div>
      <h3 className="tool-title">{tc.title}</h3>
      <p className="tool-desc">{tc.desc}</p>
      <div className="calc-grid">
        <label>
          <span>{tc.weight}</span>
          <input type="number" placeholder="70" value={form.weight} onChange={e => set('weight', e.target.value)} />
        </label>
        <label>
          <span>{tc.height}</span>
          <input type="number" placeholder="175" value={form.height} onChange={e => set('height', e.target.value)} />
        </label>
        <label>
          <span>{tc.age}</span>
          <input type="number" placeholder="25" value={form.age} onChange={e => set('age', e.target.value)} />
        </label>
        <label>
          <span>{tc.gender}</span>
          <select value={form.gender} onChange={e => set('gender', e.target.value)}>
            <option value="male">{tc.male}</option>
            <option value="female">{tc.female}</option>
          </select>
        </label>
      </div>
      <label className="calc-full">
        <span>{tc.activity}</span>
        <select value={form.activity} onChange={e => set('activity', e.target.value)}>
          {tc.activityOptions.map((opt, i) => (
            <option key={i} value={activityValues[i]}>{opt}</option>
          ))}
        </select>
      </label>
      <button className="btn btn-primary tool-btn" onClick={calculate}>{tc.calculate}</button>
      {result && (
        <div className="calc-results">
          <div className="calc-result-item">
            <span className="cr-label">{tc.maintain}</span>
            <span className="cr-val">{result.maintain} {tc.unit}</span>
          </div>
          <div className="calc-result-item highlight">
            <span className="cr-label">{tc.loss}</span>
            <span className="cr-val">{result.loss} {tc.unit}</span>
          </div>
          <div className="calc-result-item">
            <span className="cr-label">{tc.gain}</span>
            <span className="cr-val">{result.gain} {tc.unit}</span>
          </div>
        </div>
      )}
    </div>
  )
}

const workoutData = {
  upper: [
    ['Bench Press', '4×10', 'Chest'],
    ['Lat Pulldown', '4×12', 'Back'],
    ['Shoulder Press', '3×12', 'Shoulders'],
    ['Dumbbell Curl', '3×15', 'Biceps'],
    ['Tricep Extension', '3×12', 'Triceps'],
    ['Dumbbell Fly', '3×15', 'Chest'],
  ],
  lower: [
    ['Barbell Squat', '4×10', 'Quads'],
    ['Romanian Deadlift', '4×12', 'Hamstrings'],
    ['Dumbbell Lunges', '3×12', 'Legs'],
    ['Leg Press', '3×15', 'Quads'],
    ['Calf Raises', '4×20', 'Calves'],
    ['Glute Bridge', '3×15', 'Glutes'],
  ],
  full: [
    ['Deadlift', '4×8', 'Back/Legs'],
    ['Push-Ups', '4×15', 'Chest'],
    ['Plank', '3×60s', 'Core'],
    ['Burpees', '3×10', 'Full Body'],
    ['Bent-Over Row', '3×12', 'Back'],
    ['Overhead Press', '3×12', 'Shoulders'],
  ],
  cardio: [
    ['Sprint Intervals', '8×30s/30s', 'Cardio'],
    ['Jump Rope', '5×2 min', 'Cardio'],
    ['Stationary Bike', '20 min zone 2', 'Cardio'],
    ['Jumping Jacks', '4×50', 'Cardio'],
    ['High Knees', '4×40s', 'Cardio'],
    ['Mountain Climbers', '4×30s', 'Core/Cardio'],
  ],
}

function WorkoutGen({ tw }) {
  const tabKeys = ['upper', 'lower', 'full', 'cardio']
  const [typeIdx, setTypeIdx] = useState(0)
  const [plan, setPlan] = useState(null)

  const generate = () => {
    const pool = [...workoutData[tabKeys[typeIdx]]]
    const shuffled = pool.sort(() => Math.random() - 0.5).slice(0, 5)
    setPlan(shuffled)
  }

  return (
    <div className="tool-card">
      <div className="tool-icon">{tw.icon}</div>
      <h3 className="tool-title">{tw.title}</h3>
      <p className="tool-desc">{tw.desc}</p>
      <div className="wg-tabs">
        {tw.tabs.map((label, i) => (
          <button
            key={i}
            className={`wg-tab ${typeIdx === i ? 'active' : ''}`}
            onClick={() => { setTypeIdx(i); setPlan(null) }}
          >{label}</button>
        ))}
      </div>
      <button className="btn btn-primary tool-btn" onClick={generate}>{tw.generate}</button>
      {plan && (
        <div className="wg-plan">
          <div className="wg-plan-header">
            <span>{tw.col1}</span>
            <span>{tw.col2}</span>
            <span>{tw.col3}</span>
          </div>
          {plan.map(([name, sets, group], i) => (
            <div className="wg-row" key={i}>
              <span className="wg-num">{i + 1}</span>
              <span className="wg-name">{name}</span>
              <span className="wg-sets">{sets}</span>
              <span className="wg-group">{group}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Timer({ tt }) {
  const [mode, setMode] = useState('stopwatch')
  const [running, setRunning] = useState(false)
  const [time, setTime] = useState(0)
  const [work, setWork] = useState(30)
  const [rest, setRest] = useState(30)
  const [rounds, setRounds] = useState(8)
  const [currentRound, setCurrentRound] = useState(1)
  const [phase, setPhase] = useState('work')
  const [intervalTime, setIntervalTime] = useState(0)
  const [done, setDone] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        if (mode === 'stopwatch') {
          setTime(t => t + 1)
        } else {
          setIntervalTime(t => {
            const limit = phase === 'work' ? work : rest
            if (t + 1 >= limit) {
              if (phase === 'work') { setPhase('rest'); return 0 }
              else {
                setCurrentRound(r => {
                  if (r >= rounds) { setRunning(false); setDone(true); return r }
                  return r + 1
                })
                setPhase('work'); return 0
              }
            }
            return t + 1
          })
        }
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [running, mode, phase, work, rest, rounds])

  const reset = () => {
    setRunning(false); setTime(0); setIntervalTime(0)
    setCurrentRound(1); setPhase('work'); setDone(false)
  }

  const fmt = s => `${String(Math.floor(s / 60)).padStart(2,'0')}:${String(s % 60).padStart(2,'0')}`
  const progress = mode === 'interval'
    ? ((phase === 'work' ? intervalTime / work : intervalTime / rest) * 100)
    : 0

  return (
    <div className="tool-card">
      <div className="tool-icon">{tt.icon}</div>
      <h3 className="tool-title">{tt.title}</h3>
      <p className="tool-desc">{tt.desc}</p>
      <div className="wg-tabs">
        <button className={`wg-tab ${mode==='stopwatch'?'active':''}`} onClick={() => { setMode('stopwatch'); reset() }}>{tt.stopwatch}</button>
        <button className={`wg-tab ${mode==='interval'?'active':''}`} onClick={() => { setMode('interval'); reset() }}>{tt.intervals}</button>
      </div>
      {mode === 'interval' && (
        <div className="timer-settings">
          <label><span>{tt.work}</span><input type="number" value={work} onChange={e => setWork(+e.target.value)} min={5} max={300} /></label>
          <label><span>{tt.rest}</span><input type="number" value={rest} onChange={e => setRest(+e.target.value)} min={5} max={300} /></label>
          <label><span>{tt.rounds}</span><input type="number" value={rounds} onChange={e => setRounds(+e.target.value)} min={1} max={50} /></label>
        </div>
      )}
      <div className="timer-display">
        {mode === 'interval' && (
          <div className={`timer-phase ${phase}`}>
            {done ? tt.done : phase === 'work' ? tt.workPhase : tt.restPhase}
          </div>
        )}
        <div className="timer-time">{fmt(mode === 'stopwatch' ? time : intervalTime)}</div>
        {mode === 'interval' && !done && (
          <div className="timer-round">{tt.round} {currentRound} {tt.of} {rounds}</div>
        )}
        {mode === 'interval' && (
          <div className="timer-progress-bar">
            <div className="timer-progress-fill" style={{ width: `${progress}%`, background: phase === 'work' ? 'var(--lime)' : '#ff6b6b' }} />
          </div>
        )}
      </div>
      <div className="timer-controls">
        <button className="btn btn-primary" onClick={() => setRunning(r => !r)}>
          {running ? tt.pause : tt.start}
        </button>
        <button className="btn btn-outline" onClick={reset}>{tt.reset}</button>
      </div>
    </div>
  )
}

export default function Tools() {
  const { t } = useLang()
  const tl = t.tools

  return (
    <section className="tools-section" id="tools">
      <div className="section">
        <p className="section-label reveal">{tl.label}</p>
        <h2 className="section-title reveal reveal-delay-1">
          {tl.title1}<br />
          <span className="outline-text-tools">{tl.title2}</span>
        </h2>
        <p className="tools-intro reveal reveal-delay-2">{tl.intro}</p>
        <div className="tools-grid">
          <div className="reveal reveal-delay-1"><CalorieCalc tc={tl.calc} /></div>
          <div className="reveal reveal-delay-2"><WorkoutGen tw={tl.workout} /></div>
          <div className="reveal reveal-delay-3"><Timer tt={tl.timer} /></div>
        </div>
      </div>
    </section>
  )
}
