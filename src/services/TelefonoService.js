import http from "../http-common"
import Telefono from "../components/Telefono";

const getAll = () => {
    return http.get("/telefonos")
}

const get = id => {
    return http.get(`/telefonos/${id}`);
};

const create = data => {
    return http.post("/telefonos", data);
}

const update = data => {
    return http.put("/telefonos", data);
}

const remove = id => {
    return http.delete(`/telefonos/${id}`);
};

export default {
    getAll,
    get,
    create,
    update,
    remove
}