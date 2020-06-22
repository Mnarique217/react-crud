import http from "../http-common"

const getAll = () => {
    return http.get("/direcciones")
}

const get = id => {
    return http.get(`/direcciones/${id}`);
};

const create = data => {
    return http.post("/direcciones", data);
}

const update = data => {
    return http.put("/direcciones", data);
}

const remove = id => {
    return http.delete(`/direcciones/${id}`);
};

export default {
    getAll,
    get,
    create,
    update,
    remove
}