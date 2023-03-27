import axios from "axios";

const dataBaseUrl = 'http://localhost:3001/api/persons'

const personsService = {
    getAll: () => {
        const request = axios.get(dataBaseUrl)
        return request.then(response => response.data)
    },
    create: (newObject) => {
        const request = axios.post(dataBaseUrl, newObject)
        return request.then(response => response.data)
    },
    remove: (id) => {
        const request = axios.delete(`${dataBaseUrl}/${id}`)
        return request.then(response => response.data)
    }
};

export default personsService;