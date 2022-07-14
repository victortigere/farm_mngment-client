import { URL } from "./Constants"

export default class ClientApiService {
    static getClients() { 
        const token = localStorage.getItem('token')
        return  fetch(URL + `/api/client/all`,{
            'method': 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${token}`
            }
          })
            .then( resp => resp.json())
    }

    static addClient(data){
        const token = localStorage.getItem('token')
        return fetch(URL + `/api/client/save`,{
                'method': 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body : JSON.stringify(data)
                })
                .then( resp => resp.json())
    }
}