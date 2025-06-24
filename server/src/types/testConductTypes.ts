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


export type ProctorResponse = {
    multiple_person: number;
    socket_id: string;
    mobile_detection: number;
    cheating: boolean;
    user_id: string;
};

/* 
class Response:
    def __init__(self, multiple_person:int, socket_id:str, mobile_detection:int,cheating: bool,user_id:str):
        self.user_id = user_id
        self.multiple_person = multiple_person
        self.socket_id = socket_id
        self.mobile_detection = mobile_detection
        self.cheating=cheating
*/
