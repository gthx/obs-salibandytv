import styles from './Scoreboard.module.css';
import { useScore } from './ScoreContext';

export function Scoreboard() {
  const [score] = useScore();
  return (
    <div class={styles.Scoreboard}>
      <div class={styles.Container}>
        <img class={styles.Logo} src='https://kirkkonummirangers.fi/wp-content/uploads/2022/05/logo.png' />
        <div class={styles.HomeColor}></div>
        <div class={styles.HomeTeam}>{"RAN"}</div>
        <div class={styles.HomeScore}>{score.home}</div>
        <img class={styles.Logo} src='https://www.hawks.fi/wp-content/uploads/2021/08/Hawks_Logo_200x200.png' />
        <div class={styles.AwayColor}></div>
        <div class={styles.AwayTeam}>{"HAW"}</div>
        <div class={styles.AwayScore}>{score.away}</div>
        <div class={styles.Period}>{score.periodText}</div>
        <div class={styles.Time}>{score.timeText}</div>
      </div>
    </div>
  );
}
