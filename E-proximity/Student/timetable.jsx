import React from 'react'

const Timetable = () => {
    const d=new Date();
    console.log(d.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}));
    const t=d.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
    const clo=()=>{
       return t==="01:16 PM"?'green':'black';
    }
    clo()
  return (
    <>
    <div><p>{d.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}</p>
    
     </div>
     <div style={{color:clo()}} >my name</div>
</>
  )
}

export default Timetable