import {describe, expect, test} from '@jest/globals'
import AnamnesisFormService from '../anamnesisForm'
import { AnamnesisForm } from '../../models/anamnesisForm'
import { testDatabase } from '../../helper/testDatabase'
import AnamnesisFormRepository from '../../repositories/anamnesisForm';

describe('Anamnesis Form test case', () => {
    let createdForm : AnamnesisForm
    let service : AnamnesisFormService
    let repo : typeof AnamnesisFormRepository
    beforeEach(async () => { 
        await testDatabase.setup() 
        repo = testDatabase.getConnection().getRepository(AnamnesisForm)
        const option = {
            manager: repo.manager,
            anamnesisFormRepository : repo,
        }
        service = new AnamnesisFormService(option)
        
    })
    afterEach(async () => { await testDatabase.destroy() })  
    
  
    test('Create Form', async () => {
        const data = {
            title: 'Test case anamnesis create form',
            description :'Test case anamnesis create form'
        }
        createdForm = await service.create(data)
        expect(createdForm).toHaveProperty('title', data.title)
        expect(createdForm).toHaveProperty('description', data.title)
    })

    test('Delete Form', async() =>{
        await service.delete(createdForm.id)
        const objForm = await repo.findOne({
            where : {
                id: createdForm.id
            }
        })
        expect(objForm).toBe(null)
    })
});