const mongoose = require('mongoose');
const db = require('../models/transactionModel.js');
const ObjectId = mongoose.Types.ObjectId;

const Transaction = db.transactionModel;


const service = {};

service.create = async (req, res) => {
  const transaction = req.body;
  try {
    const data = await Transaction.create(transaction);
    res.send(data);
  } catch (error) {
    res.send('An error has ocurred: '+error);     
  }
} 

service.findPerMonth = async (req, res) => {
  const {period} = req.query;
 
  try {
    if(!period){
      throw new Error('It is necessary to inform the  parameter, whose value must be in the format YYYY-MM');
    }
   
    const transactions = await Transaction.find({yearMonth:period})
    const length = transactions.length;

    const data = { length, transactions };

    res.send(data);    
  } catch (error) {
    res.send('An error has ocurred: '+error); 
  }
} 

service.findOne = async (req, res) => {
  const {id} = req.query;
  try {
    const data = await Transaction.find({_id:id});
    res.send(data);    
  } catch (error) {
    res.send('An error has ocurred: '+error); 
  }
} 

service.put = async (req, res) => {
  const {id} = req.query;
  const transaction = req.body;
  try {
    const data = await Transaction.findByIdAndUpdate({_id:id}, transaction, {new:true});
    res.send(data);
  } catch (error) {
    res.send('An error has ocurred: '+error);  
  }
} 

service.delete = async (req, res) => {
  const {id} = req.query;
  try {
    const data = await Transaction.deleteOne({_id:id});
    res.send(data);
  } catch (error) {
    res.send('An error has ocurred: '+error); 
  }
} 

module.exports = service;