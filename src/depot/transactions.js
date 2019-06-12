import React, {Component} from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import '../App.css';
import Modal from 'react-bootstrap/Modal'
import API from "../api";

export default class Transactions extends Component {
    constructor() {
        super();

        this.handleShow = this.handleShow.bind(this);
        this.handleAbort = this.handleAbort.bind(this);
        this.handleSave = this.handleSave.bind(this);

        this.state = {
            isLoading: true,
            show: false,
        }
    }

    handleAbort() {
        this.setState({show: false});
    }

    handleSave(event) {
        event.preventDefault();
        let stockId = this.refs.stockId.value.trim();
        let count = this.refs.count.value.trim();
        let price = this.refs.price.value.trim();
        let date = this.refs.date.value.trim();
        let acquisition = this.refs.acquisition.value.trim() === 'Acquisition' ? 'true' : 'false'

        API.post('/user/transactions/', {
            stockId: stockId,
            count: count,
            price: price,
            date: date,
            acquisition: acquisition,
        }).then(res => {
            this.setState({show: false});
            console.log(res)
            return res;
        }).catch((error) => {
            console.error(error);
        });
    }

    handleShow() {
        this.setState({show: true});
    }

    componentDidMount() {
        return API.get('/user/transactions')
            .then(response => {
                this.setState({
                    isLoading: false,
                    transactions: response.data
                });
            }).catch((error) => {
                console.error(error);
                this.setState({
                    isLoading: false,
                });
            });
    }

    render() {
        return <div className="Transactions">
            <div>
                <Button variant="primary" onClick={this.handleShow}>
                    Add Transaction
                </Button>
            </div>
            <Modal show={this.state.show} onHide={this.handleAbort}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Transaction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={e => this.handleSave(e)}>
                        <Form.Group controlId="formGroupStockId">
                            <Form.Label>Stock ID</Form.Label>
                            <Form.Control required type="string" placeholder="Enter Stock ID" ref="stockId"/>
                        </Form.Group>
                        <Form.Group controlId="formGroupCount">
                            <Form.Label>Number of stocks</Form.Label>
                            <Form.Control required type="number"
                                          placeholder="Enter the number of stocks you bought/ sold." ref="count"/>
                        </Form.Group>
                        <Form.Group controlId="formGroupPrice">
                            <Form.Label>Price of the stock</Form.Label>
                            <Form.Control required type="number"
                                          placeholder="Enter the price of the stocks you bought/ sold." ref="price"/>
                        </Form.Group>
                        <Form.Group controlId="formGroupDate">
                            <Form.Label>Date of the acquisition</Form.Label>
                            <Form.Control required type="date"
                                          placeholder="Enter the price of the stocks you bought/ sold." ref="date"/>
                        </Form.Group>
                        <Form.Group controlId="formGridState">
                            <Form.Label>Type</Form.Label>
                            <Form.Control required as="select" ref="acquisition">
                                <option>Acquisition</option>
                                <option>Disposition</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="secondary" onClick={this.handleAbort}>
                            Abort
                        </Button>
                        <Button variant="primary" type="submit">Add transaction</Button>
                    </Form>
                </Modal.Body>
            </Modal>
            {this.state.isLoading ? (
                'LOADING'
            ) : (
                <Table size="sm">
                    <thead>
                    <tr>
                        <th>Stock Id</th>
                        <th>Count</th>
                        <th>Price</th>
                        <th>Date</th>
                        <th>Acquisition</th>
                        <th>Total Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.transactions.map((transaction) =>
                        <tr>
                            <td>{transaction.stockId}</td>
                            <td>{transaction.count}</td>
                            <td>{transaction.price}</td>
                            <td>{transaction.date}</td>
                            <td>{transaction.acquistion ? ('BUY') : ('SELL')}</td>
                            <td>{transaction.count * transaction.price}</td>
                        </tr>
                    )
                    }
                    </tbody>
                </Table>
            )}

        </div>
    }
}

