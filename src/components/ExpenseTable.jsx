import React, { useState } from 'react'
import useFilter from '../hooks/useFilter'
import Contextmenu from './Contextmenu'

export default function ExpenseTable({Expenses,setExpenses,inputData,setInputData,setEditingid}) {

const[result,setQuery] = useFilter(Expenses,(data)=>data.category)

const totalAmount = result.reduce((acc,curr)=> acc + parseInt(curr.amount),0)

const[menuPosition, setMenuPosition] = useState({})
const[rowid,setRowid] = useState('')

const[sorting,setSorting] = useState(()=> ()=>{})
  return (
    <>
    <Contextmenu 
    menuPosition={menuPosition}
     setMenuPosition={setMenuPosition} 
     rowid={rowid} 
     setExpenses={setExpenses}
     Expenses={Expenses}
     setInputData={setInputData} 
     setEditingid={setEditingid}
     />
    <table className="expense-table" onClick={()=>{
      if(menuPosition.left){
        setMenuPosition({})
      }
      }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>
                <select onChange={(e)=>{setQuery(e.target.value)}}>
                  <option value="">All</option>
                  <option value="grocery">Grocery</option>
                  <option value="clothes">Clothes</option>
                  <option value="bills">Bills</option>
                  <option value="education">Education</option>
                  <option value="medicine">Medicine</option>
                </select>
              </th>
              <th className="amount-column">
                <div>
                  <span>Amount</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    viewBox="0 0 384 512"
                    className="arrow up-arrow"
                    onClick={()=>{
                      setSorting(()=> (a,b)=>{return a.amount-b.amount})
                    }}
                  >
                    <title>Ascending</title>
                    <path
                      d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    viewBox="0 0 384 512"
                    className="arrow down-arrow"
                    onClick={()=>{
                      setSorting(()=> (a,b)=> b.amount-a.amount)
                    }}
                  >
                    <title>Descending</title>
                    <path
                      d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                    />
                  </svg>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
              {result.sort(sorting).map(({id,title,category,amount})=>
                 <tr key={id} onContextMenu={(e)=>{
                  e.preventDefault()
                  setMenuPosition({left:e.clientX + 4,top:e.clientY + 4})
                  setRowid(id)
                  }}>
                 <td>{title}</td>
                 <td>{category}</td>
                 <td>₹{amount}</td>
               </tr>
              )}  
            <tr>
              <th>Total</th>
              <th onClick={()=>setSorting(()=> ()=>{})}>Clear Sort</th>
              <th>₹{totalAmount}</th>
            </tr>
          </tbody>
    </table>
    </>
  )
}
