import http from "../http-common";

const getAll = () => {
    return http.get("/getRecipes");
};
const get = id => {
    return http.get(`/getRecipe/${id}`);
};
const create = data => {
    return http.post("/recipe", data);
};
const update = (id, data) => {
    return http.put(`/recipe/${id}`, data);
};
const remove = id => {
    return http.delete(`/deleteRecipe/${id}`);
};
const removeAll = () => {
    return http.delete(`/deleteRecipes`);
};
//Is this working in backend?
const findByName = name => {
    return http.get(`/recipes?name=${name}`);
};

export {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByName
};