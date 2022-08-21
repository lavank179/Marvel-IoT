lightFan();
TempLevel();
weatherTable();

function lightFan() {
    var options = {
        series: [],
        chart: {
            height: 323,
            type: "area",
        },
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: "smooth",
        },
        xaxis: {
            type: "datetime",
        },
    };
    var chart = new ApexCharts(document.querySelector("#chartA1"), options);
    chart.render();
    $.ajax({
        url: "/controller/chartArea/lightfan",
        method: "POST",
        async: false,
        data: { lightfan: "apiloaded" },
        success: function(data) {
            console.log(data);
            let lights = data;
            let li1 = [],
                li2 = [];
            for (let u = 0; u < lights[0].length; u++) {
                li1.push({ x: lights[1][u], y: lights[0][u] });
                li2.push({ x: lights[3][u], y: lights[2][u] });
            }
            chart.updateSeries([
                { name: "Lights", data: li1 },
                { name: "Fans", data: li2 },
            ]);
        },
    });
}

function TempLevel() {
    var options = {
        series: [],
        chart: {
            height: 340,
            type: "area",
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
        },
        xaxis: {
            type: "datetime",
        },
    };
    var chart = new ApexCharts(document.querySelector("#chartA2"), options);
    chart.render();
    $.ajax({
        url: "/controller/chartArea/tempmoist",
        method: "POST",
        async: false,
        data: { tempmoist: "apiloaded" },
        success: function(data) {
            let dat = data;
            let li1 = [],
                li2 = [];


            if (dat.length == undefined) {
                document.querySelector("#chartA2").innerHTML = "No data Found";
            } else {
                for (let u = 0; u < dat[0].length; u++) {
                    li1.push({ x: dat[1][u], y: dat[0][u] });
                    li2.push({ x: dat[3][u], y: dat[2][u] });
                }
            }
            chart.updateSeries([
                { name: "Lights", data: li1 },
                { name: "Fans", data: li2 },
            ]);
        },
    });
}

function weatherTable() {
    $.ajax({
        url: "/controller/chartArea/weatherTable",
        method: "POST",
        async: false,
        data: { tempmoist: "apiloaded" },
        success: function(data) {
            console.log(data);
            document.querySelector("#weatherTable").innerHTML = "";
            data.forEach((row) => {
                const tr = document.createElement("tr");
                tr.innerHTML = "<td>" + row.temperature + "</td><td>" + row.humidity + "</td><td>" + row.moisture + "</td><td>" + new Date(row.timed) + "</td>";
                document.querySelector("#weatherTable").appendChild(tr);
            });
        },
    });
}