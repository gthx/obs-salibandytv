import { createEffect, onCleanup, createSignal, createMemo, createComputed } from 'solid-js';
import styles from './Admin.module.css';
import { useScore } from './ScoreContext';
import { Numeric } from './Numeric';


export function Admin() {
  const [score, {changePeriod, changeHomeGoals, changeAwayGoals, incrementTime, toggleTimer, setPeriodTime}] = useScore();
  const [timeOverride, setTimeOverride] = createSignal('0000');
  const [modifying, setModifying] = createSignal(false);

  createEffect(() => {
    const callback = (e) => {
      console.log(e);
      if (e.key === ' ') {
        e.preventDefault();
        toggleTimer();
      }
    };
    window.addEventListener('keydown', callback);
    onCleanup(() => window.removeEventListener('keydown', callback));
  });

  const timer = setInterval(() => {
    if (score.timer_on)
      incrementTime();
  }, 1000);

  onCleanup(() => {
    clearInterval(timer);
  });

  const mutableTime = () => modifying() ? '0000' : score.timeNumber;

  const readCurrentTime = (el) => {
    setModifying(true);
    el.target.value = score.timeNumber;
    el.target.select();
  };

  return (
    <div class={styles.Admin}>
      <h1>Ajanhallinta</h1>
      <Numeric label="Erä" type="number" min={1} max={6} value={score.period} onChange={e => changePeriod(e.target.value)} />
      <Numeric label="Aika" type="number" min={0} max={2000} maxLength={4} value={mutableTime()} onChange={e => {setPeriodTime(e.target.value); e.target.blur()} } pattern='^(?:[0-2])?[0-9][0-5][0-9]$' 
      onFocus={readCurrentTime} onBlur={_ => setModifying(false)} />
      {/* <input type='number' pattern='^(?:[0-2])?[0-9][0-5][0-9]$' onFocus={e => e.target.select()} minLength={3} maxLength={4} value={timeOverride()} onChange={e => setTimeOverride(e.target.value)} /> */}
      <button onClick={() => setPeriodTime(timeOverride())}>Aseta</button>
      
      <button onClick={toggleTimer}>{score.timer_on ? 'Pysäytä' : 'Käynnistä'}</button>

      <h1>Tulostaulu</h1>
      <Numeric label="Koti" min={0} value={score.home} onChange={e => changeHomeGoals(e.target.value)} />
      <Numeric label="Vieras" min={0} value={score.away} onChange={e => changeAwayGoals(e.target.value)} />
    </div>
  );
}
