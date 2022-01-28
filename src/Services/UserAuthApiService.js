export default class ApiService {

    static registerUser(body) {
        return fetch(`http://localhost:9088/whitelist/create-user`,{
            'method': 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(body)
            })
            .then( resp => resp.json())
    }

    static login(body){
        return fetch(`http://localhost:9088/api/authenticate/`,{
            'method' : 'POST',
            headers : { 
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(body)
            })
            .then(resp => resp.json())
        }
}