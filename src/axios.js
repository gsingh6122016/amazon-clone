import axios from "axios";

const instance = axios.create({
    // baseURL: 'https://us-central1-clone-a6f75.cloudfunctions.net/api' 
    /// THE API {cloud function} URL
    
    baseURL: 'https://amazon--clone-backend.herokuapp.com'
});

export default instance;