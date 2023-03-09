import { join } from "path";
import { DataSource } from "typeorm";

require("dotenv").config();

const databaseName =
  process.env.NODE_ENV === "test" ? process.env.DB_TESTNAME : process.env.DB_NAME;

// TypeORM Database 설정
const dataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  database: databaseName,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD,
  entities: [join(__dirname, "../**/*Entity.{ts,js}")],
  synchronize: process.env.NODE_ENV === "test" ? true : false,
  logging: process.env.NODE_ENV === "test" ? false : true,
  dropSchema: process.env.NODE_ENV === "test" ? true : false,
});

export { dataSource };
