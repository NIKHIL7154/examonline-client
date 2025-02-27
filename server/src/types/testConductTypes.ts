export type TokenPayload = {
    testId: string;
    userEmail: string;
    userName: string;
    uid:string;// generate a random 15 character string
}

//mcq
//coding question
//subjective question
//file upload

interface QuestionInterface {
    questionTitle: String;
    options: {
        A: String;
        B: String;
        C: String;
        D: String;
    }

}

export interface ResultQuestion extends QuestionInterface {
    correctOption: "A" | "B" | "C" | "D";
    questionId?: String;

}

export interface ExamQuestion extends QuestionInterface {
    userChoice: String;
    visited: boolean;
}

