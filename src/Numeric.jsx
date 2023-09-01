import {splitProps } from 'solid-js';
import styles from './Numeric.module.css';

export function Numeric(props) {
  let refInput;
  const [, inputProps] = splitProps(props, ['value', 'label', 'stepUp', 'stepDown']);
  const stepUp = () => { refInput.stepUp(); refInput.dispatchEvent(new Event('change'));};
  const stepDown = () => { refInput.stepDown(); refInput.dispatchEvent(new Event('change'));};
  return (
    <div style={{display:'inline-grid'}}>
      {props.label && <h2>{props.label}</h2>}
      <div class={styles.Numeric}>
        <button onClick={props.stepDown ?? stepDown} class="minus" />
        <input {...inputProps} type="number" value={props.value} ref={refInput} />
        <button onClick={props.stepUp ?? stepUp} class="plus" />
      </div>
    </div>
  );
}
