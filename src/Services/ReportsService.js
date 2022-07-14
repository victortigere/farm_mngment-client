import { URL } from "./Constants"

export default class ReportsApiService {
    static getFxPnL(date) {
        const token = localStorage.getItem('token')
        return  fetch(URL + `/api/pnl/`,{
            'method': 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${token}`
            }
          })
            .then( resp => resp.json())
    }

static getFxPnLByDate(date) {
    console.log(date)
    const token = localStorage.getItem('token')
    return  fetch(URL + `/api/pnl/${date}`,{
        'method': 'GET',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${token}`
        }
      })
        .then( resp => resp.json())
}
}
