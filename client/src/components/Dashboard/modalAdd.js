import React from 'react'
import ReactModal from 'react-modal'
import css from './dashboard.module.css'

export default function modal(props) {
  const {isOpen, closeModalButton, saveNew} = props;

  const handleInput = (event) =>{
    const description = document.getElementById('inputDescription');
    const category = document.getElementById('inputCategory');
    const button = document.getElementById('buttonSubmit');
    if(description.value.length>0&&category.value.length>0){
      button.removeAttribute("disabled");
    }else{
      button.setAttribute("disabled","");
    }
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const yearMonthDay = formData.get('inputDate');
    const parts = yearMonthDay.split('-');
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    const yearMonth = year+'-'+month;
    const description = formData.get('inputDescription');
    const value = formData.get('inputValue');
    const category = formData.get('inputCategory');
    const type = formData.get('inputType');
    const transaction = {
        description: description,
        value: value,
        category: category,
        year: year,
        month: month,
        day: day,
        yearMonth: yearMonth,
        yearMonthDay: yearMonthDay,
        type: type      
    }
    saveNew(transaction);
  }

  return (
<ReactModal
      shouldCloseOnOverlayClick={!false}
      isOpen={isOpen}
      ariaHideApp={false}
      style={{
        content: {
          top: '40%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: '#F0F0F5',
          color: '#000000',
          padding: '20px',
          borderWidth:'3px',
          borderStyle: 'solid',
          borderColor: '#26a69a',
          borderRadius: '8px',
          width: '515px',
          border: 'none',
        },
        overlay: {
          backgroundColor: '#121214e6',
          zIndex:1
        },
      }}
    >
      <div>
            <div className={css.flexRow+' '+css.centerH+' '+css.cendered+' '+css.spaceBetween}>
              <h5><strong>Inclusão de Lançamento</strong></h5>
              <button onClick={closeModalButton} className="waves-effect waves-light btn red darken-4">X</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className={css.formModal}> 
                <div className={css.divRadioButtons}>
                  <label>
                    <input name="inputType" id="inputType" type="radio" defaultValue="-" defaultChecked/>
                    <span className={css.modalSpanExpense}>Despesa</span>
                  </label>
                  <label>
                    <input name="inputType" id="inputType2" type="radio" defaultValue="+"/>
                    <span className={css.modalSpanEarning}>Receita</span>
                  </label>
                </div>
                <div className="input-field ">
                  <input onChange={handleInput} name="inputDescription" id="inputDescription" autoComplete="off" type="text" required defaultValue=""/>
                  <label htmlFor="inputDescription" className="active">Descrição:</label>
                </div>
                <div className="input-field ">
                  <input onChange={handleInput} name="inputCategory" id="inputCategory" autoComplete="off" type="text" required defaultValue=""/>
                  <label htmlFor="inputCategory" className="active">Categoria:</label>
                </div>                  
                
                <div className={css.flexRow+' '+css.centerH+' '+css.cendered+' '+css.spaceBetween}>
                  <div className="input-field" style={{marginLeft:'10px'}}>
                    <input name="inputValue" id="inputValue" type="number" min="0" step="0.01" required defaultValue="0"/>
                    <label htmlFor="inputValue" className="active">Valor: </label>
                  </div>
                  <div className="input-field" style={{marginRight:'10px'}}>
                    <input name="inputDate" id="inputDate" placeholder="Data" type="date" className="browser-default"  required defaultValue="2020-09-11"/>
                  </div>
                </div>
              </div>
              <input id="buttonSubmit" disabled type="submit" className="waves-effect waves-light btn" defaultValue="Salvar"></input>
            </form>
          </div>
    </ReactModal>
  )
}

