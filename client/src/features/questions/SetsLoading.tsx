function SetsLoading() {
    return (
        <div className="flex flex-wrap gap-6 animate-pulse">
            {
                Array.from({ length: 3 }).map((_, index: number) => {
                    return <div key={index} className=" h-50 w-68 border border-gray-200 py-5 px-6 rounded-xl bg-gray-50 hover:shadow-md hover:shadow-gray-200 transition-all duration-200">
                        <p className="w-[46px] h-[46px] rounded-2xl bg-gray-300 " />

                        <div className="space-y-3 mt-4">
                            <h3 className="h-[26px] w-[190px] bg-gray-300 rounded-lg" />

                            <div className="space-y-2">
                                <p className="flex gap-2 items-center">
                                    <span className="bg-gray-300 rounded-full h-[18px] w-[18px]"></span>
                                    <span className="text-sm h-[20px] w-[81px] bg-gray-300 rounded-md"> </span>
                                </p>
                                <p className="flex gap-2 items-center">
                                    <span className="bg-gray-300 rounded-full h-[18px] w-[18px]"></span>
                                    <span className="text-sm h-[20px] w-[81px] bg-gray-300 rounded-md"> </span>
                                </p>
                            </div>
                        </div>
                        {/* <div className="text-sm flex justify-end text-gray-700 font-medium">
                                <span className="h-[20px] w-[55px] bg-gray-300 rounded-md"/>
                            </div> */}
                    </div>
                })
            }
        </div>
    );
}

export default SetsLoading;
