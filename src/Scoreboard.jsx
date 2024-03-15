import styles from './Scoreboard.module.css';
import { useScore } from './ScoreContext';
//import homeLogo from './assets/logos/rangers.webp'

export function Scoreboard() {
  const [score] = useScore();
  return (
    <div class={styles.Scoreboard}>
      <div class={styles.Container}>
        <img class={styles.Logo} src={"https://cdn.torneopal.net/logo/salibandy/757x.webp"} />
        <div class={styles.HomeColor}></div>
        <div class={styles.HomeTeam}>{"WI"}</div>
        <div class={styles.HomeScore}>{score.home}</div>
        <div class={styles.Divider}>-</div>
        <img class={styles.Logo} src={"https://cdn.torneopal.net/logo/salibandy/374x.webp"} />
        <div class={styles.AwayColor}></div>
        <div class={styles.AwayTeam}>{"KRP"}</div>
        <div class={styles.AwayScore}>{score.away}</div>
        <div class={styles.Period}>{score.periodText}</div>
        <div class={styles.Time}>{score.timeText}</div>
      </div>
    </div>
  );
}
