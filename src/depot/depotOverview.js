import React, {Component} from 'react';
import Table from 'react-bootstrap/Table'
import '../App.css';
import API from "../api";

export default class DepotOverview extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
        }
    }

    componentDidMount() {
        API.get('/user/depot')
            .then(response => {
                this.setState({
                    isLoading: false,
                    depotEntries: response.data
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return <div className="DepotOverview">
            {this.state.isLoading ? (
                'LOADING'
            ) : (
                <Table>
                    <thead>
                        <tr>
                            <th>Stock Id</th>
                            <th>Count</th>
                            <th>Average Price</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.depotEntries.map((depotEntry) =>
                        <tr>
                            <td>{depotEntry.stockId}</td>
                            <td>{depotEntry.count}</td>
                            <td>{depotEntry.averagePrice}</td>
                        </tr>
                    )
                    }
                    </tbody>
                </Table>
            )}

        </div>
    }
}

