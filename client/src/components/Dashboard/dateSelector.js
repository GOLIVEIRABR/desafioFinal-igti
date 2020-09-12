import React from 'react'
import css from './dashboard.module.css';

export default function Month(props) {
  
  const handleSelector = props.select;
  const handleButtons = props.buttons;
  const defaultValue = props.selected;
  
  return (
    <div className = "row" >
      <div className = {css.flexRow+' '+css.centered+' '+css.centerH}>
        <button disabled={defaultValue==='2019-01'?'disabled':''} onClick={handleButtons} id="prev" className={`waves-effect waves-light btn ${css.item}`}>&lt;</button>
        <select id='select' value={defaultValue} onChange={handleSelector} className={ `browser-default ${css.item} ${css.select}`} name="select">
        <option value="2019-01">Jan/2019</option>
        <option value="2019-02">Fev/2019</option>
        <option value="2019-03">Mar/2019</option>
        <option value="2019-04">Abr/2019</option>
        <option value="2019-05">Mai/2019</option>
        <option value="2019-06">Jun/2019</option>
        <option value="2019-07">Jul/2019</option>
        <option value="2019-08">Ago/2019</option>
        <option value="2019-09">Set/2019</option>
        <option value="2019-10">Out/2019</option>
        <option value="2019-11">Nov/2019</option>
        <option value="2019-12">Dez/2019</option>
        <option value="2020-01">Jan/2020</option>
        <option value="2020-02">Fev/2020</option>
        <option value="2020-03">Mar/2020</option>
        <option value="2020-04">Abr/2020</option>
        <option value="2020-05">Mai/2020</option>
        <option value="2020-06">Jun/2020</option>
        <option value="2020-07">Jul/2020</option>
        <option value="2020-08">Ago/2020</option>
        <option value="2020-09">Set/2020</option>
        <option value="2020-10">Out/2020</option>
        <option value="2020-11">Nov/2020</option>
        <option value="2020-12">Dez/2020</option>
        <option value="2021-01">Jan/2021</option>
        <option value="2021-02">Fev/2021</option>
        <option value="2021-03">Mar/2021</option>
        <option value="2021-04">Abr/2021</option>
        <option value="2021-05">Mai/2021</option>
        <option value="2021-06">Jun/2021</option>
        <option value="2021-07">Jul/2021</option>
        <option value="2021-08">Ago/2021</option>
        <option value="2021-09">Set/2021</option>
        <option value="2021-10">Out/2021</option>
        <option value="2021-11">Nov/2021</option>
        <option value="2021-12">Dez/2021</option>
        </select>
        <button disabled={defaultValue==='2021-12'?'disabled':''} onClick={handleButtons} id="next" className={`waves-effect waves-light btn ${css.item}`}>&gt;</button>
      </div>
    </div>
  )
}