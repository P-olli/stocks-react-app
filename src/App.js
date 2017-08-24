import React, {Component} from 'react';
import Moment from 'moment';
import {Line} from 'react-chartjs-2';
import logo from './logo.svg';
import './App.css';

function options(stock) {
    return {
        responsive: true,
        title: {
            display: true,
            text: stock.Id,
            fontFamily: "Roboto",
            fontSize: 20,
        },
        scales: {
            yAxes: [{
                display: true,
                ticks: {
                    beginAtZero: false
                }
            }]
        }
    }
}

function filterLabels(labels) {
    var showLabelCount = 10;
    var labelSkipCount = Math.floor(labels.length / showLabelCount);
    return labels.map((label, index) => {
        if (index % labelSkipCount === 0) {
            return label;
        } else {
            return "";
        }
    });
}

function fillMovingAverage(movingAverage, length) {
    var movingAverageArray = [];
    for (var i = 0; i < length; i++) {
        movingAverageArray[i] = movingAverage;
    }
    return movingAverageArray;
}

function GetData(stock) {
    var dates = stock.Prices.reverse().map((price) => Moment(price.day).format('DD.MM.YYYY'));
    var prices = stock.Prices.reverse().map((price) => price.price);

    console.log('MovingAverage38: ' + fillMovingAverage(stock.MovingAverage38, prices.length))
    return {
        labels: filterLabels(dates),
        datasets: [{
            label: 'Data',
            data: prices,
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
        }, {
            label: 'Moving average 38',
            data: fillMovingAverage(stock.MovingAverage38, prices.length),
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,0,0,0.4)',
            borderColor: 'rgba(75,0,0,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,0,0,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,0,0,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
        }, {
            label: 'Moving average 100',
            data: fillMovingAverage(stock.MovingAverage100, prices.length),
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,200,20,0.4)',
            borderColor: 'rgba(75,200,200,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,200,200,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,200,200,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
        }
        ]
    };
}

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        return fetch('http://localhost:8080/stocks/NDX1.DE,AAPL,MSFT,VZ,HPQ,GOOGL,SSNF,SNE')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    stocks: responseJson
                }, function () {
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div>LOADING...</div>
            );
        } else {
            return (
                <div className="App">
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h2>List of all the stocks you need</h2>
                    </div>
                    <div>
                        {this.state.stocks.map((stock) =>
                            <Line
                                data={GetData(stock)}
                                options={options(stock)}
                                width={200}
                                height={250}
                            />
                        )}
                    </div>
                </div>
            );
        }
    }
}
