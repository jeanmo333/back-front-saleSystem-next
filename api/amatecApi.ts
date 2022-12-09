
import axios from 'axios';



const amatecApi = axios.create({
    baseURL: '/api'
    //baseURL: 'http://localhost:4000/api'
});


export default amatecApi;


