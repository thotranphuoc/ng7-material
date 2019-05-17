import { iQuestion } from "./question.interface";

export interface iExam {
    E_ID: string,
    E_TTITLE: string,
    E_QUESTIONS: iQuestion,
    E_EXAMINEE: string,
    E_EXAMINEE_ID: string,
    E_RESULTS: any,
    E_EXAMINER: string,
    E_EXAMINER_ID: string
}