import type {
    MedusaRequest, 
    MedusaResponse,
} from "@medusajs/medusa"
import AnamnesisQuestionService  from "../../../services/anamnesisQuestion"

export const POST = async (
    req: MedusaRequest, 
    res: MedusaResponse
  ) => {
    const anamnesisQuestionService: AnamnesisQuestionService= req.scope.resolve("anamnesisQuestionService")
    const body = req.body
    res.json({
      data: await anamnesisQuestionService.create(body)
    })
} 

export const AUTHENTICATE = false