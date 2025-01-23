type Question = {
    question: string;
    options: {
        A: string;
        B: string;
        C: string;
        D: string;
    };
    answer: "A" | "B" | "C" | "D";
    id: string;
};
let Questions :Question[]=[
    {
        question: "",
        options: {
            A: "",
            B: "",
            C: "",
            D: "",
        },
        answer: "A",
        id: "tfg456",
    },
];

export const getQuestions=()=>{
    return Questions;
}

export const setQuestions=(questions : Question[])=>{
    if(questions.length<1){
        Questions=[
            {
                question: "",
                options: {
                    A: "",
                    B: "",
                    C: "",
                    D: "",
                },
                answer: "A",
                id: "tfg456",
            },
            
        ];
        return;
    }
    Questions=questions;
}