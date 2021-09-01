module.exports = [
  {
    type: "postgres",
    port: 5432,
    host: "localhost",
    username: "docker",
    password: "123456",
    database: "pebmed",
    migrations: ["./src/shared/database/migrations/*.ts"],
    entities: ["./src/modules/**/entities/*.ts"],
    cli: {
      migrationsDir: "./src/shared/database/migrations"
    }
  }
]
