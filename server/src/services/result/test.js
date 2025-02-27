const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
const creds = require('../../keys/examfusion-451510-70bae177b416.json');



const SHEET_ID = '1DDMXxdo1KomH6EJHu23njbPTFLHvJSkI94OIlZQFWh0';

async function storeExamResultsColumnWise(testId, studentName, studentAnswers, correctAnswers) {
    try {
        const doc = new GoogleSpreadsheet(SHEET_ID, new JWT({
            email: creds.client_email,
            key: creds.private_key,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        }));

        await doc.loadInfo();
        let sheet = doc.sheetsByTitle[testId];

        if (!sheet) {
            sheet = await doc.addSheet({
                title: testId,
                headerValues: [
                    "Student Name",
                    "Email",
                    "UID",
                    "Questions Attempted",
                    "Questions Skipped",
                    "Correct",
                    "Total Questions",
                    "Marks Scored",
                    "Total Marks",
                    "Tab Switch Count",
                    "Disconnection Count",
                    "Mobile Detection Count",
                    "Another Person Count",
                    "Submission Type"
                ],
            });
            
        }
        const obj={
            "Student Name":studentName,
            "Email":"a",
            "UID":"a",
            "Questions Attempted":"a",
            "Questions Skipped":"a",
            "Correct":"a",
            "Total Questions":"a",
            "Marks Scored":"a",
            "Total Marks":"a",
            "Tab Switch Count":"a",
            "Disconnection Count":"a",
            "Mobile Detection Count":"a",
            "Another Person Count":"a",
            "Submission Type":"a"
        }
        await sheet.addRow(obj);

       
       

        console.log(`✅ Results for ${studentName} stored in column  of ${testId}`);

    } catch (error) {
        console.error('❌ Error storing exam result:', error);
    }
}

// Example usage (same as before)
storeExamResultsColumnWise(
    'TEST1234',
    'Nikhlu',
    ['B', 'A', 'D', 'C'],
    ['A', 'A', 'D', 'C']
);

/* storeExamResultsColumnWise(
    'TEST123',
    'Jane Doe',
    ['C', 'A', 'D', 'A'],
    ['A', 'A', 'D', 'C']
); */