import axios from 'axios';
const GHIBLI_API_BASE_URL= "http://localhost:8081/api";
class GhibliService{

    getAllGhiblis(){
       let data = axios(GHIBLI_API_BASE_URL+"/allghibli");
       return data;
    }

    getAllGhiblisByName(title){
        let data = axios(GHIBLI_API_BASE_URL+"/ghibli/title:"+title);
        return data;
     }

    createGhibli(ghibli){
        return axios.post(GHIBLI_API_BASE_URL+"/addghibli",ghibli);
    }

    getGhibliById(id){
        return axios.get(GHIBLI_API_BASE_URL+"/ghibli/"+id);
    }

    updateGhibliById(ghibli,id){
        return axios.put(GHIBLI_API_BASE_URL+"/ghibli/"+id,ghibli);
    }

    deleteGhibli(id){
        return axios.delete(GHIBLI_API_BASE_URL+"/ghibli/"+id);
    }

    // LoginToAnimation(login){
    //     return axios.get(GHIBLI_API_BASE_URL+"/validateUserLoginInfo",{
    //         params:{
    //                 "loginName":"Angie",
    //                 "loginPassword":"123"
    //         }
    //     }
        
    //     ).then(res=> console.log('res:',res));
        
    // }

}

export default new GhibliService();