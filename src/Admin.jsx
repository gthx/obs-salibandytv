import { createEffect, onCleanup } from 'solid-js';
import { TbClockPlay, TbRotateClockwise2 } from 'solid-icons/tb'
import styles from './Admin.module.css';
import { useScore } from './ScoreContext';
import { Numeric } from './Numeric';


export function Admin() {
  const [score, {changePeriod, changeHomeGoals, changeAwayGoals, incrementTime, toggleTimer, setPeriodTime}] = useScore();

  const stepUpTime = () => setPeriodTime(parseInt(score.timeNumber) + 1 );
  const stepDownTime = () => setPeriodTime(parseInt(score.timeNumber) - 1 );

  createEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ') {
        e.preventDefault();
        toggleTimer();
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        stepUpTime();
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        stepDownTime();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    onCleanup(() => window.removeEventListener('keydown', handleKeyDown));
  });

  const timer = setInterval(() => {
    if (score.timer_on)
      incrementTime();
  }, 1000);

  onCleanup(() => {
    clearInterval(timer);
  });

  const setValueToCurrentTime = (el) => {
    el.target.value = score.timeNumber;
    el.target.select();
  };

  return (
    <div class={styles.Admin}>
      <h1>Ajanhallinta</h1>
      <div style={{"background-color": score.timer_on ? 'red' : 'transparent', width: '100%', height: '10px', "border-radius": '5px'}}></div>
      <Numeric label="Erä" type="number" min={1} max={6} value={score.period} onChange={e => changePeriod(e.target.value)} />
      <div style={{display:'inline-grid'}}>
        <h2>Käynnissä</h2>
        <button onClick={toggleTimer} class={score.timer_on ? styles.timer_on : ''}>
          {score.timer_on ? <TbRotateClockwise2 size={40} /> : <TbClockPlay size={40} />}
        </button>
      </div>
      <Numeric label="Aika" type="number" min={0} max={2000} maxLength={4} value={'0000'} onChange={e => {setPeriodTime(e.target.value); e.target.blur();}} pattern='^(?:[0-2])?[0-9][0-5][0-9]$' 
      onFocus={setValueToCurrentTime} stepUp={stepUpTime} stepDown={stepDownTime} />

      
      <h1>Tulostaulu</h1>
      <Numeric label="Koti" min={0} value={score.home} onChange={e => changeHomeGoals(e.target.value)} />
      <Numeric label="Vieras" min={0} value={score.away} onChange={e => changeAwayGoals(e.target.value)} />
    </div>
  );
}
