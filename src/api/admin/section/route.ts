import type {
    MedusaRequest, 
    MedusaResponse,
} from "@medusajs/medusa"
import AnamnesisSectionService from "../../../services/anamnesisSection"
import { CreateAnamnesisSection } from "src/types/request/anamnesisSectionRequest"

export const POST = async (
    req: MedusaRequest, 
    res: MedusaResponse
  ) => {
    const anamnesisSectionService: AnamnesisSectionService= req.scope.resolve("anamnesisSectionService")
    const body = req.body
    res.json({
      data: await anamnesisSectionService.create(body)
    })
} 

export const AUTHENTICATE = false