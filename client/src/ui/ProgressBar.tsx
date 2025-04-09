import React from 'react';
const ProgressBar: React.FC<{ percentage: number, position: string }> = ({ percentage, position= "top" }) => {
    const formattedPercent = Math.trunc(percentage);
    
    return (
        <>
            <div className="w-full bg-gray-200 rounded-full h-[11px] cursor-pointer">
                <div
                    // className="bg-[#91D794] h-full rounded-full flex justify-end items-center "
                    className=" bg-linear-to-r from-[#82ca9d] to-[#8884d8] h-full rounded-full flex justify-end items-center "
                    style={{ width: `${formattedPercent}%` }}
                >
                    {/* <div className="h-6 w-6 rounded-full bg-[#6FA371] relative ">
                        {(percentage <= 90 && percentage > 9) &&
                        <p className="absolute top-6 left-1 ">{percentage}%</p>}
                        </div> */}
                    <div className='relative'>
                        <p className={`opacity-0 transition-opacity text-sm duration-250 absolute group-hover:opacity-100 right-1 ${ position === "top" ? "top-[-30px]" : "bottom-[-30px]" }`}>{formattedPercent}%</p>
                        
                    </div>
                </div>
            </div>

            {/* <div className="w-full flex justify-between ">
                <div>0%</div>
                <div>100%</div>
            </div> */}
        </>
    );
};

export default ProgressBar;