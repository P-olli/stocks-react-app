import axios from "axios";

export default axios.create({
    baseURL: 'http://localhost:8081',
    timeout: 1000,
    headers: {'content-type': 'application/json'}
});