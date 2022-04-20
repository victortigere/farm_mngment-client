export default class DealerApiService {
    static getDealers() {
        
        const token = localStorage.getItem('token')
        return  fetch('http://localhost:8001/api/dealer/get/dealers',{
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
        console.log("add invoice")
        return fetch('http://localhost:8001/api/user/create/dealer',{
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