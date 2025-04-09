import { demoUser, UserData } from "../sockets/UserManagerStore";
import Queue from "./resultQueue";

const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
const creds = require('../../keys/examfusion-451510-70bae177b416.json');

const queue=new Queue<UserData>();


let isProcessing=false;
const SHEET_ID = '1DDMXxdo1KomH6EJHu23njbPTFLHvJSkI94OIlZQFWh0';

let doc: any |null = null;

export enum SheetHeaders{
    STUDENT_NAME = "Student Name",
    EMAIL = "Email",
    UID = "UID",
    QUESTIONS_ATTEMPTED = "Questions Attempted",
    QUESTIONS_SKIPPED = "Questions Skipped",
    CORRECT = "Correct",
    TOTAL_QUESTIONS = "Total Questions",
    MARKS_SCORED = "Marks Scored",
    TOTAL_MARKS = "Total Marks",
    TAB_SWITCH_COUNT = "Tab Switch Count",
    DISCONNECTION_COUNT = "Disconnection Count",
    MOBILE_DETECTION_COUNT = "Mobile Detection Count",
    ANOTHER_PERSON_COUNT = "Another Person Count",
    SUBMISSION_TYPE = "Submission Type"
}

export function addResultToQueue(data:UserData){
    queue.enqueue(data);
    if(!isProcessing) processQueue();
}


function calculateMarksAndOtherData(data:UserData){
    let questionsAttempted=0;
    let questionsSkipped=0;
    let correct=0;
    let totalQuestions=0;
    let marksScored=0;
    

    data.questions.forEach((question,index)=>{
        
        if(question.userChoice){
            questionsAttempted++;
            if(question.userChoice===data.resultQuestions[index].correctOption){
                marksScored++;
                correct++;
            }
        }
        else{
            questionsSkipped++;
        }
        totalQuestions++;
    });

    

    return {
        questionsAttempted,
        questionsSkipped,
        correct,
        totalQuestions,}
}

async function processQueue(){
    isProcessing=true;
    if(queue.isEmpty()) return;

    while(!queue.isEmpty()){
        const data=queue.peek();
        console.log(data)
        if(!data) break;

        try {
            if(!doc){
                doc = new GoogleSpreadsheet(SHEET_ID, new JWT({
                    email: creds.client_email,
                    key: creds.private_key,
                    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
                }));
            }
           

            await doc.loadInfo();
            let sheet = doc.sheetsByTitle[data.testId];

            if (!sheet) {
                sheet = await doc.addSheet({
                    title: data.testId,
                    headerValues: Object.values(SheetHeaders),
                });
                
            }
            const {questionsAttempted,questionsSkipped,correct,totalQuestions}=calculateMarksAndOtherData(data);
            const obj = {
                [SheetHeaders.STUDENT_NAME]: data.userName,
                [SheetHeaders.EMAIL]: data.userEmail,
                [SheetHeaders.UID]: data.userUid,
                [SheetHeaders.QUESTIONS_ATTEMPTED]: questionsAttempted,
                [SheetHeaders.QUESTIONS_SKIPPED]: questionsSkipped,
                [SheetHeaders.CORRECT]: correct,
                [SheetHeaders.TOTAL_QUESTIONS]: totalQuestions,
                [SheetHeaders.MARKS_SCORED]: correct*4,
                [SheetHeaders.TOTAL_MARKS]: totalQuestions*4,
                [SheetHeaders.TAB_SWITCH_COUNT]: data.tabSwitchCount,
                [SheetHeaders.DISCONNECTION_COUNT]: data.disconnectionCount,
                [SheetHeaders.MOBILE_DETECTION_COUNT]: data.mobileDetectionCount,
                [SheetHeaders.ANOTHER_PERSON_COUNT]: data.anotherPersonCount,
                [SheetHeaders.SUBMISSION_TYPE]: data.submissionMode
            }
            await sheet.addRow(obj);

            const datam=queue.dequeue();
            console.log("✅ Exam result stored for user:",datam?.userName,"Remaining in queue:",queue.size());


        } catch (error) {
            console.error('❌ Error storing exam result:', error);

        }
    }
    isProcessing=false;
}


/* for(let i=0;i<20;i++){
    addResultToQueue(demoUser);
    //checking working
}
console.log("Added 10 users to queue"); */