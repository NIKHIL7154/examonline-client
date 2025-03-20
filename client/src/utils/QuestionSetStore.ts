import { Question } from "../types/QuestionTypes";

let Questions :Question[]=[
    {
        questionTitle: "",
        options: {
            A: "",
            B: "",
            C: "",
            D: "",
        },
        correctOption: "A",
       
    },
];

export const getQuestions=()=>{
    return Questions;
}

export const setQuestions=(questions : Question[])=>{
    if(questions.length<1){
        Questions=[
            {
                questionTitle: "",
                options: {
                    A: "",
                    B: "",
                    C: "",
                    D: "",
                },
                correctOption: "A",
                
            },
            
        ];
        return;
    }
    Questions=questions;
}