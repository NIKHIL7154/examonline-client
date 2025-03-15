import Row from "../../ui/Row";

function TestsLoading(){
    return (
        <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-300">
            {
                Array.from({ length: 3 }).map((_, index: number) => {
                    return <div key={index} className="animate-pulse py-5 px-6 border-b border-gray-200 last:border-b-0 space-y-4">
                        <Row type="horizontal">
                            <div className="flex items-center gap-4">
                                <h2 className="bg-gray-300 h-[30px] w-[200px] rounded-lg" />
                                <span className="w-[86px] h-[23px] bg-gray-300 rounded-full" />
                            </div>
                        </Row>

                        <div className="flex gap-5">
                            <div className="flex gap-2">
                                <span className="bg-gray-300 h-[24px] w-[24px] rounded-full" />
                                <div className="bg-gray-300 w-[65px] h-[24px] rounded-lg" />
                            </div>
                            <div className="flex gap-2">
                                <span className="bg-gray-300 h-[24px] w-[24px] rounded-full" />
                                <div className="bg-gray-300 w-[120px] h-[24px] rounded-lg" />
                            </div>
                            <div className="flex gap-2" >
                                <span className="bg-gray-300 h-[24px] w-[24px] rounded-full" />
                                <div className="bg-gray-300 w-[165px] h-[24px] rounded-lg" />
                            </div>
                        </div>
                    </div>
                })
            }
        </div>
    );
}

export default TestsLoading;
