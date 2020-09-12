import React from 'react'
import css from './dashboard.module.css';
import {formatNumber} from '../../helpers/formatter';

export default function Month(props) {
  const {recipes, expenses, balance, quantity} = props
  return (
    <div className="row ">
      <div className={css.flexRow+ ' '+css.spaceBetween+' '+css.infoHeader}>
      <div className="">
        <strong>Lançamentos:<span> {quantity}</span></strong> 
      </div>
      <div className="">
        <strong>Receitas: <span className={css.infoHeaderRecipe}>{formatNumber(recipes)}</span></strong>
      </div>
      <div className="">
        <strong>Despesas: <span className={css.infoHeaderExpense}>{formatNumber(expenses)}</span></strong> 
      </div>
      <div className="">
        <strong>Saldo: <span className={balance>=0?css.infoHeaderPositiveBalance:css.infoHeaderNegativeBalance}>{formatNumber(balance)}</span></strong> 
      </div>
      </div>
    </div>
  )
}