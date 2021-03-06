import { iQuestion } from "./question.interface";

export interface iExam {
    E_ID: string,
    E_TITLE: string,
    // E_QUESTIONS: iQuestion[],
    E_EXAMINEE: string,
    E_EXAMINEE_ID: string,
    E_RESULTS: any,
    E_EXAMINER: string,
    E_EXAMINER_ID: string,
    E_TAKEN_ID: string,
    E_TAKEN_DATE: number,
    E_DATE: number
}