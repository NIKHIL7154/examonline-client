import { createPostRequest } from "../features/authentication/apiHelper";
import { serverUrl } from "../utils/globals";
// {
//     "name": "Test by nikhil 3",
//     "questionSet": [
//         "67b992708e1ca35da449d5e4"
//     ],
//     "startAt": 1742119813309,
//     "durationInSec": 3600,
//     "endAt": 1742123432300,
//     "proctoring": true,
//     "resumable": true,
//     "participants": [
//         "67bb7cd49c8fc81d785caf70"
//     ]
// }
type TestDetails={
    testName:string,
    testSets:string[],
    testSettings:{
        startAt:Date|null,
        endAt:Date|null,
        duration:number|null,
        tabSwitchLimit:number|null,
        proctoringLevel:"Basic"|"Advanced"| null,
        resumeable:"true"|"false"|null,
    },
    participants:string[],
}
export const createTest = async (authToken: () => Promise<string | null>, testDetails: TestDetails) => {
    try {
        const payload={
            name:testDetails.testName,
            questionSet:testDetails.testSets,
            startAt:testDetails.testSettings.startAt?.getTime(),
            durationInSec:testDetails.testSettings.duration?testDetails.testSettings.duration *60:15*60,
            endAt:testDetails.testSettings.endAt?.getTime(),
            proctoring:testDetails.testSettings.proctoringLevel==="Advanced",
            resumable:testDetails.testSettings.resumeable==="true",
            participants:testDetails.participants
        }
        const response = await createPostRequest(authToken, `${serverUrl}/tests`, payload);
        return response;
    } catch (error) {
        console.error(error);
        throw new Error("Failed while creating the test. Please try again");
    }
}