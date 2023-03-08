import { createRoot } from 'react-dom/client';
import App from './App'
import ReactDOM  from 'react-dom';
import React from 'react';

// let container = document.getElementById('app')
// const root = createRoot(container!);
// // root.render(new App({}).render());
// root.render(<App />)

ReactDOM.render(<App />, document.getElementById('app')); 