import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import StockTabs from './stocks/stockTabs';
import Depot from './depot/depot'
import logo from './logo.svg';
import './App.css';

export default class Overview extends Component {
    constructor(props) {
        super(props);
        this.handleDetailClick = this.handleDetailClick.bind(this);
        this.state = {isDetailView: false};
    }

    handleDetailClick() {
        this.setState({isDetailView: true});
    }

    render() {
        return <Router>
        <div className="Overview">
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h2>List of all the stocks you need</h2>
            </div>
            {!this.state.isDetailView ? (
                <div align="center">
                    <Link to="/stocks">
                        <button type="button" onClick={this.handleDetailClick}>
                            Stocks
                        </button>
                    </Link>
                    <Link to="/depot">
                        <button type="button" onClick={this.handleDetailClick}>
                            Depot
                        </button>
                    </Link>
                </div>
            ) :(
                <div align="center">
                    <Route exact path="/stocks" component={StockTabs} />
                    <Route exact path="/depot" component={Depot} />
                </div>
            )}
        </div>
        </Router>
    }

}