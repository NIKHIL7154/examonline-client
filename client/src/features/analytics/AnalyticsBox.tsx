
function AnalyticsBox() {
    return (
        <div className="grid grid-cols-3 gap-5">
            <div className="grid grid-cols-2 gap-5 col-span-2">
                <div className="h-70 bg-gray-50 rounded-2xl">
                </div>
                <div className="h-70 bg-gray-50 rounded-2xl"></div>
                <div className="bg-gray-50 h-70 col-span-2 rounded-2xl"></div>
            </div>
            <div className="space-y-5" >
                <div className="p-4 h-30 bg-gray-50 rounded-2xl">
                    <div className="h-full w-[27%] rounded-2xl bg-red-100"></div>
                </div>
                <div className="h-80 bg-gray-50 rounded-2xl"></div>
                <div className="h-25 bg-gray-50 rounded-2xl"></div>
            </div>
        </div>
    );
}

export default AnalyticsBox;
