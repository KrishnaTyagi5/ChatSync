import React from 'react'
import useMessageStore from '../store/useMessageStore'


{/*This is to select the tabs (chats or contacts) */}
function ActiveTab() {

  const {activeTabs,setActiveTab} = useMessageStore();

  {/*Sending the selected value to the function to change */}
  function changingActiveTab(Value){
    setActiveTab(Value)
  }

  return (
    <div className='tabs tabs-boxed bg-transparent p-2 m-2'>
      
      {/*Here buttons will decide the activeTabs value */}
      <button className={`tab ${activeTabs === "Chats" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400"}`} onClick={()=>{changingActiveTab("Chats")}}>
          Chats
      </button>
      <button className={`tab ${activeTabs == "Contacts" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400"}`} onClick={()=>{changingActiveTab("Contacts")}}>
        Contacts
      </button>
    </div>
  )
}

export default ActiveTab