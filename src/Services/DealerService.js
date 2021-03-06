import { URL } from "./Constants"

export default class DealerApiService {
    static getDealers() { 
        const token = localStorage.getItem('token')
        return  fetch(URL + `/api/dealer/get/dealers`,{
            'method': 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${token}`
            }
          })
            .then( resp => resp.json())
    }

    static addDealer(data){
        const token = localStorage.getItem('token')
        return fetch(URL + `/api/user/create/dealer`,{
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