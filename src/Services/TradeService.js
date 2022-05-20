export default class DealApiService {
    static getDealS() {
        
        const token = localStorage.getItem('token')
        return  fetch('http://localhost:8001/api/trades/get',{
            'method': 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${token}`
            }
          })
            .then( resp => resp.json())
    }

    static getDeal(id) {
        const token = localStorage.getItem('token')
        return  fetch(`http://localhost:8001/api/trades/${id}`,{
            'method': 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${token}`
            }
          })
            .then( resp => resp.json())
    }

    static addDeaL(data){
        const token = localStorage.getItem('token')
        return fetch('http://localhost:8001/api/trades/create',{
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