import axios from "axios";

const Api = axios.create({
    baseURL: "http://localhost/backend-shop-laravel/public/api/",
});

export default Api