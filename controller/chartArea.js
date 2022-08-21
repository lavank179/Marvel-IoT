const conn = require('../db/db_config.js');
const date = require('date-and-time');
class ChartArea {
    //sql query final execution single function
    async executeQuery(sql) {
        return new Promise(async(resolve, reject) => {
            // conn.con.query(sql, (err, rows, fields) => {
            //     if (err) {
            //         reject(err.sqlMessage);
            //     } else {
            //         resolve(rows);
            //     }
            // });
            const result = await conn.loadDataLavan(sql);
            if(result){
                resolve(result);
            } else {
                reject(result);
            }
        });
    }

    async formatData(query1, query2, type) {
        let table = [];
        table[0] = [];
        table[1] = [];
        table[2] = [];
        table[3] = [];

        let r1 = await this.executeQuery(query1);
        await r1.forEach((row, i) => {
            if (type == "lf") table[0][i] = Number((row.powers)).toFixed(2);
            else table[0][i] = Number((row.temperature)).toFixed(2);
            table[1][i] = date.format(new Date(row.etime), 'YYYY-MM-DD') + "IST";
        });
        r1 = await this.executeQuery(query2);
        await r1.forEach((row, i) => {
            if (type == "lf") table[2][i] = Number((row.powers)).toFixed(2);
            else table[2][i] = Number((row.moisture)).toFixed(2);
            table[3][i] = date.format(new Date(row.etime), 'YYYY-MM-DD') + "IST";
        });
        console.log(table);

        return table;
    }
    async getLightFan() {
        return new Promise(async(resolve, reject) => {
            try {
                resolve(await this.formatData("SELECT SUM(total) AS powers, endTime AS etime FROM `p2_lights` GROUP BY date(timed) limit 5", "SELECT SUM(total) AS powers, endTime AS etime FROM `p2_fans` GROUP BY date(timed) limit 5", "lf"));
            } catch (err) {
                reject(err);
            }
        });
    }
    async getTempMoist() {
        return new Promise(async(resolve, reject) => {
            try {
                resolve(await this.formatData("SELECT temperature AS temperature, timed AS etime FROM `p2_sensors` ORDER BY timed DESC limit 5", "SELECT moisture as moisture, timed AS etime FROM `p2_sensors` ORDER BY timed DESC limit 5", "sensor"));
            } catch (err) {
                reject(err);
            }
        });
    }

    async getWeatherTable() {
        return new Promise(async(resolve, reject) => {
            try {
                resolve(await this.executeQuery("SELECT * From p2_sensors ORDER BY timed DESC LIMIT 5"));
            } catch (err) {
                reject(err);
            }
        });
    }

    async getUserDetails(input) {
        return new Promise(async(resolve, reject) => {
            try {
                resolve(await this.executeQuery("SELECT * From p2_users where email = '" + input.email + "'"));
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = ChartArea;