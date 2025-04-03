import { TestType } from "../models/TestModel";
import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import creds from '../keys/examfusion-451510-70bae177b416.json';
import { SheetHeaders } from "../services/result/resultSubmissionService";


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
        inactive: 0,
        userSubmission: 0
    };

    let incidents = {
        tabSwitchCount: 0,
        mobileDetectionCount: 0,
        anotherPersonCount: 0
    };

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
            submissionType.inactive += 1;
        } else if (submissionTypeValue === 'Submitted by User') {
            submissionType.userSubmission += 1;
        }

        incidents.tabSwitchCount += tabSwitchCount;

        if (analyseProctured) {
            mobileDetectionCount = parseFloat(row.get(SheetHeaders.MOBILE_DETECTION_COUNT));
            anotherPersonCount = parseFloat(row.get(SheetHeaders.ANOTHER_PERSON_COUNT));

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
    const overallAttemptRate = (totalAttemptedQuestions / attendance).toFixed(2);

    // Calculate overallAttemptAccuracy
    const overallAttemptAccuracy = (totalAccuracy / attendance).toFixed(2);


    // Calculate average score
    const averageScore = (totalMarksScored / attendance).toFixed(2);

    const technicalIssueRate = parseFloat(((technicalIssue / attendance) * 100).toFixed(2)) || 0;

    const incidentsRate = {
        tabSwitchRate: parseFloat((incidents.tabSwitchCount / attendance).toFixed(2)) || 0,
        mobileDetectionRate: analyseProctured
            ? parseFloat((incidents.mobileDetectionCount / attendance).toFixed(2)) || 0
            : "Featute opted out",
        anotherPersonRate: analyseProctured
            ? parseFloat((incidents.anotherPersonCount / attendance).toFixed(2)) || 0
            : "Featute opted out",
    }

    // Return the final analytics object
    return {
        attendance,
        performance,
        totalMarks,
        totalQuestions,
        submissionType,
        overallAttemptRate: parseFloat(overallAttemptRate),
        overallAttemptAccuracy: parseFloat(overallAttemptAccuracy),
        averageScore: parseFloat(averageScore),
        technicalIssueRate,
        incidents: incidentsRate,
        topScore,
        lowestScore,
    };
}

export const addAnalytics = async (test: TestType) => {
    // if (test.status !== "completed") return null;
    // if (test.analytics) return null;
    // const { _id: testId } = test;
    const { user, proctoring } = test;
    const testId = "67b993108e1ca35da449d5e6";
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

        const analytics = {
            ...calculateAnalytics(rows, proctoring),
            user,
        };

        console.log(analytics);



    } catch (error) {
        console.error('❌ Error retrieving sheet data:', error);
        throw error;
    }

}