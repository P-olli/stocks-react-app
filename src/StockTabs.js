import React, {Component} from 'react';
import Stocks from './Stocks';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import logo from './logo.svg';
import './App.css';
import config from './config'

export default class StockTabs extends Component {
    constructor() {
        super();
        this.state = {
            stockNames: config.stocks
        }
    }

    render() {
        return <div className="StockTabs">
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h2>List of all the stocks you need</h2>
            </div>
            <Tabs>
                <TabList>
                    {this.state.stockNames.map((stock) =>
                        <Tab>{stock.index}</Tab>
                    )
                    }
                </TabList>
                {this.state.stockNames.map((stock) =>
                    <TabPanel><Stocks stocks={stock.stockNames}/></TabPanel>
                )
                }
            </Tabs>
        </div>
    }
}

