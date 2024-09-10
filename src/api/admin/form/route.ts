import type {
    MedusaRequest, 
    MedusaResponse,
} from "@medusajs/medusa"
import AnamnesisFormService from "../../../services/anamnesisForm"

export const POST = async (
    req: MedusaRequest, 
    res: MedusaResponse
  ) => {
    const anamnesisFormService: AnamnesisFormService = req.scope.resolve("anamnesisFormService")
    res.json({
      data: await anamnesisFormService.create(req.body)
    })
}

export const AUTHENTICATE = false