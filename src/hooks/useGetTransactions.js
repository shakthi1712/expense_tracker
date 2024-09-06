import { useEffect } from "react";
import { useState } from "react";
import { query,collection, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from './useGetUserInfo';
export const useGetTransactions=()=>{
    const [transactions,setTransactions]=useState([]);
    const [transactionTotals,setTransactionTotals]=useState({balance:0.00,expense:0.00,income:0.00});
    const {userId}=useGetUserInfo();
    const transactionCollectionRef=collection(db,"transaction");
    const getTransactions= async ()=>{
        let unSubscribe;
        try{
            const queryTransaction=query(transactionCollectionRef,where("userId","==",userId),orderBy("createdAt"))
            onSnapshot(queryTransaction ,(snapshot)=>{
                let docs=[];
                let totalExpense=0;
                let totalIncome=0;
                unSubscribe= snapshot.forEach((doc)=>{
                    const data=doc.data();
                    const id=doc.id;
                    docs.push({...data,id})
                    if(data.transactionType==="expense"){
                        totalExpense+=Number(data.transactionAmount);
                    }
                    else{
                        totalIncome+=Number(data.transactionAmount);
                    }
                })
                setTransactions(docs);
                let balance=totalIncome-totalExpense;
                setTransactionTotals({
                    balance,
                    expense:totalExpense,
                    income:totalIncome
                })
            })
            }
            catch(err){
                console.log(err);
            }
            return ()=>unSubscribe();
    }
    useEffect(()=>{
        getTransactions();
    },[]) 
    return{transactions,transactionTotals}
}