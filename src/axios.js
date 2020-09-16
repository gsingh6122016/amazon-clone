import axios from "axios";

const instance = axios.create({
    // baseURL: 'https://us-central1-clone-a6f75.cloudfunctions.net/api' 
    /// THE API {cloud function} URL
    
    baseURL: 'http://localhost:5001/clone-a6f75/us-central1/api'
});

export default instance;