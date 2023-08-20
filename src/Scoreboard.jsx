import styles from './Scoreboard.module.css';
import { useScore } from './ScoreContext';

export function Scoreboard() {
  const [score] = useScore();
  return (
    <div class={styles.Scoreboard}>
      <h1>{score.periodText}</h1>
      <div>
        <span>{score.home}</span>
        &dash;
        <span>{score.away}</span>
      </div>
      <h2>{score.timeText}</h2>
    </div>
  );
}
