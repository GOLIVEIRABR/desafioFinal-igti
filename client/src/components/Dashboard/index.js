import React, {useState, useEffect} from 'react';
import api from '../../api.js';
import Header from './header.js';
import DateSelector from './dateSelector.js';
import InfoHeader from './infoHeader';
import InfoMid from './infoMid';
import InfoTransaction from './infoTransaction';
import ModalAdd from './modalAdd';
import ModalEdit from './modalEdit';
import Spinner from '../../helpers/Spinner';
import {formatNumber} from '../../helpers/formatter';


export default function ControleFinanceiro() {

  const [apiTransactions, setApiTransactions] = useState( [] );
  const [filteredTransactions, setFilteredTransactions] = useState( [] );
  const [filter, setFilter] = useState('');
  const [dateFilter, setDateFilter] = useState(
    ()=>{
      const date = new Date();
      const month = date.getMonth()+1;
      const initialDate = month<10?date.getFullYear()+'-'+'0'+month:date.getFullYear()+'-'+month;
      return initialDate;
    }    
  );
  const [recipes, setRecipes] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [balance, setBalance] = useState(0);
  const [modalAddIsOpen, setModalAddIsOpen] = useState(false);
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [activeSpinner, setActiveSpinner] = useState(false);

  async function getTransactions (yearMonth){
    setActiveSpinner(true)
    const response = await api.get('/transaction/findPerMonth?period='+yearMonth);
    const data = response.data;        
    const {transactions} = data;   
    const sorteredTransactions=transactions.sort((a,b)=>a.day-b.day)   
    setApiTransactions(sorteredTransactions);
    filterTransactions(sorteredTransactions, filter); 
    setActiveSpinner(false)   
  } 

  function filterTransactions(transactions, localFilter){
    const filtered = transactions.filter((transaction) => {
      if(transaction.description.toLowerCase().includes(localFilter.toLowerCase())){
        return transaction;
      }else{
        return '';
      }
    });   
    setFilteredTransactions(filtered); 
  }

  const handleSelector = async (event) => {
    setDateFilter(event.target.value);
    const localDateFilter = event.target.value;
    await getTransactions(localDateFilter);
  }

  const handleFilter = (event) => {
    const localFilter = event.target.value;
    setFilter(localFilter);
    filterTransactions(apiTransactions, localFilter);
  }

  const handleButtons = async (event) =>{
    const selector = document.getElementById('select');
    if(event.target.id==='next'){
      if(selector.selectedIndex!==selector.length-1){
        selector.selectedIndex = selector.selectedIndex+1;
        setDateFilter(selector.value);
        await getTransactions(selector.value);
      }
    }else{
      if(selector.selectedIndex!==0){
        selector.selectedIndex = selector.selectedIndex-1;
        setDateFilter(selector.value);
        await getTransactions(selector.value);
      }
    }
  }

  const handleDeleteButton = async (id) =>{
    const response = await api.delete('/transaction?id='+id);
    const {deletedCount} = response.data;
    if(deletedCount>0){
      const newApiTransactions = apiTransactions.filter(transaction => transaction._id !== id);
      setApiTransactions(newApiTransactions);
      const newFilteredTransactions = filteredTransactions.filter(transaction => transaction._id !== id);
      setFilteredTransactions(newFilteredTransactions);
    }
  }

  const handleSaveNewTransaction = async (transaction)=>{
    const response = await api.post('/transaction', transaction);
    if(response.data){
      const savedTransaction = response.data;
      if(savedTransaction.yearMonth===dateFilter){
        const newApiTransactions = [...apiTransactions];
        newApiTransactions.push(savedTransaction);
        setApiTransactions(newApiTransactions); //atualizando ao array base com todos os resultados do mes

        const newFilteredTransactions = [...filteredTransactions];
        newFilteredTransactions.push(savedTransaction);
        newFilteredTransactions.sort((a, b)=> a.day-b.day);
        setFilteredTransactions(newFilteredTransactions); //atualizando o array filtrado com a nova transaction      
      }
      setModalAddIsOpen(false);
    }    
  }

  const handleUpdateTransaction = async (transaction)=>{
    const response = await api.put('/transaction?id='+transaction._id, transaction);
    if(response.data){
      const savedTransaction = response.data;
      if(savedTransaction.yearMonth===dateFilter){
        const newApiTransactions = [...apiTransactions];
        const updateApiTransactionsIndex = newApiTransactions.findIndex((element)=>element._id===transaction._id);
        
        newApiTransactions[updateApiTransactionsIndex] = savedTransaction;

        setApiTransactions(newApiTransactions);


        const newFilteredTransactions = [...filteredTransactions];
        const updateFilteredTransactionsIndex = newFilteredTransactions.findIndex((element)=>element._id===transaction._id)
        newFilteredTransactions[updateFilteredTransactionsIndex] = savedTransaction;

        newFilteredTransactions.sort((a, b)=> a.day-b.day);
        setFilteredTransactions(newFilteredTransactions); //atualizando o array filtrado com a nova transaction      
  
      }
      setModalEditIsOpen(false);
    }
  }

  const handleAddButton = () => {
    setModalAddIsOpen(true);
  }

  const handleEditButton = (id) => {
    const foundedTransaction = filteredTransactions.find(transaction => transaction._id === id);
    setSelectedTransaction(foundedTransaction);
    setModalEditIsOpen(true);
  }

  const handleCloseModalAddButton = () => {
    setModalAddIsOpen(false);
  }

  const handleCloseModalEditButton = () => {
    setModalEditIsOpen(false);
  }

  useEffect(() => {
      (async ()=>{
        setActiveSpinner(true);
        const date = new Date();
        const month = date.getMonth()+1;
        const initialDate = month<10?date.getFullYear()+'-'+'0'+month:date.getFullYear()+'-'+month;
        const response = await api.get('/transaction/findPerMonth?period='+initialDate);
        const data = response.data        
        const {transactions} = data;      
        setApiTransactions(transactions);
        const sorteredTransactions = transactions.sort((a,b)=>a.day-b.day)
        setFilteredTransactions(sorteredTransactions);

      const analitic = transactions.reduce((results, transaction)=>{
        if(transaction.type==='-'){
          results.expenses = results.expenses + transaction.value;
          results.balance = results.balance - transaction.value;
        }else{
          results.recipes = results.recipes + transaction.value;
          results.balance = results.balance + transaction.value;
        }
        return results;
      }, {expenses:0, recipes:0, balance:0});

      setExpenses(analitic.expenses);
      setRecipes(analitic.recipes);
      setBalance(analitic.balance);
      
      setActiveSpinner(false);
    })();
  }, []);

  useEffect(() => { 
    const analitic = filteredTransactions.reduce((results, transaction)=>{
    if(transaction.type==='-'){
      results.expenses = results.expenses + transaction.value;
      results.balance = results.balance - transaction.value;
    }else{
      results.recipes = results.recipes + transaction.value;
      results.balance = results.balance + transaction.value;
    }
    return results;
  }, {expenses:0, recipes:0, balance:0});
    
    setExpenses(analitic.expenses);
    setRecipes(analitic.recipes);
    setBalance(analitic.balance);
  }, [filteredTransactions]);
  
    return (
      <div className="container">  
        <Header/>
        <DateSelector buttons={handleButtons} select={handleSelector} selected = {dateFilter}/>
        <InfoHeader recipes = {recipes} expenses={expenses} balance={balance} quantity = {filteredTransactions.length}/>
        <InfoMid handleAddButton = {handleAddButton} onChange={handleFilter} disabled={filter.length>0?'disabled':''}/>
        {
          activeSpinner===true?<Spinner/>:          filteredTransactions.map((transaction, index)=>{

            return <InfoTransaction
            key = {index}
            id = {transaction._id}
            day = {transaction.day}
            category = {transaction.category}
            description = {transaction.description}
            value = {formatNumber(transaction.value)}
            type = {transaction.type}
            removeButton = {handleDeleteButton}
            editButton = {handleEditButton}
            />
          })
        }
        
 
        <ModalAdd isOpen = {modalAddIsOpen} closeModalButton = {handleCloseModalAddButton} saveNew ={ handleSaveNewTransaction} ></ModalAdd>
        <ModalEdit isOpen = {modalEditIsOpen} closeModalButton = {handleCloseModalEditButton} update={ handleUpdateTransaction} selected={selectedTransaction}></ModalEdit>
      
      </div>
     
    );
}
