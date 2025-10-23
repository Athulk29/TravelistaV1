import React from 'react'

function Input({labelClass,labelText,type,inputClass, onchange}) {
  return (

    <div className="form-group">
      <label className={labelClass}>{labelText}</label>
      <input type={type} className={inputClass} onChange={onchange} />
    </div>

  )
}

export default Input
