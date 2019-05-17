import { iQuestion } from "./question.interface";

export interface iCollection {
    C_ID: string,
    C_TITLE: string,
    C_QUESTIONS: iQuestion[],
    C_OWNER: string,
    C_OWNER_ID: string,
    C_CREATEDON: string
}