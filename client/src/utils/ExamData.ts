

type ExamData = {
    token: string,
    duration: number,
    questionCount: number,
    userUID: string,
}

const examData: ExamData = {
    token: "",
    duration: 0,
    questionCount: 0,
    userUID: ""
}

export function getExamData(): ExamData {
    
        return examData;
    
   
}
export function setExamData(data: ExamData) {
    examData.token = data.token;
    examData.duration = data.duration;
    examData.questionCount = data.questionCount;
    examData.userUID = data.userUID;
}