import mysql from 'mysql2'

// TODO: use .env file
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'tamjid04',
    database: 'wta',
  }).promise()


// TODO: check if table exists then create it
// async function verifyDB(){
//     const exists = await pool.query(`SELECT EXISTS (
//         SELECT 1
//         FROM   information_schema.tables 
//         WHERE  table_schema = 'schema_name'
//         AND    table_name = 'table_name'
//         )`)
//     if (exists){
//         await createTable()
//     }
// }


// async function createTable(){
//     const [result] = await pool.query(`
//     CREATE TABLE users (
//         id integer PRIMARY KEY AUTO_INCREMENT,
//         name VARCHAR(255), phoneNumber VARCHAR(255),
//         program VARCHAR(255),
//         year VARCHAR(255),
//         created TIMESTAMP NOT NULL DEFAULT NOW()
//         )
//     `)
// }

export async function getAllUsers() {
    const [rows] = await pool.query("select * from users")
    return rows
  }

export async function getUser(id) {
  const [rows] = await pool.query(`select * from users where id = ?`, [id])
  return rows[0]
}

export async function createUser(name, phoneNumber, program, year ) {
  const [result] = await pool.query(`
  INSERT INTO users (name, phoneNumber, program, year )
  VALUES (?, ?, ?, ?)
  `, [name, phoneNumber, program, year ])

  const id = result.insertId
  return getUser(id)
}

export async function getProgram(program) {
  const [rows] = await pool.query(`select * from users where program = ?`, [program])
  return rows
}
