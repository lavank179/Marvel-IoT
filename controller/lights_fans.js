const res = require('express/lib/response');
const conn = require('../db/database_factory.js');
const date = require('date-and-time');
class LightsFans {
    //sql query final execution single function
    async executeQuery(sql) {
        return await db_factory.executeQuery(sql);
    }

    async getQueryLights(Did, from, to, filter) {
        if (Did == 50) return "SELECT SUM(total) AS powers, UNIX_TIMESTAMP(endTime) AS etime FROM p2_lights WHERE (endtime BETWEEN '" + from + "' AND '" + to + "') GROUP BY " + filter + "(endTime)";
        else if (Did == 60) return "SELECT SUM(total) AS powers, Did AS id FROM p2_lights WHERE (endtime BETWEEN '" + from + "' AND '" + to + "') GROUP BY Did";
        else return "SELECT SUM(total) AS powers, UNIX_TIMESTAMP(endTime) AS etime FROM p2_lights WHERE Did=" + Did + " AND (endtime BETWEEN '" + from + "' AND '" + to + "') GROUP BY " + filter + "(endTime)";
    }

    async getQueryFans(Did, from, to, filter) {
        if (Did == 50) return "SELECT SUM(total) AS powers, UNIX_TIMESTAMP(endTime) AS etime, UNIX_TIMESTAMP(startTime) as stime FROM p2_fans WHERE (endtime BETWEEN '" + from + "' AND '" + to + "') GROUP BY " + filter + "(endTime)";
        else if (Did == 60) return "SELECT SUM(total) AS powers, Did AS id, UNIX_TIMESTAMP(startTime) as stime FROM p2_fans WHERE (endtime BETWEEN '" + from + "' AND '" + to + "') GROUP BY Did";
        else return "SELECT SUM(total) AS powers, UNIX_TIMESTAMP(endTime) AS etime, UNIX_TIMESTAMP(startTime) as stime FROM p2_fans WHERE Did=" + Did + " AND (endtime BETWEEN '" + from + "' AND '" + to + "') GROUP BY " + filter + "(endTime)";
    }

    async getQuerySensors(Did, from, to) {
        if (Did == 30) return "SELECT (temperature) AS val, UNIX_TIMESTAMP(timed) AS etime FROM p2_sensors WHERE (timed BETWEEN '" + from + "' AND '" + to + "')";
        else if (Did == 31) return "SELECT (humidity) AS val, UNIX_TIMESTAMP(timed) AS etime FROM p2_sensors WHERE (timed BETWEEN '" + from + "' AND '" + to + "')";
        else return "SELECT (moisture) AS val, UNIX_TIMESTAMP(timed) AS etime FROM p2_sensors WHERE (timed BETWEEN '" + from + "' AND '" + to + "')";
    }

    async getQueryCSVLF(Did, from, to, filter) {
        if (Did == 51) return "SELECT SUM(total) AS powers, endTime AS etime FROM p2_lights WHERE (endtime BETWEEN '" + from + "' AND '" + to + "') GROUP BY " + filter + "(endTime)";
        else if (Did == 52) return "SELECT SUM(total) AS powers, endTime AS etime, startTime as stime FROM p2_fans WHERE (endtime BETWEEN '" + from + "' AND '" + to + "') GROUP BY " + filter + "(endTime)";
        else if (Did == 16 || Did == 17 || Did == 18 || Did == 19) return "SELECT SUM(total) AS powers, endTime AS etime FROM p2_lights WHERE Did='" + Did + "' AND (endtime BETWEEN '" + from + "' AND '" + to + "') GROUP BY " + filter + "(endTime)";
        else if (Did == 26 || Did == 25) return "SELECT SUM(total) AS powers, endTime AS etime, startTime as stime FROM p2_fans WHERE Did='" + Did + "' AND (endtime BETWEEN '" + from + "' AND '" + to + "') GROUP BY " + filter + "(endTime)";
        else return "SELECT SUM(total) AS powers, Did AS id FROM p2_lights WHERE (endtime BETWEEN '" + from + "' AND '" + to + "') GROUP BY Did";
    }

    async getQueryCSVSEN(Did, from, to, filter) {
        if (Did == 30) return "SELECT (temperature) AS val, (timed) AS etime FROM p2_sensors WHERE (timed BETWEEN '" + from + "' AND '" + to + "')";
        else if (Did == 31) return "SELECT (humidity) AS val, (timed) AS etime FROM p2_sensors WHERE (timed BETWEEN '" + from + "' AND '" + to + "')";
        else return "SELECT (moisture) AS val, UNIX_TIMESTAMP(timed) AS etime FROM p2_sensors WHERE (timed BETWEEN '" + from + "' AND '" + to + "')";
    }

    async formatAllData(result, type) {
        let table = [];
        table.push(["Power(W)", type + " ID no."]);
        await result.forEach((row) => {
            let val2;
            if (type == "Light") {
                val2 = Number((row.powers)).toFixed(3);
            } else {
                val2 = Number(row.etime) - Number(row.stime);
                val2 = val2 * (80 / 3600);
            }
            table.push([type + (row.id).toString(), Number(val2)]);
        });
        return table;
    }

    async formatLimitedDate(result, type, id) {

        let rows = [];
        let title = "";
        await result.forEach((row) => {
            let val1, val2;

            if (type == "Light") {
                val1 = row.etime;
                val2 = (row.powers).toString();
                title = "power";
            } else if (type == "Sensor") {
                val1 = row.etime;
                val2 = row.val;
                if (id == 30) title = "Temperature";
                else if (id == 31) title = "Humidity";
                else if (id == 32) title = "Soil Moisture";
            } else {
                title = "power";
                val1 = date.format(new Date(row.etime * 1000), 'YYYY-MM-DD');
                let d1 = date.format(new Date("2021-03-17"), 'YYYY-MM-DD');
                let d2 = date.format(new Date("2021-03-18"), 'YYYY-MM-DD');
                let d3 = date.format(new Date("2021-03-23"), 'YYYY-MM-DD');
                if (val1 == d1 || val1 == d2 || val1 == d3) {
                    val1 = Number(row.stime) - Number(row.etime);

                } else {

                    val1 = Number(row.etime) - Number(row.stime);
                }
                val2 = val1 * (80 / 3600);

                val1 = row.etime;
            }
            let sub_arr = {
                "c": [{
                        "v": "Date(" + val1 + "000)"
                    },
                    {
                        "v": val2
                    }
                ]
            };
            rows.push(sub_arr);
        });

        let final_result = {
            "cols": [{
                    "label": "Date Time",
                    "type": "datetime"
                },
                {
                    "label": title,
                    "type": "number"
                }
            ],
            "rows": rows
        };
        return final_result;
    }

    async formatCSV(result, id, type) {
        let table = [];
        if (type == "SEN") {
            if (id == 30) table.push(["Temperature (C)", "Time"]);
            else if (id == 31) table.push(["Humidity (%)", "Time"]);
            else if (id == 32) table.push(["Soil Moisture (%)", "Time"]);

            result.forEach((row) => {
                table.push([Number((row.powers).toFixed(5)), row.etime]);
            });
        } else {
            if (id == 60) table.push(["Power(W)", "Lights Zone"]);
            else table.push(["Power(W)", "Time"]);
            result.forEach((row) => {
                if (id == 60) table.push([Number((row.powers).toFixed(5)), row.id]);
                else table.push([Number((row.powers).toFixed(5)), row.etime]);
            });
        }
        return table;
    }

    async fetchLights(input) {
        console.log("yes");
        let query = await this.getQueryLights(Number(input.Did), input.fDate, input.tDate, input.fils);
        let result = await this.executeQuery(query);
        //console.log(result);
        if (Number(input.Did) == 60) return await this.formatAllData(result, "Light");
        else return await this.formatLimitedDate(result, "Light");
    }

    async fetchFans(input) {
        let query = await this.getQueryFans(Number(input.Did), input.fDate, input.tDate, input.fils);
        let result = await this.executeQuery(query);
        if (Number(input.Did) == 60) return await this.formatAllData(result, "Fan");
        else return await this.formatLimitedDate(result, "Fan");
    }

    async fetchSensors(input) {
        let query = await this.getQuerySensors(Number(input.Did), input.fDate, input.tDate);
        let result = await this.executeQuery(query);
        return await this.formatLimitedDate(result, "Sensor", Number(input.Did));
    }

    async fetchCSVLF(input) {
        let query = await this.getQueryCSVLF(Number(input.Did), input.fDate, input.tDate, input.fils);
        let result = await this.executeQuery(query);
        return await this.formatCSV(result, Number(input.Did), "LF");
    }

    async fetchCSVSEN(input) {
        let query = await this.getQueryCSVSEN(Number(input.Did), input.fDate, input.tDate, input.fils);
        let result = await this.executeQuery(query);
        return await this.formatCSV(result, Number(input.Did), "SEN");
    }
}

module.exports = LightsFans;