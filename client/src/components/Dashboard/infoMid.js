import React from 'react'
import css from './dashboard.module.css';

export default function Month(props) {
  const handleFilter = props.onChange;
  const handleAddButton = props.handleAddButton;
  const disabled = props.disabled
  return (
    <div className = {css.infoMid+" row"} >
      <div className = {css.flexRow+' '+css.centered+' '+css.centerH}>
        <button disabled={disabled} onClick={handleAddButton} className={`waves-effect waves-light btn ${css.newButton}`}>+ NOvo lançamento</button>
      
        <input onChange={handleFilter} placeholder="Filtro" id="search" type="text" className="validate"/>
     
      </div>
    </div>
  )
}