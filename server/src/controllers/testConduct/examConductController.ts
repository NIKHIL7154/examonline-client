

import { QuestionSet } from "../../models/QuestionSetModel";
import { Test, TestType } from "../../models/TestModel";
import { createTestDetails, TestDetails } from "../../services/sockets/UserManagerStore";
import { ExamQuestion, TokenPayload ,ResultQuestion} from "../../types/testConductTypes";
type NullMessage=string;
    

export async function verifyTest(testData :TokenPayload): Promise<TestType | NullMessage> {
    const test = await Test.findById(testData.testId).populate("questionSet");
    if(!test){
        return "The Test you are trying to access is no longer available";
    }
    
    const currentTime = new Date();
    const {startAt,endAt,durationInSec} =test;

    //checking if current time is greater that end time

    let isTimeBounded=false;
    const testDuration= durationInSec as number;


    const calculatedDurationbuffer:number=(test.endAt.getTime()-test.startAt.getTime())/1000
    //taking 5 seconds as buffer for miscalculations
    if(calculatedDurationbuffer+5 >= testDuration && testDuration>=calculatedDurationbuffer-5){
        isTimeBounded=true;
    }

    if(isTimeBounded){
        const tenMinutesBefore=new Date(test.startAt.setMinutes(test.startAt.getMinutes()-10));
        //if current time is not in the 10 minute login window than test is not valid
        if(currentTime<tenMinutesBefore){
            return "Your Test is not started yet. Please try logging 10 minutes before the test starts";
        }else if(currentTime>=test.endAt || currentTime>=test.startAt){
            return "Your Test login window has ended. You cannot take this test now."   
        }
        return test;
    }else{
        //test is not time bounded so user should start atleast the duration before the test ends
        const minTestStartTime = new Date(test.endAt.getTime() - testDuration * 1000);
        //if time left to end the test is smaller than duration of test than user can't start the test
        if(currentTime<test.startAt){
            return "Your Test is not started yet. Please try logging after your test starts.";
        }else if(currentTime>=minTestStartTime){
           return "Your Test login window has ended. You cannot take this test now.";
        }
        return test;
    }
    
}


export async function fetchTestDetailsAndQuestions(testId: string): Promise<{ examQuestions: ExamQuestion[], resultQuestions: ResultQuestion[],testDetails:TestDetails } | null> {
    try {
        const test = await Test.findById(testId);
        
        if(!test){
            return null;
        }
        const questionSet= await QuestionSet.findById(test.questionSet[0]).select("questions");
        if(!questionSet){
            return null;
        }
      

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

