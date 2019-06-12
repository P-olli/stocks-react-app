import React, {Component} from 'react';
import {Tabs, Tab} from 'react-bootstrap'
import '../App.css';
import DepotOverview from "./depotOverview";
import Transactions from "./transactions";

export default class Depot extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isLoading: true,
            key: 'overview'
        };
    }

    render() {
        return(
            <Tabs
                id="controlled-tab-example"
                activeKey={this.state.key}
                onSelect={key => this.setState({ key })}
                mountOnEnter='true'
            >
                <Tab eventKey="overview" title="Overview"><DepotOverview/></Tab>
                <Tab eventKey="performance" title="Performance comparison"></Tab>
                <Tab eventKey="transactions" title="Transactions"><Transactions/></Tab>
            </Tabs>
        )
    }

}

