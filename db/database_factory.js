const mysql = require("mysql");
const axios = require("axios");
const credentails = require("./db_credentials.json");
// var fs = require("fs");
// var readline = require("readline");

// First you need to create a connection to the database
// Be sure to replace 'user' and 'password' with the correct values
const connector = mysql.createPool({
  host: credentails[0].host,
  port: credentails[0].port,
  user: credentails[0].user,
  password: credentails[0].password,
  database: credentails[0].database
});

async function check_connection_status() {
  return new Promise((resolve, reject) => {
    connector.getConnection(function (err, conn) {
      if (err) reject(err);
      else resolve("Connected to the database Successfully!");
    });
  });
}

async function initiate_check() {
  try {
    console.log(await check_connection_status());
    //import_data();
    //print_db_details();
  } catch (err) {
    console.log(err);
  }
}

async function executeQuery(query) {
  return new Promise(async (resolve, reject) => {
    connector.query(query, (err, rows, fields) => {
        if (err) {
            reject(err.sqlMessage);
        } else {
            resolve(rows);
        }
    });
    // try {
    //     const result = await conn.loadDataLavan(sql);
    //     if(result){
    //         resolve(result);
    //     } else {
    //         reject(result);
    //     }
    // } catch (err) {
    //     reject(err);
    // }
});
}

function loadDataLavan(sql) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "https://lavankumar.000webhostapp.com/powerpiezo-dbX/db-forwarder.php",
        {
          x2i5p9r5: credentails[0].sec_input_for000,
          input_sql_query: sql,
        }
      )
      .then((res) => {
        resolve(res.data);
        // console.log(res.data);
      })
      .catch((error) => {
        reject(error);
        //   console.error(error);
      });
  });
}

initiate_check();
module.exports = {
  connector,
  check_connection_status,
  loadDataLavan,
  executeQuery
};

//--------------------------------------------------------------------------------------------------------------------------------------------------
// All dump code - basically used for uploading data(from .sql file) to mysql db from local
// Last uploaded to clever-cloud on 30-07-2023

// function import_data() {
//   var rl = readline.createInterface({
//     input: fs.createReadStream("./sql/upload_data.sql"),
//     terminal: false,
//   });
//   rl.on("line", function (chunk) {
//     connector.query(chunk.toString("ascii"), function (err, sets, fields) {
//       if (err) console.log(err);
//     });
//   });
//   rl.on("close", function () {
//     console.log("finished");
//     connector.end();
//   });
// }

// async function print_db_details() {
//   await connector.query('SHOW DATABASES', (err, rows, fields) => {
//     if (err) {
//       console.log(err.sqlMessage);
//     } else {
//       console.log(rows);
//     }
//   });
  
//   await connector.query('SHOW TABLES', (err, rows, fields) => {
//       if (err) {
//         console.log(err.sqlMessage);
//       } else {
//         console.log(rows);
//       }
//     });
  
//     await connector.query('select * from p2_users', (err, rows, fields) => {
//       if (err) {
//         console.log(err.sqlMessage);
//       } else {
//         console.log(rows);
//       }
//     });

//     await connector.query('drop table TABLE_NAME;', (err, rows, fields) => {
//       if (err) {
//         console.log(err.sqlMessage);
//       } else {
//         console.log(rows);
//       }
//     });
// }