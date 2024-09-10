import type {
    MedusaRequest, 
    MedusaResponse,
} from "@medusajs/medusa"
import AnamnesisFormService from "../../../../services/anamnesisForm"

export const DELETE = async (
    req: MedusaRequest, 
    res: MedusaResponse
) => {
    const anamnesisFormService: AnamnesisFormService = req.scope.resolve("anamnesisFormService")
    const id = req.params.id
    res.json({
      data: await anamnesisFormService.delete(id)
    })
} 

export const GET = async (
  req: MedusaRequest, 
  res: MedusaResponse
) => {
  const anamnesisFormService: AnamnesisFormService = req.scope.resolve("anamnesisFormService")
  const id = req.params.id
  res.json({
    data: await anamnesisFormService.getById(id)
  })
} 

export const AUTHENTICATE = false