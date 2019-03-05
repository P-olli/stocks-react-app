import React, {Component} from 'react';
import Stock from './Stock';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import './App.css';
import config from './config'

export default class StockTabs extends Component {
    constructor() {
        super();
        this.state = {
            indexes: config.stocks
        }
    }

    render() {
        return <div className="StockTabs">
            <Tabs>
                <TabList>
                    {this.state.indexes.map((index) =>
                        <Tab>{index.index}</Tab>
                    )}
                </TabList>

                {this.state.indexes.map((index) =>
                    <TabPanel>
                        {index.stockNames.map((stockName) =>
                            <Stock stock={stockName}/>
                        )}
                    </TabPanel>
                )}
            </Tabs>
        </div>
    }
}

