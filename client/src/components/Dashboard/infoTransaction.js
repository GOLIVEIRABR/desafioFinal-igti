import React from 'react'
import css from './dashboard.module.css';

export default function Month(props) {
  const {id, day, category, description, value, type, removeButton, editButton} = props;
  return (
      <div className={type==='-'?css.transactionExpense:css.transactionRecipe}>
        <div className={css.firstPart}>
          <div><strong>{day}</strong></div>
          <div className={css.firstPartColumn}>
            <div><strong>{category}</strong></div>
            <div>{description}</div>
          </div>
        </div>
        <div className={css.secondPart}>
          <div className={css.firstSecondPartColumn}>
            <div><span>R$ {value}</span></div>
          </div>
          <div className={css.secondSecondPartColumn}>        
            <span className={css.spanClick} onClick={()=>editButton(id)}><i className="tiny material-icons">create</i></span>
            <span className={css.spanClick} onClick={()=>removeButton(id)} name="nome"><i className="tiny material-icons">delete</i></span>
          </div>  
        </div>
      </div>

  
    // <div className="row">
    //   <div className={css.flexRow+' '+css.centerH}>
    //     <div className={css.firsPart}>
    //       <div><span>01</span></div>
    //         <div className={css.column}>
    //           <div>Lazer</div>
    //           <div>Táxi para o aeroporto</div>
    //         </div>
    //     </div>
    //     <div className={css.secondPart}>
    //       <div>
    //         <span>R$700,00</span>
    //       </div>
    //       <div>
    //         <span><i class="material-icons">create</i></span>
    //         <span><i class="material-icons">delete</i></span>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}