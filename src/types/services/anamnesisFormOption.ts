import AnamnesisFormRepository from "../../repositories/anamnesisForm";
import { EntityManager } from "typeorm";

type AnamnesisFormOptions = {
    manager: EntityManager
    anamnesisFormRepository: typeof AnamnesisFormRepository
}

export default AnamnesisFormOptions