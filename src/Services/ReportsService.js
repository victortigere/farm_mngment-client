export default class ReportsApiService {
    static getFxPnL() {
        const token = localStorage.getItem('token')
        return  fetch(`http://localhost:8001/api/pnl/`,{
            'method': 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${token}`
            }
          })
            .then( resp => resp.json())
    }
}