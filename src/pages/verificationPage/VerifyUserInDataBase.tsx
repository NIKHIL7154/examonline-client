import { useEffect } from "react"

type Props = {
    updateState?: (value: boolean) => void
}

const VerifyUserInDataBase = (props: Props) => {
    useEffect(() => {
        if(props.updateState){

            setTimeout(() => {
                props.updateState?.(false)
            }, 2000);
        }
        return () => {
            
        };
    }, [props]);
    return (

        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <h1 className="text-2xl font-semibold text-gray-700">Setting up the app for you...</h1>
                <p className="text-gray-500 mt-2">Please wait a moment while we prepare everything.</p>
            </div>
        </div>
    )
}

export default VerifyUserInDataBase