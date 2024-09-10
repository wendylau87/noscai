import { QuestionType } from "src/models/anamnesisQuestion";

export type CreateAnamnesisQuestion = {
    section_id?: string
    question_text?: string
    question_type?: QuestionType
    options?: string | object
  };
  