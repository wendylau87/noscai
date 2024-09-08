import { AnamnesisQuestion } from "../models/anamnesisQuestion"
import { 
  dataSource,
} from "@medusajs/medusa/dist/loaders/database"

export const AnamnesisQuestionRepository = dataSource.getRepository(AnamnesisQuestion)

export default AnamnesisQuestionRepository