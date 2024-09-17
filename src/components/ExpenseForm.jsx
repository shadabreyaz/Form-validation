import React, { useState } from 'react'
import Input from './Input'
import Select from './Select'



export default function ExpenseForm({setExpenses,inputData,setInputData,editingid,setEditingid}) {

// const[inputData,setInputData] = useState({
//     title:"",
//     category:"",
//     amount:""
// })

const handleChange = (e)=>{
    const{ name ,value } = e.target
 setInputData((prev)=>({...prev,[name]:value}))
 setError({})
}

const validateConfig = {
title:[{required:'true',message:'Please enter Title'},{minLength:3,message:'Title should be greater than 3'}],
category:[{required:'true',message:'Please select a category'}],
amount:[{required:'true',message:'Please enter an amount'},{pattern:/^(0|[1-9]\d*)(\.\d+)?$/,message:'Please enter valid amount'}]
}

const[error,setError]=useState({})
const validate = (formdata)=>{
const errData = {}

Object.entries(formdata).forEach(([key,value])=>{
    validateConfig[key].some((rule)=>{
     if(rule.required && !value){
        errData[key]= rule.message
        return true
     }
     if(rule.minLength && value.length < rule.minLength){
        errData[key] = rule.message
        return true
     }
     if(rule.pattern && !rule.pattern.test(value)){
        errData[key] = rule.message
        return true
     }
    })
})


setError(errData)
return errData

}


const handleSubmit = (e)=>{
 e.preventDefault()

 const validateResult = validate(inputData)
  if(Object.keys(validateResult).length) return

  if(editingid){
    setExpenses((prev)=>prev.map((state)=>{
        if(state.id === editingid){
           return {...inputData,id:editingid}
        }
        return state
    }))
    setInputData({
        title:"",
        category:"",
        amount:""
     })
     setEditingid('')
     return
  }

 setExpenses((prev)=>[...prev,{...inputData, id:crypto.randomUUID()}])
 setInputData({
    title:"",
    category:"",
    amount:""
 })
}




    return (
        <form className="expense-form" onSubmit={handleSubmit}>
            <Input label='Title' id='title'
             name='title' value={inputData.title}
             onChange={handleChange} error={error.title} />

            <Select options={['Grocery','Clothes','Bills','Education','Medicine']} defaultval='All'
             label='Select Category' id='category' name='category'
             value={inputData.category} onChange={handleChange} error={error.category}/>

            <Input label='Amount' id='amount' 
            name='amount' value={inputData.amount} 
            onChange={handleChange} error={error.amount}/>
            
            <button className="add-btn">{editingid?'Save':'Add'}</button>
        </form>
    )
}
