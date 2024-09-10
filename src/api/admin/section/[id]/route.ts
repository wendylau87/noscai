import type {
    MedusaRequest, 
    MedusaResponse,
} from "@medusajs/medusa"
import AnamnesisSectionService from "../../../../services/anamnesisSection"

export const DELETE = async (
    req: MedusaRequest, 
    res: MedusaResponse
  ) => {
    const anamnesisSectionService: AnamnesisSectionService= req.scope.resolve("anamnesisSectionService")
    const id = req.params.id
    res.json({
      data: await anamnesisSectionService.delete(id)
    })
} 

export const AUTHENTICATE = false