import http from "../http-common";

const getAll = () => {
    return http.get("/recipes");
};
const get = id => {
    return http.get(`/recipes/${id}`);
};
const create = data => {
    return http.post("/recipes", data);
};
const update = (id, data) => {
    return http.put(`/recipes/${id}`, data);
};
const remove = id => {
    return http.delete(`/recipes/${id}`);
};
const removeAll = () => {
    return http.delete(`/recipes`);
};
//Is this working in backend?
const findByName = name => {
    return http.get(`/recipes?name=${name}`);
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByName
};