const { Router } = require('express');
const { pushAsJson } = require('../utilities/utils');

const signupRoutes = Router();


signupRoutes.post('/', (req, res) => {
    let body = req.body /// this is the json body that we sent from REACT app

    pushAsJson('./key-list.json', body)

    res.json(
        {
            created: true
        })
})

module.exports = { signupRoutes }