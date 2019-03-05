import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import StockTabs from './StockTabs';
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
                <div >
                    <Link to="/stocks">
                        <button type="button" onClick={this.handleDetailClick}>
                            Click Me!
                        </button>
                    </Link>
                </div>
            ) :(
                <Route exact path="/stocks" component={StockTabs} />
            )}
        </div>
        </Router>
    }

}