var router = require('express').Router();
const conn = require('../db/db_config.js');
const getData = require('./controller');
const chartArea = require('./chartArea');
const lightsFans = require('./lights_fans');

// Home Page URLS
// update switches
router.post('/update/getSwitches', async(req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    try {
        const switches = await new getData().updateSwitches();
        res.end(JSON.stringify(switches));
    } catch (err) {
        res.end(JSON.stringify(err));
    }
});

router.post('/update/switchStatus', async(req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    try {
        const updateStatus = await new getData().updateSwitchStatus(req.body);
        res.end(JSON.stringify(updateStatus));
    } catch (err) {
        res.end(JSON.stringify(err));
    }
});

router.post('/update/addSwitches', async(req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    try {
        const addedSwitches = await new getData().addSwitches(req.body);
        res.end(JSON.stringify(addedSwitches));
    } catch (err) {
        res.end(JSON.stringify(err));
    }
});

router.post('/update/deleteSwitches', async(req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    try {
        const deletedSwitches = await new getData().deleteSwitches(req.body);
        res.end(JSON.stringify(deletedSwitches));
    } catch (err) {
        res.end(JSON.stringify(err));
    }
});
// ----------------------------------------------------------------------------------------------------------------------- //
// update charts and user details
router.post('/chartArea/lightfan', async(req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    try {
        const lightFan = await new chartArea().getLightFan();
        res.end(JSON.stringify(lightFan));
    } catch (err) {
        res.end(JSON.stringify(err));
    }
});

router.post('/chartArea/tempmoist', async(req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    try {
        const tempMoist = await new chartArea().getTempMoist();
        res.end(JSON.stringify(tempMoist));
    } catch (err) {
        res.end(JSON.stringify(err));
    }
});

router.post('/chartArea/weatherTable', async(req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    try {
        const weatherTable = await new chartArea().getWeatherTable();
        res.end(JSON.stringify(weatherTable));
    } catch (err) {
        res.end(JSON.stringify(err));
    }
});

router.post('/chartArea/userDetails', async(req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    try {
        const userDetails = await new chartArea().getUserDetails(req.body);
        res.end(JSON.stringify(userDetails));
    } catch (err) {
        res.end(JSON.stringify(err));
    }
});

// ----------------------------------------------------------------------------------------------------------------------- //
// Visualize Page URLS
router.post('/fetch/lights', async(req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    try {
        const fetchedLights = await new lightsFans().fetchLights(req.body);
        res.end(JSON.stringify(fetchedLights));
    } catch (err) {
        res.end(JSON.stringify(err));
    }
});

router.post('/fetch/fans', async(req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    try {
        const fetchedFans = await new lightsFans().fetchFans(req.body);
        res.end(JSON.stringify(fetchedFans));
    } catch (err) {
        res.end(JSON.stringify(err));
    }
});

router.post('/fetch/sensors', async(req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    try {
        const fetchedSensors = await new lightsFans().fetchSensors(req.body);
        res.end(JSON.stringify(fetchedSensors));
    } catch (err) {
        res.end(JSON.stringify(err));
    }
});
// ----------------------------------------------------------------------------------------------------------------------- //

router.post('/fetch/csvLF', async(req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    try {
        const fetchedCSVLF = await new lightsFans().fetchCSVLF(req.body);
        res.end(JSON.stringify(fetchedCSVLF));
    } catch (err) {
        res.end(JSON.stringify(err));
    }
});

router.post('/fetch/csvSEN', async(req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    try {
        const fetchedCSVSEN = await new lightsFans().fetchCSVSEN(req.body);
        res.end(JSON.stringify(fetchedCSVSEN));
    } catch (err) {
        res.end(JSON.stringify(err));
    }
});
module.exports = router;