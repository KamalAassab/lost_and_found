import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from "@shared/schema";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function getDb() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'test',
    database: 'ecommerce'
  });

  return drizzle(connection, { 
    schema, 
    mode: 'default',
    prepare: true
  });
}

export const db = await getDb();