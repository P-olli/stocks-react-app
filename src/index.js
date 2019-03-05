import React from 'react';
import ReactDOM from 'react-dom';
import Overview from './overview';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<BrowserRouter><Overview  /></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
