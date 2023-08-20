/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import { ScoreProvider } from './ScoreContext';
import { Scoreboard } from './Scoreboard';
import { Admin } from './Admin';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(() =>
<ScoreProvider>
  <Scoreboard />
  <Admin />
</ScoreProvider>, root);
