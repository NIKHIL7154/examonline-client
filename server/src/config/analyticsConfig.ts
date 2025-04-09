import { TestType } from "../models/TestModel";
import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import creds from '../keys/examfusion-451510-70bae177b416.json';
import { SheetHeaders } from "../services/result/resultSubmissionService";
import { Analytics } from "../models/AnalyticsModel";
import { Participants, ParticipantsType } from "../models/ParticipantsModel";
import { ObjectId } from "mongoose";


const SHEET_ID = '1DDMXxdo1KomH6EJHu23njbPTFLHvJSkI94OIlZQFWh0';

let doc: any | null = null;

// const mapRowData = (row: GoogleSpreadsheetRow): { [key in SheetHeaders]: string } => {
//     const structuredRowData: { [key in SheetHeaders]: string } = {} as any;

//     // Map the row's data (using the get method to ensure type safety)
//     Object.keys(SheetHeaders).forEach((key) => {
//         const header = SheetHeaders[key as keyof typeof SheetHeaders];
//         // Access row data using row.get(header) which is type-safe
//         structuredRowData[header] = row.get(header) || ''; // Default to empty string if data is missing
//     });

//     return structuredRowData;
// };


// const calculateAnalytics = (rows: GoogleSpreadsheetRow[]): AnalyticsType => {
const calculateAnalytics = (rows: GoogleSpreadsheetRow[], analyseProctured: boolean = false) => {
    let attendance = 0;
    let totalMarks = 0;
    let totalQuestions = 0;
    let totalAttemptedQuestions = 0;
    let totalAccuracy = 0;
    let totalMarksScored = 0;
    let technicalIssue = 0;

    let performance = {
        "below40%": 0,
        "below80%": 0,
        "below90%": 0,
        "below100%": 0
    };

    let submissionType = {
        timeout: 0,
        inactive_autosubmit: 0,
        userSubmission: 0,
        incidents_autosubmit: 0,
    };

    let incidents = {
        tabSwitchCount: 0,
        mobileDetectionCount: 0,
        anotherPersonCount: 0,
    };
    let incidentsPerStudent = 0;

    let topScore = -Infinity; // Initialize to the lowest possible value
    let lowestScore = Infinity; // Initialize to the highest possible value 

    // Loop through rows and calculate all the required statistics
    rows.forEach((row) => {
        attendance += 1;

        const marksScored = parseFloat(row.get(SheetHeaders.MARKS_SCORED));
        const totalMarksForRecord = parseFloat(row.get(SheetHeaders.TOTAL_MARKS));
        const totalQuestionsForRecord = parseFloat(row.get(SheetHeaders.TOTAL_QUESTIONS));
        const questionsAttempted = parseFloat(row.get(SheetHeaders.QUESTIONS_ATTEMPTED));
        const correctAttempted = parseFloat(row.get(SheetHeaders.CORRECT));
        const disconnectionCount = parseFloat(row.get(SheetHeaders.DISCONNECTION_COUNT));
        const tabSwitchCount = parseFloat(row.get(SheetHeaders.TAB_SWITCH_COUNT));
        let mobileDetectionCount;
        let anotherPersonCount;


        // Update top and lowest scores
        topScore = Math.max(topScore, marksScored);
        lowestScore = Math.min(lowestScore, marksScored);

        // Store the constant values (total marks and total questions) from the first row
        if (attendance === 1) {
            totalMarks = totalMarksForRecord;
            totalQuestions = totalQuestionsForRecord;
        }

        // Performance calculation
        const scorePercent = (marksScored / totalMarksForRecord) * 100;
        if (scorePercent < 40) {
            performance["below40%"] += 1;
        } else if (scorePercent < 80) {
            performance["below80%"] += 1;
        } else if (scorePercent < 90) {
            performance["below90%"] += 1;
        } else {
            performance["below100%"] += 1;
        }

        // Submission type calculation
        const submissionTypeValue = row.get(SheetHeaders.SUBMISSION_TYPE);
        if (submissionTypeValue === 'Time Ends') {
            submissionType.timeout += 1;
        } else if (submissionTypeValue === 'Auto Submitted by System due to Inactivity') {
            submissionType.inactive_autosubmit += 1;
        } else if (submissionTypeValue === 'Submitted by User') {
            submissionType.userSubmission += 1;
        } else if (submissionTypeValue === 'Auto Submitted by System due to Malpractice') {
            submissionType.incidents_autosubmit += 1;
        }

        if (tabSwitchCount > 0) incidentsPerStudent += 1;
        incidents.tabSwitchCount += tabSwitchCount;

        if (analyseProctured) {
            mobileDetectionCount = parseFloat(row.get(SheetHeaders.MOBILE_DETECTION_COUNT));
            anotherPersonCount = parseFloat(row.get(SheetHeaders.ANOTHER_PERSON_COUNT));

            if (mobileDetectionCount > 0) incidentsPerStudent += 1;
            if (anotherPersonCount > 0) incidentsPerStudent += 1;
            incidents.mobileDetectionCount += mobileDetectionCount;
            incidents.anotherPersonCount += anotherPersonCount;
        }

        // Attempted rate calculation (questions attempted average)
        totalAttemptedQuestions += questionsAttempted;

        // Attempt accuracy calculation
        const attemptAccuracy = (correctAttempted / questionsAttempted) * 100 || 0;
        totalAccuracy += attemptAccuracy;

        // Marks scored (for average score)
        totalMarksScored += marksScored;

        technicalIssue += disconnectionCount;
    });

    // Calculate overallAttemptRate
    const overallAttempt = (totalAttemptedQuestions / attendance)
    const overallAttemptRate = ((overallAttempt / totalQuestions) * 100).toFixed(2);
    // const overallAttemptRate = (totalAttemptedQuestions / attendance).toFixed(2);

    // Calculate overallAttemptAccuracy
    const overallAttemptAccuracy = (totalAccuracy / attendance).toFixed(2);


    // Calculate average score
    const averageScore = (totalMarksScored / attendance).toFixed(2);

    const technicalIssueRate = parseFloat(((technicalIssue / attendance) * 100).toFixed(2)) || 0;

    const incidentsRatePerStudent = parseFloat(((incidentsPerStudent / attendance)*100).toFixed(2)) || 0;
    const incidentsCount = {
        tabSwitchRate: incidents.tabSwitchCount,
        mobileDetectionRate: analyseProctured ? incidents.mobileDetectionCount : "Feature opted out",
        anotherPersonRate: analyseProctured ? incidents.anotherPersonCount : "Feature opted out",
    }
    // const incidentsRate = {
    //     tabSwitchRate: parseFloat((incidents.tabSwitchCount / attendance).toFixed(2)) || 0,
    //     mobileDetectionRate: analyseProctured
    //         ? parseFloat((incidents.mobileDetectionCount / attendance).toFixed(2)) || 0
    //         : "Feature opted out",
    //     anotherPersonRate: analyseProctured
    //         ? parseFloat((incidents.anotherPersonCount / attendance).toFixed(2)) || 0
    //         : "Feature opted out",
    // }

    const submissionsRate = {
        timeout: parseFloat(((submissionType.timeout / attendance) * 100).toFixed(2)) || 0,
        inactive_autosubmit: parseFloat(((submissionType.inactive_autosubmit / attendance) * 100).toFixed(2)) || 0,
        userSubmission: parseFloat(((submissionType.userSubmission / attendance) * 100).toFixed(2)) || 0,
        incidents_autosubmit: analyseProctured ? parseFloat(((submissionType.incidents_autosubmit / attendance) * 100).toFixed(2)) || 0 : "Feature opted out",
    }
    // Return the final analytics object
    return {
        attendance,
        performance,
        totalMarks,
        totalQuestions,
        submissionType: submissionsRate,
        overallAttemptRate: parseFloat(overallAttemptRate),
        overallAttemptAccuracy: parseFloat(overallAttemptAccuracy),
        averageScore: parseFloat(averageScore),
        technicalIssueRate,
        incidents: incidentsCount,
        incidentsRatePerStudent,
        topScore,
        lowestScore,
    };
}

async function getAccumulatedListLength(participants: { _id: ObjectId, listName: string }[]) {
    // Map over the participants to fetch their lists
    const participantPromises = participants.map(async (participant) => {
        const foundParticipant = await Participants.findById(participant._id); // Fetch the participant
        return foundParticipant ? foundParticipant.list : null; // Return the list or null if not found
    });

    // Wait for all promises to resolve
    const participantLists = await Promise.all(participantPromises);

    // Now use reduce to accumulate the lengths of the lists
    const accumulatedLength = participantLists.reduce((acc, list) => {
        return acc + (list ? list.length : 0); // Add the length of the list if it exists
    }, 0); // Initial value of the accumulator is 0

    return accumulatedLength; // Return the accumulated length
}

export const addAnalytics = async (test: TestType) => {
    // if (test.status !== "completed") return null;
    // if (test.analytics) return null;
    // const { _id: testId } = test;
    const { user, proctoring, startAt } = test;
    const testId = "67ee47d3bf1c2ddc4431604b";
    try {
        if (!doc) {
            doc = new GoogleSpreadsheet(SHEET_ID, new JWT({
                email: creds.client_email,
                key: creds.private_key,
                scopes: ['https://www.googleapis.com/auth/spreadsheets'],
            }));
        }

        await doc.loadInfo();

        let sheet = doc.sheetsByTitle[testId as string];

        if (!sheet) {
            throw new Error(`Sheet with testId "${testId}" not found.`);
        }

        const rows = await sheet.getRows();
        // const structuredRows = rows.map((row: GoogleSpreadsheetRow) => mapRowData(row));
        const expectedAttendance = await getAccumulatedListLength(test.participants as any)

        const analytics = {
            testAt: startAt,
            proctured: proctoring,
            expectedAttendance,
            ...calculateAnalytics(rows, proctoring),
            user,
        };


        // const analyticsDocs = await Analytics.find();
        // console.log(analyticsDocs);
        console.log(analytics);




    } catch (error) {
        console.error('❌ Error retrieving sheet data:', error);
        throw error;
    }

}