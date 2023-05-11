const { Router } = require('express');
const { readAsJson } = require('../utilities/utils');
const jwt = require('jsonwebtoken')

const authenticationRoutes = Router();


authenticationRoutes.get('/', (req, res) => {

    const usersList = readAsJson('./key-list.json')
    let username = req.query.username;
    let password = req.query.password;

    let user = usersList.find(x => x.username == username && x.password == password)

    if (user) {
        // logic to generate the token
        const token = jwt.sign({
            username:user.username            
        },'MySecretReceipe')
        res.json({
            authenticated: true,
            token: token
        })
    } else {
        res.json({
            authenticated: false
        })
    }

})



module.exports = { authenticationRoutes }