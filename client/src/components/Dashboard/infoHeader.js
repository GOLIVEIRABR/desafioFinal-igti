import React from 'react'
import css from './dashboard.module.css';

export default function Month(props) {
  const {recipes, expenses, balance, quantity} = props
  return (
    <div className="row ">
      <div className={css.flexRow+ ' '+css.spaceBetween+' '+css.infoHeader}>
      <div className="">
        <strong>Lançamentos:<span> {quantity}</span></strong> 
      </div>
      <div className="">
        <strong>Receitas: <span className={css.infoHeaderRecipe}>R$ {recipes}</span></strong>
      </div>
      <div className="">
        <strong>Despesas: <span className={css.infoHeaderExpense}>R$ {expenses}</span></strong> 
      </div>
      <div className="">
        <strong>Saldo: <span className={css.infoHeaderPositiveBalance}>R$ {balance}</span></strong> 
      </div>
      </div>
    </div>
  )
}