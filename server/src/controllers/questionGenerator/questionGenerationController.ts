import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextFunction, Response } from "express";

import { ProtectedRequest } from "../../types/expressTypes";
import AppError from "../../utils/appError";
import { envManager } from "../../app";

const genAI = new GoogleGenerativeAI(envManager("GOOGLE_API_KEY"));
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Using a more stable model


type Question = {
    questionTitle: string;
    options: {
        A: string;
        B: string;
        C: string;
        D: string;
    };
    correctOption: string;
}



function createPrompt(difficulty: number, count: number, topic: string) {
    const prompt = `Generate ${count} unique ${topic} questions in strict JSON format as defined below:
{
    "questionTitle": "string",
    "options": {
        "A": "string",
        "B": "string",
        "C": "string",
        "D": "string"
    },
    "correctOption": "A" | "B" | "C" | "D"
}

### Constraints:
- The difficulty level of the questions should be ${difficulty} out of 10, where 1 is the easiest and 10 is the hardest. Ensure all questions strictly match this difficulty level.
- Each question must be unique and not repeated.

### Output Format:
- Return the response as a **JSON stringified array** of ${count} objects.
- The response must contain:
    - **Only** the JSON array (no additional text, spaces, or formatting outside the array).
    - Strict JSON syntax (double quotes for all keys and string values).

### Example output:
[
    {"questionTitle":"What is 2 + 2?","options":{"A":"3","B":"4","C":"5","D":"6"},"correctOption":"B"},
    {"questionTitle":"What is the capital of France?","options":{"A":"Rome","B":"Paris","C":"Berlin","D":"Madrid"},"correctOption":"B"}
]

Respond with only the JSON array and nothing else.

`;
    return prompt;
}


async function generateContent(prompt: string) {
    try {
        const result = await model.generateContent(prompt);

        // Extract the text from the response
        const rawResponse = result.response.text();
        console.log(rawResponse);

        // Clean up the response to extract JSON
        const jsonStart = rawResponse.indexOf("["); // Find the start of the JSON array
        const jsonEnd = rawResponse.lastIndexOf("]") + 1; // Find the end of the JSON array
        const jsonString = rawResponse.slice(jsonStart, jsonEnd); // Extract the JSON string

        // Parse the JSON string
        const response: Question[] = JSON.parse(jsonString);
        console.log(response);
    } catch (error) {
        console.error("Error generating content:", error);
    }
}

// generateContent(prompt);


function parseJsonResponse(response: string): boolean | Question[] {
    try {
        const parsed = JSON.parse(response);
        if (Array.isArray(parsed) && parsed.every(item =>
            typeof item.questionTitle === 'string' &&
            typeof item.correctOption === 'string' &&
            ['A', 'B', 'C', 'D'].includes(item.correctOption) &&
            typeof item.options === 'object' &&
            typeof item.options.A === 'string' &&
            typeof item.options.B === 'string' &&
            typeof item.options.C === 'string' &&
            typeof item.options.D === 'string'
        )) {
            return parsed;
        }
        return false;
    } catch (e) {
        return false;
    }
}


export async function GenerateQuestions(req: ProtectedRequest, res: Response, next: NextFunction) {
    const { difficulty, count, topic } = req.body;
    if (!difficulty || !count || !topic) {
        return next(new AppError("Please provide all the required fields", 400));
    }
    const prompt = createPrompt(difficulty, count, topic);
    const result = await model.generateContent(prompt);
    if (!result) {
        return next(new AppError("Error occured while generating questions, please try again", 500));
    }
    // Extract the text from the response
    const rawResponse = result.response.text();

    // Clean up the response to extract JSON
    const jsonStart = rawResponse.indexOf("["); // Find the start of the JSON array
    const jsonEnd = rawResponse.lastIndexOf("]") + 1; // Find the end of the JSON array
    const jsonString = rawResponse.slice(jsonStart, jsonEnd); // Extract the JSON string
    const parsedQuestions = parseJsonResponse(jsonString);
    if (!parsedQuestions) {
        return next(new AppError("Error occured while parsing the response, please try again", 500));
    }
    res.status(200).json({
        status: "success",
        data: {
            questions: parsedQuestions,
        },
    });


}