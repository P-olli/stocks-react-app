import React, {Component} from 'react';
import Stock from './stock';
import {Tabs, Tab} from 'react-bootstrap'
import '../App.css';
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
            <Tabs defaultActiveKey="DAX" id="uncontrolled-tab-example">
                {this.state.indexes.map((index) =>
                    <Tab eventKey={index.index} title={index.index}>
                        {index.stockNames.map((stock) =>
                                <Stock stock={stock}/>
                        )
                        }
                    </Tab>
                )}
            </Tabs>
        </div>
    }
}

