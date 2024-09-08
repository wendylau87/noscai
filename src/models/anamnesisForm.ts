import { 
    BeforeInsert, 
    Column, 
    Entity, 
    PrimaryColumn,
    OneToMany,
    BeforeUpdate,
  } from "typeorm"
import { BaseEntity } from "@medusajs/medusa"
import { generateEntityId } from "@medusajs/medusa/dist/utils"
import { AnamnesisSection } from "./anamnesisSection"
  
@Entity()
export class AnamnesisForm extends BaseEntity {
    @BeforeInsert()
    private beforeInsert(): void {
      this.id = generateEntityId(this.id, "AnamnesisForm")
      this.created_at = new Date
    }

    @BeforeUpdate()
    private beforeUpdate():void{
        this.updated_at = new Date
    }

    @Column({ type: "varchar" })
    title: string

    @Column({ type: "varchar" })
    description: string

    @OneToMany(() => AnamnesisSection, (anamnesis_section) => anamnesis_section.anamnesis_form)
    anamnesis_sections: AnamnesisSection[]

}