import http from "../http-common"

const getAll = () =>{
 return http.get("/personas");   
}

const get = id => {
    return http.get(`/personas/${id}`);
};

const create = data =>{
    return http.post("/personas",data);   
}

const update = data =>{
    return http.put("/personas",data);   
}

const remove = id => {
    return http.delete(`/personas/${id}`);
};

export default {
    getAll,
    get,
    create,
    update,
    remove
}