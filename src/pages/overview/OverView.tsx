import React from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {}

const OverView = (props: Props) => {
    const navigate=useNavigate();
  return (
    <div>OverView
    <button onClick={()=>navigate('tests/plok')}>Go to App</button>
    </div>
  )
}

export default OverView