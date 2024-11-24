import React from 'react';
const ProgressBar: React.FC<{ percentage: number }> = ({ percentage }) => {
    return (
        <>
            <div className="w-full bg-slate-300 rounded-full h-4">
                <div
                    className="bg-[#91D794] h-full rounded-full flex justify-end items-center"
                    style={{ width: `${percentage}%` }}
                >
                    <div className="h-6 w-6 rounded-full bg-[#6FA371] relative">
                        {(percentage <= 90 && percentage > 9) &&
                            <p className="absolute top-6 left-1">{percentage}%</p>}
                    </div>
                </div>
            </div>

            <div className="w-full flex justify-between">
                <div>0%</div>
                <div>100%</div>
            </div>
        </>
    );
};

export default ProgressBar;