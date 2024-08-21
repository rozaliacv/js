const knex = require("./knex");

function createCar(car) {
    return knex("cars").insert(car);
};

function getAllCars(car) {
    return knex("cars").select("*");
};

function deleteCar(id) {
    return knex("cars").where("id",id).del();
};

function updateCar(id,car) {
    return knex("cars").where("id",id).update()
}

module.exports = {
    createCar,
    getAllCars,
    deleteCar,
    updateCar
}