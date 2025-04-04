

type Question = {
    questionTitle: string;
    options: { A: string; B: string; C: string; D: string };
    userChoice: string;
    visited: boolean;
};
const demoQuestions: Question[] = [
    {
        questionTitle: "What is the capital of France?",
        options: { A: "Berlin", B: "Madrid", C: "Paris", D: "Rome" },
        userChoice: "",
        visited: false,
    },
    {
        questionTitle: "What is 2 + 2?",
        options: { A: "3", B: "4", C: "5", D: "6" },
        userChoice: "",
        visited: false,
    },
    {
        questionTitle: "What is the largest planet in our solar system?",
        options: { A: "Earth", B: "Mars", C: "Jupiter", D: "Saturn" },
        userChoice: "",
        visited: false,
    },
    {
        questionTitle: "What is the boiling point of water?",
        options: { A: "90°C", B: "100°C", C: "110°C", D: "120°C" },
        userChoice: "",
        visited: false,
    },
    {
        questionTitle: "Who wrote 'To Kill a Mockingbird'?",
        options: { A: "Harper Lee", B: "Mark Twain", C: "Ernest Hemingway", D: "F. Scott Fitzgerald" },
        userChoice: "",
        visited: false,
    },
    {
        questionTitle: "What is the chemical symbol for gold?",
        options: { A: "Au", B: "Ag", C: "Pb", D: "Fe" },
        userChoice: "",
        visited: false,
    },
    {
        questionTitle: "What is the speed of light?",
        options: { A: "300,000 km/s", B: "150,000 km/s", C: "450,000 km/s", D: "600,000 km/s" },
        userChoice: "",
        visited: false,
    },
    {
        questionTitle: "Who painted the Mona Lisa?",
        options: { A: "Vincent van Gogh", B: "Pablo Picasso", C: "Leonardo da Vinci", D: "Claude Monet" },
        userChoice: "",
        visited: false,
    },
    {
        questionTitle: "What is the smallest prime number?",
        options: { A: "0", B: "1", C: "2", D: "3" },
        userChoice: "",
        visited: false,
    },
    {
        questionTitle: "What is the main ingredient in guacamole?",
        options: { A: "Tomato", B: "Onion", C: "Avocado", D: "Pepper" },
        userChoice: "",
        visited: false,
    },
];

let questions: Question[] = [];

export function useQuestionStore(){
    return {
        setQuestions: (question: Question[]) => {
            questions = question;
        },
        getQuestions:() => {
            return questions;
            // console.log(questions)
            // return demoQuestions;
        }
    }
}