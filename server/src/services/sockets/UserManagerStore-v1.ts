type Question = {
    question: string;
    options: { A: string; B: string; C: string; D: string };
    userChoice: string;
    questionId: string;
    visited: boolean;
};

export type UserData = {
    socketId: string;
    userUid: string;
    startAt: Date;
    duration: number; // seconds
    timeLeft: number; // seconds
    testId: string;
    questions: Question[];
    interval?: NodeJS.Timeout | null;
    completed: boolean;
    inactiveTimeout?:NodeJS.Timeout;
};

const users = new Map();

export function UserManagerStore() {
    return {
        addUser: (token:string, userData:UserData) => {
            users.set(token, userData);
        },
        getUser: (token:string):UserData => {
            const { interval, ...userData } = users.get(token) || {};
            return userData;
        },
        removeUser: (token:string) => {
            users.delete(token);
        },
        hasUser: (token:string):boolean => {
            return users.has(token);
        },
        updateUser:(token:string,payload:Partial<UserData>)=>{
            const user = users.get(token);
            if(!user){
                return;
            }
            users.set(token,{...user,...payload});
            console.log("updated user",users.get(token));
        },

        startTimer: (token:string, callback: (leftTime: number) => void) => {
            const user = users.get(token);
            if (!user) return;
            if (user.interval) clearInterval(user.interval);
            user.interval = setInterval(() => {
                user.timeLeft -= 2;
                console.log("time left", user.timeLeft);
                callback(user.timeLeft);
                if (user.timeLeft <= 0) {
                    console.log("cleared in interval")
                    clearInterval(user.interval);
                }
            }, 2000);
            users.set(token, user);
        },
        removeTimer: (token:string) => {
            const user = users.get(token);
            if (!user) return;
            if (user.interval) {
                console.log("clearing interval");
                clearInterval(user.interval);
            }
        },
        setInactiveUserTimeout:(token:string)=>{
            const user = users.get(token);
            if(!user){
                return;
            }
            user.inactiveTimeout=setTimeout(()=>{
                user.completed=true;
                users.set(token,user);
            },1000*60*5)
            
        }

        
    };
}