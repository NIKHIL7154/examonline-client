interface Set {
    id: string;
    name: string;
    createdDate: string;
    img: string;
}

interface UserSetsProps {
    recentSets: Set[] | null;
}

function UserSets({ recentSets }: UserSetsProps) {
    return (

        <div className=" w-[1000px] min-h-[400px]">
            <h2 className="poppins-regular mb-3">Recents</h2>

            {
                (recentSets) ? "display user sets" :

                    <div className="w-full h-[150px] flex flex-col justify-center items-center border border-gray-200">
                        <h2 className="poppins-regular text-lg">No sets yet</h2>
                        <small className="poppins-regular text-base">Select a blank set or choose another template above to get started</small>
                    </div>
            }
        </div>
    );
}

export default UserSets;