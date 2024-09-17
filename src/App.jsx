import { useState } from 'react'
import './App.css'
import ExpenseForm from './components/ExpenseForm'
import ExpenseTable from './components/ExpenseTable'

import Data from './components/Data'
import useLocalStorage from './hooks/useLocalStorage'

function App() {
 const [Expenses, setExpenses] = useLocalStorage('Data',Data)

  const[inputData,setInputData] = useLocalStorage('inputData',{
    title:"",
    category:"",
    amount:""
})

 const[editingid,setEditingid] = useLocalStorage('editingid','')


  return (
    <>
      <main>
      <h1>Track Your Expense</h1>
      <div className="expense-tracker">
       <ExpenseForm setExpenses={setExpenses} inputData={inputData} setInputData={setInputData} editingid={editingid} setEditingid={setEditingid}/>
       <ExpenseTable Expenses={Expenses} setExpenses={setExpenses} inputData={inputData} setInputData={setInputData} setEditingid={setEditingid} />
      </div>
    </main>
    </>
  )
}

export default App
