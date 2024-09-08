import { 
    BeforeInsert, 
    Column, 
    Entity, 
    PrimaryColumn,
    JoinColumn,
    ManyToOne,
    BeforeUpdate,
  } from "typeorm"
import { BaseEntity } from "@medusajs/medusa"
import { generateEntityId } from "@medusajs/medusa/dist/utils"
import { AnamnesisSection } from "./anamnesisSection"
  
export enum QuestionType {
  // short_answer, long_answer, date, date_time, time, multiple_choice, select
    SHORT_ANSWER = "short_answer",
    LONG_ANSWER = "long_answer",
    DATE = "date",
    DATE_TIME = "date_time",
    TIME = "time",
    MULTIPLE_CHOICE = "multiple_choice",
    SELECT = "select"
}

@Entity()
export class AnamnesisQuestion extends BaseEntity {
  @BeforeInsert()
    private beforeInsert(): void {
      this.id = generateEntityId(this.id, "AnamnesisQuestion")
      this.created_at = new Date
    }
    
    @BeforeUpdate()
    private beforeUpdate():void{
        this.updated_at = new Date
    }

    @Column({ type: "varchar" })
    section_id: string
  
    @ManyToOne(() => AnamnesisSection, (anamnesis_section) => anamnesis_section.anamnesis_questions)
    @JoinColumn({ name: "section_id" })
    anamnesis_section: AnamnesisSection

    @Column({ type: "varchar" })
    question_text: string | null

    @Column({
        type: "enum",
        enum: QuestionType,
        default: QuestionType.SHORT_ANSWER,
    })
    question_type: QuestionType
  
    @Column('jsonb', { nullable: false, default: {} })
    options: string
}