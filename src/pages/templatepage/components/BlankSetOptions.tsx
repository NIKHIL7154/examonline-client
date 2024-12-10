import { MdOutlineArrowForwardIos } from "react-icons/md";
import UploadOptions from "./UploadOptions";

interface BlankSetOptionsProps {
    expandUpload: boolean;
}

function BlankSetOptions({ expandUpload }: BlankSetOptionsProps) {
    return (
        <div className="w-full h-auto flex flex-row text-xl mt-2 bg-white relative ">
            <UploadOptions expandUpload={expandUpload} />

            <span className="bg-white pb-1 rounded-full absolute 
            top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            > or </span>

            <button data-button={"create-button"} className="group w-[500px] p-4 border hover:border-2 hover:border-lime-700 flex transition-[font] duration-150">
                <h2 className="m-auto"> Create a set <br /> from scratch </h2>
                <MdOutlineArrowForwardIos className="group-hover:text-lime-700 group-hover:transform group-hover:translate-x-2 transition-all duration-300 text-xl my-auto" />
            </button>
        </div>
    );
}

export default BlankSetOptions;