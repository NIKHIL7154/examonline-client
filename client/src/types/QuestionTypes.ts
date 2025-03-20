export interface Question {
    questionTitle: string;
    options: {
        A: string;
        B: string;
        C: string;
        D: string;
    };
    correctOption: "A" | "B" | "C" | "D";
}