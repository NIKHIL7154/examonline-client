export type Question = {
    questionTitle: string;
    options: {
        A: string;
        B: string;
        C: string;
        D: string;
    };
    correctOption: "A" | "B" | "C" | "D";
    // id: string;
};
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
        // id: "tfg456",
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
                // id: "tfg456",
            },
            
        ];
        return;
    }
    Questions=questions;
}