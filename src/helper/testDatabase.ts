import { DataSource } from "typeorm"
import path from "path"

var myDataSource : DataSource
export const testDatabase = {
  setup: async (): Promise<void> => {
    const entitiesPath = path.join(__dirname, "..", "models", "**", "*.*")
    const migrationsPath = path.join(__dirname, "..", "migrations", "**", "*.*")
    const AppDataSource = new DataSource({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "wendi",
      password: "123",
      database: "medusa-db-a5xb0",
      entities: [entitiesPath],
      migrations: [migrationsPath],
    })
    
    myDataSource = await AppDataSource.initialize()
  },

  destroy: async (): Promise<void> => {
    if (myDataSource) {
      await myDataSource.destroy()
    }
  },

  getConnection: (): DataSource => {
    return myDataSource
  },
}
