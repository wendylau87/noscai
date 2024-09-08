import {describe, expect, test} from '@jest/globals'
import AnamnesisFormService from '../anamnesisForm'
import AnamnesisFormRepository from '../../repositories/anamnesisForm'
import { AnamnesisForm } from '../../models/anamnesisForm'
import { testDatabase } from '../../helper/testDatabase'

describe('Anamnesis Form test case', () => {
    test('Try to create form', async () => {
        await testDatabase.setup()
        const repo = testDatabase.getConnection().getRepository(AnamnesisForm)
        const option = {
            anamnesisFormRepository : repo,
        }
        const service = new AnamnesisFormService(option)
        const data = {
            title: 'Test case anamnesis create form',
            description :'Test case anamnesis create form'
        }
        const result = await service.create(data)
        expect(result).toHaveProperty('title', data.title)
        expect(result).toHaveProperty('description', data.title)
    });
});