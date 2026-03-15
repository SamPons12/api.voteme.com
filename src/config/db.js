import dotenv from 'dotenv'
import mysql from 'mysql2/promise'
dotenv.config({debug: true, encoding: "utf-8"})

let connection;

export async function connectDB() {
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PWD,
      database: process.env.DB_NAME
    })

    console.log('Conexión base de datos exitosa')
    return connection;
  } catch (error) {
    console.log(error)
  }
}

export function getDB() {
  return connection;
}