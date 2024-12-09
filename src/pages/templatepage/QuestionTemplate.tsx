import { Outlet } from "react-router-dom";
import TemplateList from "./components/TemplateList";

const userSet = "empty";

function QuestionTemplate() {

    return (
        <div className="overflow-y-auto size-full">
            <div className="flex flex flex-col items-center gap-6">
                <TemplateList />
                <div className=" w-[1000px] min-h-[500px]">
                    <h2 className="poppins-regular mb-3">Recents</h2>

                    {
                        (userSet === "empty")
                            ? <div className="w-full h-[150px] flex flex-col justify-center items-center border border-gray-200">
                                <h2 className="poppins-regular text-lg">No sets yet</h2>
                                <small className="poppins-regular text-base">Select a blank set or choose another template above to get started</small>
                            </div>
                            : "display user sets"
                    }

                </div>
            </div>
            <Outlet/>
        </div>
    );
}

export default QuestionTemplate;