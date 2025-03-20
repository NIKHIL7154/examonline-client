

import { QuestionSet } from "../../models/QuestionSetModel";
import { Test, TestType } from "../../models/TestModel";
import { createTestDetails, TestDetails } from "../../services/sockets/UserManagerStore";
import { ExamQuestion, TokenPayload ,ResultQuestion} from "../../types/testConductTypes";

export async function verifyTest(testData :TokenPayload) {
    const test = await Test.findById(testData.testId);
    if(!test){
        return null;
    }
    
    const currentTime = new Date();
    let isTimeBounded=false;
    const testDuration= test.durationInSec as number;
    const durationInSeconds:number=(test.endAt.getSeconds()-test.startAt.getSeconds())
    if(durationInSeconds+5 >= testDuration || durationInSeconds-5 <= testDuration){
        isTimeBounded=true;
    }
    if(isTimeBounded){
        const tenMinutesBefore=new Date(test.startAt.setMinutes(test.startAt.getMinutes()-10));
        if(currentTime<tenMinutesBefore || currentTime>=test.endAt || currentTime>=test.startAt){
            return null;
        }
        return test;
    }else{
        const minTestStartTime = new Date(test.endAt.getSeconds() - testDuration);
        if(currentTime<test.startAt || currentTime>=minTestStartTime || currentTime>=test.endAt){
            return null;
        }
        return test;
    }
    
}


export async function fetchTestDetailsAndQuestions(testId: string): Promise<{ examQuestions: ExamQuestion[], resultQuestions: ResultQuestion[],testDetails:TestDetails } | null> {
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

        // const questions = questionSet.questions;
        const questions = shuffleArray(questionSet.questions)
        // const questions = questionSet.questions.sort(() => Math.random() - 0.5);

        //question with having the correct options
        const resultQuestions: ResultQuestion[] = questions?.map((question:any) => {
            return ({
                questionTitle: question.questionTitle,
                options: question.options as { A: String; B: String; C: String; D: String; },
                correctOption: question.correctOption as "A" | "B" | "C" | "D" as any,
            });
        }) || [];

        //questions to be sent to the user
        const examQuestions: ExamQuestion[] = questions?.map((question:any) => ({
            questionTitle:question.questionTitle,
            options:question.options as { A: string; B: string; C: string; D: string },
            visited: false,
            userChoice: ""
        })) || [];

        //test details object created from test object
        const testDetails=createTestDetails(test);
        
        return {examQuestions,resultQuestions,testDetails};
        
    } catch (error) {
        console.log(error);
        return null;
    }
}

//function to implement the shuffle of questions in the array
function shuffleArray(array :any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }

