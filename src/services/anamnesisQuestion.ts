import { TransactionBaseService } from "@medusajs/medusa"
import { CreateAnamnesisQuestion } from "../types/request/anamnesisQuestionRequest"
import { AnamnesisQuestion } from "../models/anamnesisQuestion"
import { AnamnesisQuestionRepository } from "src/repositories/anamnesisQuestion"

class AnamnesisQuestionService extends TransactionBaseService {

    private anamnesisQuestionRepository : typeof AnamnesisQuestionRepository

    constructor(container) {
      super(container)
      this.anamnesisQuestionRepository = container.anamnesisQuestionRepository
    }

    async create(data : CreateAnamnesisQuestion) : Promise<AnamnesisQuestion> {
      return this.atomicPhase_(async (manager) => {
        const QuestionRepo = manager.withRepository(
          this.anamnesisQuestionRepository
        )
        const Question = QuestionRepo.create()
        Question.section_id = data.section_id
        Question.question_text = data.question_text
        Question.question_type = data.question_type
        Question.options = data.options
        const result = await QuestionRepo.save(Question)
  
        return result
      })
    }


    async delete(id:string) : Promise<void> {
      return this.atomicPhase_(async (manager) => {
        const repo = manager.withRepository(
          this.anamnesisQuestionRepository
        )
        const result = await repo.delete(id)
      })
    }
}
  
export default AnamnesisQuestionService