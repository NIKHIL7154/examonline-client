
import { QuestionSet } from "../../models/QuestionSetModel";
import { Test, TestType } from "../../models/TestModel";
import { createTestDetails, TestDetails } from "../../services/sockets/UserManagerStore";
import { ExamQuestion, TokenPayload ,ResultQuestion} from "../../types/testConductTypes";

export async function verifyTest(testData :TokenPayload) {
    const test = await Test.findById(testData.testId);
    if(!test){
        return null;
    }
    /* const currentTime = new Date();
    if(currentTime > new Date(test.endAt) || currentTime<new Date(test.startAt)){
        return null;
    } */
    return test;
}


export async function testDetailsAndfetchQuestions(testId: string): Promise<{ examQuestions: ExamQuestion[], resultQuestions: ResultQuestion[],testDetails:TestDetails } | null> {
    try {
        const test = await Test.findById(testId);
        console.log(test);
        if(!test){
            return null;
        }
        const questionSet= await QuestionSet.findById(test.questionSet[0]).select("questions");
        if(!questionSet){
            return null;
        }
        console.log('questionSet',questionSet);
        const questions = questionSet.questions;

        const resultQuestions: ResultQuestion[] = questions?.map((question) => {
            return ({
                questionTitle: question.questionTitle,
                options: question.options as { A: String; B: String; C: String; D: String; },
                correctOption: question.correctOption as "A" | "B" | "C" | "D" as any,
            });
        }) || [];
        const examQuestions: ExamQuestion[] = questions?.map((question) => ({
            questionTitle:question.questionTitle,
            options:question.options as { A: string; B: string; C: string; D: string },
            visited: false,
            userChoice: ""
        })) || [];

        //add things here test detaild
        const testDetails=createTestDetails(test);
        
        return {examQuestions,resultQuestions,testDetails};
        
    } catch (error) {
        console.log(error);
        return null;
    }
}

