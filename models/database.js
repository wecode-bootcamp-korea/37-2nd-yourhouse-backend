// class Database {
//     constructor(database) {
//         this.database = database;
//     }

//     async query(sql, params) {
//         const result = await this.database.query(sql, params);

//         return new QueryResultSet(result)
//     }
// }

// class QueryResultSet {
//     constructor(result) {
//         this.result = result;
//     }

//     fetchOne() {
//         const [row] = this.result;

//         return row
//     }

//     fetchAll() {
//         return this.result;
//     }

//     getLastInsertId() {
//         return this.result.insertId;
//     }

//     getAffectdRows() {
//         return this.result.AffectdRows;
//     }

//     isExists() {
//         return Object.values(this.result[0])[0] === "0" ? false : true
//     }
// }

// module.exports = Database
