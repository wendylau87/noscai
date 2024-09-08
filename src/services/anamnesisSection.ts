import { TransactionBaseService } from "@medusajs/medusa"
import { AnamnesisSectionRepository } from "../repositories/anamnesisSection"
import { AnamnesisSection } from "src/models/anamnesisSection"
import { CreateAnamnesisSection } from "src/interfaces/request/anamnesisSectionRequest"

class AnamnesisSectionService extends TransactionBaseService {

    private anamnesisSectionRepository : typeof AnamnesisSectionRepository

    constructor(container) {
      super(container)
      this.anamnesisSectionRepository = container.anamnesisSectionRepository
    }

    async create(data: CreateAnamnesisSection) : Promise<AnamnesisSection> {
      return this.atomicPhase_(async (manager) => {
        const sectionRepo = manager.withRepository(
          this.anamnesisSectionRepository
        )
        const section = sectionRepo.create()
        section.form_id = data.form_id
        section.title = data.title
        section.description = data.description
        section.order = data.order
        const result = await sectionRepo.save(section)
  
        return result
      })
    }
}
  
export default AnamnesisSectionService