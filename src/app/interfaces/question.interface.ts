import { iAnswer } from "./answer.interface";

export interface iQuestion {
    Q_Text: string,
    Q_Answers: iAnswer[],
    Q_ID: string,
    Q_Title: string,
    Q_isCorrect: boolean,
    Q_answerIndex: number,
    Q_OwnerID: string
    Q_CreatedDate: string,
    Q_Level: string,
    Q_Type: string
}