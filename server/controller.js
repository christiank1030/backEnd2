const houses = require("./db.json");
let houseId = 4

module.exports = {
    getHouses: (req, res) => {
        res.status(200).send(houses)
    },
    deleteHouse: (req, res) => {
        let houseToDelete = houses.findIndex((houseObj) => houseObj.id === +req.params.id);
        houses.splice(houseToDelete, 1) 
        res.status(200).send(houses)
    },
    createHouse: (req, res) => {
        let { address, price, imageURL } = req.body
        const newHouse = {
            id: houseId,
            address,
            price: parseInt(price),
            imageURL
        }
        houses.push(newHouse);
        res.status(200).send(houses);
        houseId++;
    },
    updateHouse: (req, res) => {
      let { id } = req.params;
      let { type } = req.body;
      let houseToUpdate = houses.findIndex((houseObj) => +houseObj.id === +id)

        if(houses[houseToUpdate].price <= 1000 && type === 'minus') {
            houses[houseToUpdate].price = 0;
            res.status(200).send(houses)
        } else if(type === 'plus') {
            houses[houseToUpdate].price += 10000;
            res.status(200).send(houses);
        } else if(type === 'minus') {
            houses[houseToUpdate].price -= 10000;
            res.status(200).send(houses)
        }
    },
};