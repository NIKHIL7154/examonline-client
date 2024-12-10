import TemplateList from "./components/TemplateList";
import UserSets from "./components/userSets";

const userSets = null; // user set is empty

function QuestionsManager() {

    return (
        <div className="overflow-y-auto size-full">
            <div className="flex flex flex-col items-center gap-6">
                <TemplateList />
                <UserSets recentSets={userSets}/>
            </div>
        </div>
    );
}

export default QuestionsManager;