import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "./Provider";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

/*
TODO-Johannes:
    - send test files to BL (DONE)
    - footer aufräumen (ETCE-Lab Website + Github backling zum repo) (DONE)
    - "->" / "-->" zu richtigen pfeilen (DONE)
    - get coordinates for location from json (MORE OR LESS DONE)
    - tracelog interactive map -> pin on map for every step + numbering of steps (MORE OR LESS DONE)
    - favicon -> react symbol austauschen und durch was passendes ersetzen (DONE)
    - Readme und merge auf main
    - Todo nummeriere marker für jeden stop
 */

root.render(
  <React.StrictMode>
      <Provider></Provider>
  </React.StrictMode>
);

