import React from 'react'

export default function Contextmenu({menuPosition,setMenuPosition,rowid,setExpenses,Expenses,setInputData,setEditingid}) {
  if(!menuPosition.left) return
  return (
    <div className="context-menu" style={{...menuPosition}}>
    <div onClick={()=>{
    const {title,category,amount} = Expenses.find((el)=>el.id == rowid)
    setInputData({title,category,amount})

    setEditingid(rowid)
    setMenuPosition({})
    }}>Edit</div>

    <div onClick={()=>{
    setExpenses((prevState)=>prevState.filter((expense)=>expense.id !== rowid))
    setMenuPosition({})
    }}>Delete</div>
    </div>
  )
}
