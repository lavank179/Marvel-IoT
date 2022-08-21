// users hardcoded for simplicity, store in a db for production applications
// const users = require('../users.json')
const conn = require('../db/db_config.js');

class UserService {
    //sql query final execution single function
    async executeQuery(sql) {
        return new Promise(async (resolve, reject) => {
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

    async authenticate(input) {
        return new Promise(async(resolve, reject) => {
            try {
                const user_details = await this.executeQuery("SELECT * From p2_users WHERE email = '" + input.email + "'");
                if (user_details.length <= 0) {
                    reject({ stat: 1, message: "User doesn't exists! Check User credentails." });
                } else {
                    if (input.email == user_details[0].email && input.password == user_details[0].password) {
                        resolve({ stat: 3, message: "Login Successfull!!!" });
                    } else {
                        reject({ stat: 2, message: "User credentials are Incorrect! Please check and re-enter again." });
                    }
                }
            } catch (err) {
                reject(err);
            }
        });
    }

    async getAll() {
        return users.map(u => {
            const { password, ...userWithoutPassword } = u;
            return userWithoutPassword;
        });
    }

    async register(input) {
        return new Promise(async(resolve, reject) => {
            try {
                const checkUserExists = await this.executeQuery("SELECT * FROM p2_users WHERE email = '" + input.email + "'");
                if (checkUserExists.length > 0) {
                    reject({ stat: 1, message: "User already exists!" });
                } else {
                    resolve({ stat: 2, message: this.executeQuery("INSERT INTO p2_users (email, password, name, phone, timed) VALUES ('" + input.email + "', '" + input.password + "', '" + input.username + "','" + input.phone + "', now())") });
                }
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = UserService;