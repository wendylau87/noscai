import { TransactionBaseService } from "@medusajs/medusa"
import { AnamnesisFormRepository } from "../repositories/anamnesisForm"
import { AnamnesisForm } from "../models/anamnesisForm"
import { CreateAnamnesisForm } from "src/interfaces/request/anamnesisFormRequest"

class AnamnesisFormService extends TransactionBaseService {

    private anamnesisFormRepository : typeof AnamnesisFormRepository

    constructor(container) {
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

    async getMessage() {
      return `Welcome to My Store!`
    }
}
  
export default AnamnesisFormService