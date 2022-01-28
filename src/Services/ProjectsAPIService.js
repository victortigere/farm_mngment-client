export default class ProjectApiService {
    static getProjects() {
        
        const token = localStorage.getItem('token')
        return  fetch('http://localhost:9088/api/projects/get/projects',{
            'method': 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${token}`
            }
          })
            .then( resp => resp.json())
    }

   
}