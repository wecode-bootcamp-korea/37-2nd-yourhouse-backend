import { join } from "path";
import { DataSource } from "typeorm";

require("dotenv").config();

// TypeORM Database 설정
const dataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  database: process.env.DB_NAME || "db_name",
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD,
  entities: [join(__dirname, "../../**/**/*Entity.{ts,js}")],
  synchronize: true,
  logging: process.env.NODE_ENV === "production" ? false : true,
});

export { dataSource };
// [
//   {
//     name: "test",
//     type: "mysql",
//     host: "localhost",
//     port: 3306,
//     username: "root",
//     password: 3587,
//     database: "typeorm-test",
//     synchronize: true,
//     logging: false,
//     dropSchema: true,
//     entities: ["../**/*Entity/*.ts"],
//     subscribers: ["src/migration/*.ts"],
//     migrations: ["src/migration/*.ts"],
//   },
//   {
//     name: "production",
//     type: "mysql",
//     host: "localhost",
//     port: 3306,
//     username: "root",
//     password: 3587,
//     database: "yourhouse2",
//     synchronize: false,
//     logging: true,
//     entities: ["dist/entities/*.js"],
//     subscribers: ["dist/migration/*.js"],
//     migrations: ["dist/migration/*.js"],
//     migrationsTableName: "migrations",
//     cli: {
//       entitiesDir: "src/entities",
//       migrationsDir: "src/migration",
//       subscribersDir: "src/subscriber",
//     },
//   },
// ];
