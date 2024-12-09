import { useState } from "react"
import { useParams } from "react-router-dom"
import Loader from "../../../components/Loader";




const ShowTest = () => {
    const { testId } = useParams<{ testId: string }>()
    const [isValidTest, setisValidTest] = useState<boolean>(false);
    const [isTestAvailable, setisTestAvailable] = useState<boolean>(false);
    console.log(testId)
    const fetchTest = new Promise((resolve) => {
        setTimeout(() => {
            resolve(true)
        }, 3000)
    })
    fetchTest.then((res) => {
        setisValidTest(true)
        setisTestAvailable(true)
    })

    if(!isTestAvailable){
        return <Loader/>
    }

  return (
    <div>ShowTest</div>
  )
}

export default ShowTest