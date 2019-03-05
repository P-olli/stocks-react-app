import React, {Component} from 'react';
import Moment from 'moment';
import {Line} from 'react-chartjs-2';

function options(stock) {
    return {
        maintainAspectRatio: false,
        responsive: true,
        title: {
            display: true,
            text: stock.stockId,
            fontFamily: "Roboto",
            fontSize: 20,
        },
        scales: {
            yAxes: [{
                display: true,
                ticks: {
                    beginAtZero: true
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

function GetData(stock) {
    if (stock != null) {
        var dates = stock.reverse().map((price) => Moment(price.day).format('DD.MM.YYYY'));
        var prices = stock.map((price) => price.price);

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
                data: stock.MovingAverage38,
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
                data: stock.MovingAverage100,
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,200,200,0.4)',
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
            }, {
                label: 'Moving average 200',
                data: stock.MovingAverage200,
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(100,100,100,0.4)',
                borderColor: 'rgba(100,100,100,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(100,100,100,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(100,100,100,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
            }
            ]
        };
    }
}

export default class Stock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        }
    }

    componentDidMount() {
        return fetch('http://localhost:8081/stocks/' + this.props.stock + '?timeRange=daily&page=0&size=100')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    stock: responseJson
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
                <div className="Stock">
                    <div>
                        <Line
                            data={GetData(this.state.stock)}
                            options={options(this.state.stock[0])}
                            width={200}
                            height={250}
                        />
                    </div>
                </div>
            );
        }
    }
}
