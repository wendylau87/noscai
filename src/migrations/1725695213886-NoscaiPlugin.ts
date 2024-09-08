import { MigrationInterface, QueryRunner } from "typeorm"

export class NoscaiPlugin1725695213886 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE public.anamnesis_form (
            id varchar NOT NULL,
            title varchar NOT NULL,
            description varchar NOT NULL,
            created_at timestamp NOT NULL,
            updated_at timestamp NULL,
            CONSTRAINT anamnesis_form_pk PRIMARY KEY (id)
        );
        `)
        await queryRunner.query(`CREATE TABLE public.anamnesis_section (
            id varchar NOT NULL,
            form_id varchar NOT NULL,
            title varchar NOT NULL,
            description varchar NOT NULL,
            "order" int4 NOT NULL,
            created_at timestamp NOT NULL,
            updated_at timestamp NULL,
            CONSTRAINT anamnesis_section_pk PRIMARY KEY (id)
        );
        CREATE INDEX anamnesis_section_form_id_idx ON public.anamnesis_section (form_id,"order");
        `)
        await queryRunner.query(`create type anamnesis_question_type as enum('short_answer', 'long_answer', 'date', 'date_time', 'time', 'multiple_choice', 'select');`)
        await queryRunner.query(`CREATE TABLE public.anamnesis_question (
            id varchar NOT NULL,
            section_id varchar NOT NULL,
            question_text varchar NOT NULL,
            question_type anamnesis_question_type NOT NULL,
            "options" jsonb NOT NULL,
            created_at timestamp NOT NULL,
            updated_at timestamp NULL,
            CONSTRAINT anamnesis_question_pk PRIMARY KEY (id)
        );
        CREATE INDEX anamnesis_question_section_id_idx ON public.anamnesis_question (section_id);`)
        await queryRunner.query(`CREATE TABLE public.anamnesis_response (
            id varchar NOT NULL,
            customer_id varchar NOT NULL,
            order_id varchar NOT NULL,
            form_id varchar NOT NULL,
            responses jsonb NOT NULL,
            created_at timestamp NOT NULL,
            updated_at timestamp NULL,
            CONSTRAINT anamnesis_response_pk PRIMARY KEY (id)
        );
        CREATE INDEX anamnesis_response_form_id_idx ON public.anamnesis_response (form_id);
        CREATE INDEX anamnesis_response_created_at_idx ON public.anamnesis_response (created_at);
        CREATE INDEX anamnesis_response_customer_id_idx ON public.anamnesis_response (customer_id,created_at);
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP IF EXISTS public.anamnesis_response;`)
        await queryRunner.query(`DROP IF EXISTS public.anamnesis_question;`)
        await queryRunner.query(`DROP TYPE anamnesis_question_type;`)
        await queryRunner.query(`DROP IF EXISTS public.anamnesis_section;`)
        await queryRunner.query(`DROP IF EXISTS public.anamnesis_form;`)
    }

}
