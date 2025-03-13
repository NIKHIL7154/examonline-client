
import { useEffect } from "react"

import { UserResource } from "@clerk/types"
import { useAuth } from "@clerk/clerk-react";
import { serverUrlAuth } from "../../utils/globals";
import { createGetRequest } from "./apiHelper";

type Props = {
    updateState?: (value: boolean) => void
    user?: UserResource | null | undefined
}

const VerifyUserInDataBase = (props: Props) => {
    const { getToken } = useAuth();
    
    
    useEffect(() => {

        if (!props.updateState || !props.user) {
            return;
        }
        async function handler() {
            if (props.updateState && props.user) {
                
                try {
                    const response = await createGetRequest(getToken,serverUrlAuth);
                    console.log("Data fetched:", response);
                    clearInterval(checkInterval);
                    props.updateState(false);
                    
                } catch (error) {
                    console.error("Error fetching data:", error);
                   
                    // Optionally, update the state to indicate an error

                    

                }
            }
            
        }
        const checkInterval=setInterval(handler,4000)
        handler()

        return () => {
            clearInterval(checkInterval);
        };
    }, [props,getToken]);
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