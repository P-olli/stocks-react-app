import React from 'react';
import ReactDOM from 'react-dom';
import StockTabs from './StockTabs';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<StockTabs />, document.getElementById('root'));
registerServiceWorker();
