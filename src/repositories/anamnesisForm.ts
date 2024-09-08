import { AnamnesisForm } from "../models/anamnesisForm"
import { 
  dataSource,
} from "@medusajs/medusa/dist/loaders/database"

export const AnamnesisFormRepository = dataSource.getRepository(AnamnesisForm)

export default AnamnesisFormRepository