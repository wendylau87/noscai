import { TransactionBaseService } from "@medusajs/medusa"
import { AnamnesisFormRepository } from "../repositories/anamnesisForm"
import { AnamnesisForm } from "../models/anamnesisForm"
import { CreateAnamnesisForm } from "../types/request/anamnesisFormRequest"

class AnamnesisFormService extends TransactionBaseService {

    private anamnesisFormRepository : typeof AnamnesisFormRepository

    constructor(container){
        super(container)
        this.anamnesisFormRepository = container.anamnesisFormRepository
    }

    async create(data: CreateAnamnesisForm) : Promise<AnamnesisForm> {
      return this.atomicPhase_(async (manager) => {
        const formRepo = manager.withRepository(
          this.anamnesisFormRepository
        )
        const form = formRepo.create()
        form.title = data.title
        form.description = data.description
        const result = await formRepo.save(form)
  
        return result
      })
    }

    async delete(id:string) : Promise<void> {
      return this.atomicPhase_(async (manager) => {
        const formRepo = manager.withRepository(
          this.anamnesisFormRepository
        )
        const result = await formRepo.delete(id)
      })
    }

    async getById(id:string) : Promise<AnamnesisForm> {
      const repo = this.anamnesisFormRepository
      const result = await repo.findOne({
        relations: ["anamnesis_sections","anamnesis_sections.anamnesis_questions"],
        loadEagerRelations: true,
        where :{
          id: id
        }
      })
      return result
    }
}
  
export default AnamnesisFormService