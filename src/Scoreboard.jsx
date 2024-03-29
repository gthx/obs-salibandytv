import styles from './Scoreboard.module.css';
import { useScore } from './ScoreContext';
import homeLogo from './assets/logos/rangers.webp'

export function Scoreboard() {
  const [score] = useScore();
  return (
    <div class={styles.Scoreboard}>
      <div class={styles.Container}>
        <img class={styles.Logo} src={homeLogo} />
        <div class={styles.HomeColor}></div>
        <div class={styles.HomeTeam}>{"RAN"}</div>
        <div class={styles.HomeScore}>{score.home}</div>
        <div class={styles.Divider}>-</div>
        <img class={styles.Logo} src={"https://cdn.torneopal.net/logo/salibandy/800x.webp"} />
        <div class={styles.AwayColor}></div>
        <div class={styles.AwayTeam}>{"FBC"}</div>
        <div class={styles.AwayScore}>{score.away}</div>
        <div class={styles.Period}>{score.periodText}</div>
        <div class={styles.Time}>{score.timeText}</div>
      </div>
    </div>
  );
}
