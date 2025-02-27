type CompletedUser = {
    testId: string;
    expiry: Date;
}
class CompletedUsers{
    users = new Map<string,CompletedUser>();
    add(userId:string,user:CompletedUser){
        this.removeExpiredUsers();
        this.users.set(userId,user);
    }
    has(userId:string){
        this.removeExpiredUsers();
        return this.users.has(userId);
    }
    get(userId:string){
        return this.users.get(userId);
    }
    removeExpiredUsers(){
        for(const [userId,user] of this.users){
            if(user.expiry<new Date()){
                this.users.delete(userId);
            }
        }
    }
}

const completedUsers = new CompletedUsers();
export default completedUsers;