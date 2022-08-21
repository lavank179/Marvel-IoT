const express = require('express');
const router = express.Router();
const userService = require('./user_service');

// routes
router.post('/authenticate', async(req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    try {
        const auth = await new userService().authenticate(req.body);
        res.end(JSON.stringify(auth));
    } catch (err) {
        res.end(JSON.stringify(err));
    }
});
router.post('/register', async(req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    try {
        const registered = await new userService().register(req.body);
        res.end(JSON.stringify(registered));
    } catch (err) {
        res.end(JSON.stringify(err));
    }
});
// router.get('/', getAll);

module.exports = router;