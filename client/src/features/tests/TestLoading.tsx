import Row from "../../ui/Row";

function FeatueRow({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex gap-2 items-center">

            {/* <span className="h-[20px] w-[20px] bg-gray-300 rounded-full" /> */}
            {children}
        </div>
    )
}

function TestLoading() {
    return (
        <>
            <Row type="horizontal">
                <span className="flex gap-6 items-center">
                    <h1 className="text-3xl font-medium text-gray-800 flex gap-4">
                        <span>Test</span>
                        <span className="w-[450px] bg-gray-300 animate-pulse rounded-md" />
                    </h1>
                </span>
            </Row>


            <div className="border border-gray-200 bg-gray-50 rounded-lg overflow-hidden poppins-regular">
                <div className="bg-emerald-600 px-9 py-6 flex justify-between">
                    <h3 className=" text-gray-50 flex gap-3 items-center animate-pulse">
                        <span className="w-[30px] h-[30px] rounded-full bg-emerald-500 " />
                        <span className="text-[1.3rem] w-100 h-[32px] bg-emerald-500 rounded-md" />
                    </h3>
                </div>

                <div className="px-9 py-6 space-y-[1.7rem] animate-pulse">
                    <FeatueRow>
                        <span className="w-120 bg-gray-300 h-[26px] rounded-md animate-none" />
                    </FeatueRow>
                    <FeatueRow>
                        <span className="w-100 bg-gray-300 h-[26px] rounded-md " />
                    </FeatueRow>

                    <FeatueRow>
                        <span className="w-120 bg-gray-300 h-[26px] rounded-md " />
                    </FeatueRow>

                    <FeatueRow >
                        <span className="w-100 bg-gray-300 h-[26px] rounded-md " />
                    </FeatueRow>

                    <FeatueRow >
                        <span className="w-120 bg-gray-300 h-[26px] rounded-md " />
                    </FeatueRow>

                </div>
            </div>

        </>
    );
}

export default TestLoading;
