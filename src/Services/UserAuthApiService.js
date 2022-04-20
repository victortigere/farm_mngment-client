export default class ApiService {

    static registerUser(body) {
        return fetch(`http://localhost:8001/whitelist/create-user`,{
            'method': 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(body)
            })
            .then( resp => resp.json())
    }

    static login(body){
        return fetch(`http://localhost:8001/api/authenticate/`,{
            'method' : 'POST',
            headers : { 
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(body)
            })
            .then(resp => resp.json())
        }

        static getUserDetails(body){
            const token = localStorage.getItem('token')
            return fetch(`http://localhost:8001/api/user/info/`,{
                'method' : 'GET',
                headers : { 
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body : JSON.stringify(body)
                })
                .then(resp => resp.json())
            }
}