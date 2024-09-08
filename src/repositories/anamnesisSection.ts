import { AnamnesisSection } from "../models/anamnesisSection"
import { 
  dataSource,
} from "@medusajs/medusa/dist/loaders/database"

export const AnamnesisSectionRepository = dataSource.getRepository(AnamnesisSection)

export default AnamnesisSectionRepository