import Row from "../../ui/Row";

function SetLoading() {
    return (
        <>
            <Row type="horizontal">
                <span className="flex gap-6 items-center">
                    <h1 className="text-3xl font-medium text-gray-800 flex gap-4">
                        <span>Set</span>
                        <span className="w-[450px] bg-gray-300 animate-pulse rounded-md" />
                    </h1>
                </span>
            </Row>

            <div className="w-230 mx-auto">
                <div className="space-y-4 ">
                    <div className=" border-gray-300 border px-7 py-6 rounded-lg bg-gray-50 space-y-3">
                        <h2 className="animate-pulse block text-xl font-medium bg-gray-300 h-[28px] rounded-md w-40">
                            
                        </h2>
                        <p className="animate-pulse h-[40.8px] rounded-md bg-gray-300 font-medium py-2 w-full transition-all duration-200 border-b border-transparent outline-none"
                        />
                    </div>
                    <div className=" border-gray-300 border px-7 py-6 rounded-lg bg-gray-50 space-y-3">
                        <h2 className="animate-pulse block text-xl font-medium bg-gray-300 h-[28px] rounded-md w-40">
                            
                        </h2>
                        <p className="animate-pulse h-[40.8px] rounded-md bg-gray-300 font-medium py-2 w-full transition-all duration-200 border-b border-transparent outline-none"
                        />
                        <div className="animate-pulse grid grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
                            <p className="w-full bg-gray-300 h-[40.8px] rounded-md"></p>
                            <p className="w-full bg-gray-300 h-[40.8px] rounded-md"></p>
                            <p className="w-full bg-gray-300 h-[40.8px] rounded-md"></p>
                            <p className="w-full bg-gray-300 h-[40.8px] rounded-md"></p>
                            
                        </div>
                        {/* <p className="animate-pulse h-[40.8px] rounded-md bg-gray-300 font-medium py-2 w-full transition-all duration-200 border-b border-transparent outline-none"/> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SetLoading;
