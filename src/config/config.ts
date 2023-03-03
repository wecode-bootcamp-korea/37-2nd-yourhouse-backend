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
  entities: [join(__dirname, "../**/*Entity.{ts,js}")],
  synchronize: true,
  logging: process.env.NODE_ENV === "production" ? false : true,
});

export { dataSource };
