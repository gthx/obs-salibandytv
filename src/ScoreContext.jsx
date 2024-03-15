import { createContext, useContext, createMemo, createComputed, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

const clamp = (min, max, num) => Math.min(Math.max(num, min), max)
const clampMin = clamp.bind(null, 0, 20);
const clampSec = clamp.bind(null, 0, 59);
const periodAbbrevation = ['1.', '2.', '3.', 'JA', 'VLK', 'LOPPU'];
const periodLength = 20 * 60;

const defaultState = {
  period: 1,
  time_sec: 0,
  timer_started: false,
  timer_on: false,
  home: 0,
  away: 0,
  get periodText() {
    return periodAbbrevation[this.period - 1];
  },
  get timeText() {
    if(this.timer_started === false) {
      return '--:--';
    }

    if (this.time_sec === (this.period) * periodLength) {
      return '20:00';
    }
    const periodTime = this.time_sec % periodLength;
    return `${Math.floor(periodTime / 60).toString().padStart(2, '0')}:${(periodTime % 60).toString().padStart(2, '0')}`;
  },
  get timeNumber() {
    if (this.time_sec === (this.period) * periodLength) {
      return '2000';
    }
    const periodTime = this.time_sec % periodLength;
    return `${Math.floor(periodTime / 60).toString().padStart(2, '0')}${(periodTime % 60).toString().padStart(2, '0')}`;
  },
};

const ScoreContext = createContext([defaultState, ]);

export function ScoreProvider(props) {
  const [state, setState] = createStore(defaultState);

  const changePeriod = (value) => {
    setState('period', value);
    setState('timer_on', false);
    setState('time_sec', (value - 1) * periodLength);
  };
  const changeHomeGoals = (value) => setState('home', value);
  const changeAwayGoals = (value) => setState('away', value);
  const setPeriodTime = (value) => {
    const valueStr = value.toString().padStart(4, '0');
    const periodStart = (state.period - 1) * periodLength;
    const minutes = clampMin(parseInt(valueStr.slice(0, 2)));
    const seconds = clampSec(parseInt(valueStr.slice(2, 4)));
    setState('time_sec', periodStart + minutes * 60 + seconds);
  };
  const incrementTime = () => {
    setState('timer_started', true);
    setState('time_sec', t => t + 1);
    const t = state.time_sec;
    if (t % periodLength === 0 ) {
      setState('timer_on', false);
      return;
    }

    if (t === 3 * periodLength && state.home !== state.away) {      
      return;
    }
  };
  const toggleTimer = () => setState('timer_on', t => !t);

  const effects = {
    changePeriod,
    changeHomeGoals,
    changeAwayGoals,
    setPeriodTime,
    incrementTime,
    toggleTimer,
  };


  return (
    <ScoreContext.Provider value={[state, effects]}>
      {props.children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => useContext(ScoreContext);
