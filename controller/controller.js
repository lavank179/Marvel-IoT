// const res = require('express/lib/response');
const fs = require("fs");
class Controller {
    async updateSwitches() {
        return new Promise(async (resolve, reject) => {
            try {
                const data = require("../data.json");
                resolve(data);
            } catch (err) {
                reject(err);
            }
        });
    }

    async updateSwitchStatus(input) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = require("../data.json");
                for (var switches of data) {
                    if (switches.id == input.name) {
                        switches.status = input.stat;
                    }
                }
                fs.writeFile('data.json', JSON.stringify(data), err => {
                    if (err) reject(err);
                    const data2 = require("../data.json");
                    console.log("Done writing...");
                    resolve("success");
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    async addSwitches(input) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = require("../data.json");

                const tempSwitch = {
                    id: Number(input.dId),
                    name: input.dName,
                    status: "off",
                    category: input.dCate
                }

                data.push(tempSwitch);

                fs.writeFile('data.json', JSON.stringify(data), err => {
                    if (err) reject(err);
                    const data2 = require("../data.json");
                    console.log("Done writing...");
                    resolve("success");
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    async deleteSwitches(input) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = require("../data.json");
                for (let i = 0; i < data.length; i++) {
                    if (data[i].id == Number(input.dId)) {
                        delete data[i];
                    }
                }
                const results = data.filter(element => {
                    return element !== null;
                });
                fs.writeFile('data.json', JSON.stringify(results), err => {
                    if (err) reject(err);
                    const data2 = require("../data.json");
                    console.log("Done writing...");
                    resolve("success");
                });
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = Controller;