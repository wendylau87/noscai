import type {
    MedusaRequest, 
    MedusaResponse,
} from "@medusajs/medusa"
import AnamnesisQuestionService  from "../../../../services/anamnesisQuestion"

export const DELETE = async (
    req: MedusaRequest, 
    res: MedusaResponse
  ) => {
    const anamnesisQuestionService: AnamnesisQuestionService= req.scope.resolve("anamnesisQuestionService")
    const id = req.params.id
    res.json({
      data: await anamnesisQuestionService.delete(id)
    })
} 

export const AUTHENTICATE = false