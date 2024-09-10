import {describe, expect, test} from '@jest/globals'
import AnamnesisSectionService from '../anamnesisSection'
import { AnamnesisSection } from '../../models/anamnesisSection'
import { testDatabase } from '../../helper/testDatabase'
import { AnamnesisForm } from '../../models/anamnesisForm';
import AnamnesisSectionRepository from '../../repositories/anamnesisSection';
import AnamnesisFormRepository from '../../repositories/anamnesisForm';

describe('Anamnesis Section test case', () => {
    let formModel : AnamnesisForm
    let formRepo : typeof AnamnesisFormRepository
    let repo : typeof AnamnesisSectionRepository
    let service : AnamnesisSectionService
    let sectionModel : AnamnesisSection
    beforeAll(async () => { 
        await testDatabase.setup() 
        formRepo = testDatabase.getConnection().getRepository(AnamnesisForm)
        formModel = await formRepo.save(formRepo.create({
            title: 'Test case create section preparation',
            description: 'Test case create section preparation'
        }))
        repo = testDatabase.getConnection().getRepository(AnamnesisSection)
        const option = {
            manager: repo.manager,
            anamnesisSectionRepository : repo,
        }
        service = new AnamnesisSectionService(option)
    })
    afterAll(async () => { 
        await formRepo.delete(formModel.id)
        await testDatabase.destroy() 
    })  
  
    test('Create Section', async () => {
        const data = {
            form_id: formModel.id,
            title: 'Test case anamnesis create section',
            description :'Test case anamnesis create section',
            order: 1
        }
        sectionModel = await service.create(data)
        expect(sectionModel).toHaveProperty('title', data.title)
        expect(sectionModel).toHaveProperty('description', data.title)
    });

    test('Delete Section', async () => {
        await service.delete(sectionModel.id)
        const result = await repo.findOne({
            where: {
                id: sectionModel.id
            }
        })
        expect(result).toBe(null)
    });
});