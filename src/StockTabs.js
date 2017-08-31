import React, {Component} from 'react';
import Stocks from './Stocks';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import logo from './logo.svg';
import './App.css';

const stocks = [
    {
        index: 'DAX',
        stockNames: 'ADS,ALV,BAS,BAY,BMW,CBK,CON,DAI,DB1,DBK,DPB,DPW,DTE,EOA,FME,HEN3,HRX,IFX,LHA,LIN,MAN,MEO,MRK,MUV2,RWE,SAP,SIE,TKA,TUI1,VOW'
    }, {
        index: 'MDAX',
        stockNames: 'ARL,AIR,AOX,NDA,SPR,GBF,BNR,CEC,1COV,EVD,DEQ,DWNI,DUE,EVK,FIE,FRA,FPE,G1A,GXI,HNR1,HLE,HOT,BOSS,IGY,JUN3,SDF,KGX,KRN,LXS,LEG,LEO,MTX,NOEJ,OSR,PBB,RAA,RHM,RRTL,SZG,SHA,SAZ,SNH,SAX,SZU,S1Y,TEG,TLX,UNO1,WCH,ZAL'
    }
    // ,{
    //     TECDAX: {
    //         stockNames: ''
    //     }
    // },{
    //     DOWJONES: {
    //         stockNames: ''
    //     }
    // },{
    //     NASDAQ: {
    //         stockNames: ''
    //     }
    // }
];


export default class StockTabs extends Component {
    constructor() {
        super();
        this.state = {
            stockNames: stocks
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

