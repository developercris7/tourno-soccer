import React from 'react'

const Location = ({formData,handleChange}) => {
  const fields = [
    {label : "state",name :"state",type:"text"},
    {label : "district",name : "district" , type:"text"}
  ]
  return (
    <div>
      <p>Location Information</p>
      {fields.map((field)=>(
        <div key={field.name}>
        <label htmlFor={field.name} className='label'>
          {field.label}
        </label>
        <input type={field.type} name={field.name} 
        id={field.name}
        value={formData.location[field.name]} 
        onChange={(e)=>handleChange(e,"location")}
        className='input'
        />
        </div>
      ))}
    </div>
  )
}

export default Location