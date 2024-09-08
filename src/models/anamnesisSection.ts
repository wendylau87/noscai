import { 
    BeforeInsert, 
    Column, 
    Entity, 
    PrimaryColumn,
    JoinColumn,
    ManyToOne,
    OneToMany,
    BeforeUpdate, 
  } from "typeorm"
import { BaseEntity } from "@medusajs/medusa"
import { generateEntityId } from "@medusajs/medusa/dist/utils"
import { AnamnesisForm } from "./anamnesisForm"
import { AnamnesisQuestion } from "./anamnesisQuestion"
  
@Entity()
export class AnamnesisSection extends BaseEntity {
  @BeforeInsert()
    private beforeInsert(): void {
      this.id = generateEntityId(this.id, "AnamnesisSection")
      this.created_at = new Date
    }

    @BeforeUpdate()
    private beforeUpdate():void{
        this.updated_at = new Date
    }

    @Column({ type: "varchar" })
    form_id: string
  
    @ManyToOne(() => AnamnesisForm, (anamnesis_form) => anamnesis_form.anamnesis_sections)
    @JoinColumn({ name: "form_id" })
    anamnesis_form: AnamnesisForm

    @Column({ type: "varchar" })
    title: string | null

    @Column({ type: "varchar" })
    description: string | null
  
    @Column({ type: "int4" })
    order: number | null

    @OneToMany(() => AnamnesisQuestion, (anamnesis_question) => anamnesis_question.anamnesis_section)
    anamnesis_questions: AnamnesisQuestion[]
}