
import { SidebarDataProps } from './SidebarData'
import  {  useEffect, useRef } from 'react'
import { gsap } from 'gsap'
type Props = {
    item:SidebarDataProps
    active:boolean
    action:{menuItem:string,handleNavigate:(path:string)=>void}
}

const SideItem = (props: Props) => {
    const {item,active,action} = props
    
    const ref=useRef(null)
    useEffect(() => {
        if(active){
            gsap.fromTo(ref.current, {opacity:0, x:0}, {opacity:1, x:0, duration:1.5})
        }
    }, [active])

    const handleMenuUpdate=()=>{
        action.handleNavigate(item.path)
    }
  return (
    <div onClick={handleMenuUpdate} className={`flex items-center w-[90%] h-[60px] cursor-pointer duration-400

    ${action.menuItem===item.path?`bg-[#25fb1d]  text-white`:`bg-white text-black hover:bg-[#74ff6f3b]`}

    rounded-xl`}
    >
        <div className=' flex-grow flexed'>{item.icon}</div>
        {active?<p ref={ref} className='m-0 flex-[50%] text-left text-lg font-bold overflow-hidden text-ellipsis whitespace-nowrap'>{item.title}</p>:null}
    
    </div>
  )
}

export default SideItem