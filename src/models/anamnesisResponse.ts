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
import { AnamnesisForm } from "./anamnesisForm"
  
@Entity()
export class AnamnesisResponse extends BaseEntity {
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
    customer_id: string | null

    @Column({ type: "varchar" })
    order_id: string | null

    @Column({
      type: 'jsonb',
      array: false,
      default: () => "'[]'",
      nullable: false,
    })
    responses : Array<{ question_id: string, answer: string }>;
}