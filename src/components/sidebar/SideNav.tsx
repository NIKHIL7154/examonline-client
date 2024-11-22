import { useEffect, useState } from 'react'

import SidebarData from './SidebarData';
import SideItem from './SideItem';
//import { useNavigate } from 'react-router-dom';
import {useToast} from '../../hooks/useToast';



const SideNav = () => {
  
  const [active, setActive] = useState(false)
  const [menuItem, setmenuItem] = useState("")
  //const navigate = useNavigate();
  const {ToastElement , showToast} = useToast()
  useEffect(() => {
    if(menuItem){
      //navigate(menuItem)
      showToast("Redirecting to "+menuItem,"success")
    }
    return () => {
      
    };
  }, [menuItem]);

  return (
    <div
    onMouseEnter={()=>setActive(true)}
    onMouseLeave={()=>setActive(false)}
    className={`h-full
      flex
      flex-col
      items-center
      w-[5%]
      hover:w-[15%]
      duration-500
      gap-2
      `}>
        <ToastElement/>
        {SidebarData.map((item, index) => {
          return <SideItem key={index} item={item} active={active} action={{menuItem,setmenuItem}}/>
        })}
      </div>
  )
}

export default SideNav