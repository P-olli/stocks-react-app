import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>List of all the stocks you need</h2>
                </div>
                <p className="App-intro">
                    <div>
                        <StockOverview />
                    </div>
                </p>
            </div>
        );
    }
}

var LineChart = require("react-chartjs").Line;
var data = {
    datasets: [{
        label: 'data',
        data: [12, 19, 3, 5, 2, 3],
        strokeColor: "black",
        fillColor: "rgba(220,220,220,0)",
        fill: false,
        borderWidth: 1
    }, {
        label: 'Moving average',
        data: [2, 5, 7, 4, 4, 2],
        strokeColor: "red",
        fillColor: "rgba(220,220,220,0)",
        fill: false,
        borderWidth: 1
    },
    ]
};
var options = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: false
            }
        }]
    }
};


class StockChart extends Component {
    render() {
        return <LineChart data={data} options={options} width="200" height="250"/>
    }
}
;

class StockOverview extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li>
                        <StockChart/>
                        <StockChart/>
                        <StockChart/>
                        <StockChart/>
                        <StockChart/>
                        <StockChart/>
                        <StockChart/>
                        <StockChart/>
                        <StockChart/>
                    </li>
                </ul>
            </div>
        )
    }
}
;

export default App;
