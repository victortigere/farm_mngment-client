import { URL } from "./Constants"

export default class RatesApiService {
    
    static getRiskRatesbyDate(date) {
        const token = localStorage.getItem('token')
        return  fetch(URL + `/api/trades/get-rates/${date}`,{
            'method': 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${token}`
            }
          })
            .then( resp => resp.json())
    }

    static getRevaluationRatesbyDate(date) {
        const token = localStorage.getItem('token')
        return  fetch(URL + `/api/trades/get-reval-rates/${date}`,{
            'method': 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${token}`
            }
          })
            .then( resp => resp.json())
    }

    static getRates() {
        const token = localStorage.getItem('token')
        return  fetch(URL + `/api/trades/get-rates`,{
            'method': 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${token}`
            }
          })
            .then( resp => resp.json())
    }

    static getRevaluationRates() {
        const token = localStorage.getItem('token')
        return  fetch(URL + `/api/trades/get-revaluation-rates`,{
            'method': 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${token}`
            }
          })
            .then( resp => resp.json())
    }

    static addRates(data){
        console.log(data)
        const token = localStorage.getItem('token')
        return fetch(URL + `/api/trades/add-rates`,{
                'method': 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body : JSON.stringify(data)
                })
                .then( resp => resp.json())
    }

    static addRevaluationRates(data){
        console.log(data)
        const token = localStorage.getItem('token')
        return fetch(URL + `/api/trades/add-reval-rates`,{
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