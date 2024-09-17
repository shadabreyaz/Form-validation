import React, { useState } from 'react'

export default function useFilter(data,callback) {
 const[query,setQuery]=useState('')
  
 const filteredVal = data.filter((expense)=>callback(expense).toLowerCase().includes(query))

  return [filteredVal,setQuery]
}
