import {describe, expect, test} from '@jest/globals'
import AnamnesisQuestionService from '../anamnesisQuestion'
import { AnamnesisSection } from '../../models/anamnesisSection'
import { testDatabase } from '../../helper/testDatabase'
import { AnamnesisForm } from '../../models/anamnesisForm';
import { AnamnesisSectionRepository } from '../../repositories/anamnesisSection'
import { AnamnesisQuestionRepository} from '../../repositories/anamnesisQuestion'
import { AnamnesisQuestion, QuestionType } from '../../models/anamnesisQuestion';
import AnamnesisFormRepository from '../../repositories/anamnesisForm';

describe('Anamnesis Section test case', () => {
    let formModel : AnamnesisForm
    let sectionModel : AnamnesisSection
    let questionShortAnswerModel : AnamnesisQuestion
    let questionMultipleChoiceModel : AnamnesisQuestion
    let formRepo : typeof AnamnesisFormRepository
    let sectionRepo : typeof AnamnesisSectionRepository
    let repo : typeof AnamnesisQuestionRepository
    let service : AnamnesisQuestionService
    
    beforeAll(async () => { 
        await testDatabase.setup() 
        // prepare form data as header
        formRepo = testDatabase.getConnection().getRepository(AnamnesisForm)
        formModel = await formRepo.save(formRepo.create({
            title: 'Test case create section preparation',
            description: 'Test case create section preparation'
        }))

        // prepare section data as header
        sectionRepo = testDatabase.getConnection().getRepository(AnamnesisSection)
        sectionModel = await sectionRepo.save(sectionRepo.create({
            form_id: formModel.id,
            title: 'Test case create question preparation',
            description: 'Test case create question preparation',
            order: 1
        }))
       
        // prepare main repository and service
        repo = testDatabase.getConnection().getRepository(AnamnesisQuestion)
        const option = {
            manager: repo.manager,
            anamnesisQuestionRepository: repo,
        }
        service = new AnamnesisQuestionService(option)
    })
    afterAll(async () => { 
        await sectionRepo.delete(sectionModel.id)
        await formRepo.delete(formModel.id)
        await testDatabase.destroy() 
    })  
  
    test('Create Question with Short Answer', async () => {
        const data  = {
            section_id: sectionModel.id,
            question_text: 'Test case question with short answer type',
            question_type: QuestionType.SHORT_ANSWER,
            options: {}
        }
        questionShortAnswerModel = await service.create(data)
        expect(questionShortAnswerModel).toHaveProperty('question_text', data.question_text)
        expect(questionShortAnswerModel).toHaveProperty('question_type', data.question_type)
        expect(questionShortAnswerModel).toHaveProperty('options', data.options)
    });

    test('Create Question with Multiple Choice', async () => {
        const data = {
            section_id: sectionModel.id,
            question_text: 'Test case question with short answer type',
            question_type: QuestionType.SHORT_ANSWER,
            options: {a: true,b: false}
        }
        questionMultipleChoiceModel = await service.create(data)
        expect(questionMultipleChoiceModel).toHaveProperty('question_text', data.question_text)
        expect(questionMultipleChoiceModel).toHaveProperty('question_type', data.question_type)
        expect(questionMultipleChoiceModel).toHaveProperty('options', data.options)
    });

    test('Delete Question with Short Answer', async () => {
        await service.delete(questionShortAnswerModel.id)
        const result = await repo.findOne({
            where: {
                id: questionShortAnswerModel.id
            }
        })
        expect(result).toBe(null)
    });

    test('Delete Question with Multiple Choice', async () => {
        await service.delete(questionMultipleChoiceModel.id)
        const result = await repo.findOne({
            where: {
                id: questionMultipleChoiceModel.id
            }
        })
        expect(result).toBe(null)
    });
});