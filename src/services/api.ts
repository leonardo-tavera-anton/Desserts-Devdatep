import axios from 'axios';
//para poder manejar directamente la api de axios y no tener que estar importando axios en cada servicio
//se crea este archivo para centralizar la configuración de axios y poder reutilizarla en los servicios.
const api = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000, //10s
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;


