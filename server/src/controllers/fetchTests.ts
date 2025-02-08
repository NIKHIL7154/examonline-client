import User from "../models/UserModel"

export async function getTestsFromDatabase(userId: string) {
    try {
        const user = await User.findById(userId)
            .populate({ path: 'tests', select: 'questionSetId name status createdAt' })
            if(user){
                return user.tests;
            }
            return null;
    } catch (error) {
        console.log(error);
        return null;
    }

}