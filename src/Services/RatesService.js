export default class RatesApiService {
    static getRates() {
        const token = localStorage.getItem('token')
        return  fetch('http://localhost:8001/api/trades/get-rates',{
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
        return fetch('http://localhost:8001/api/trades/add-rates',{
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