import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "./Provider";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
localStorage.setItem("data", "empty")

root.render(
  <React.StrictMode>
      <Provider></Provider>
  </React.StrictMode>
);

