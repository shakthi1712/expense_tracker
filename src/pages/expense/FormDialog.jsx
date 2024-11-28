import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useAddTransaction } from '../../hooks/useAddTransaction';
import { useState, useRef } from 'react';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const inputRef = useRef(null);
  const { addTransaction } = useAddTransaction();
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState();
  const [transactionType, setTransactionType] = useState("expense");

  return (
    <React.Fragment>
      <button className='bg-[#e9ecef] text-[#000] text-[45px] w-16 h-16 pb-5 rounded-full min-add' onClick={handleClickOpen}> <div className='flex items-center justify-center'>+</div>
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            addTransaction({ description, transactionAmount, transactionType });
            setDescription("");
            setTransactionAmount("");
            inputRef.current.focus();
            handleClose();
          },
        }}
      >
        <DialogTitle className='text-center' >ADD TRANSACTION</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
           
            name="Name"
            label="Name"
            type="Name"
            fullWidth
            id="outlined-basic"l variant="outlined" 
            ref={inputRef} value={description} onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            required
            margin="dense"
            name="Amount"
            label="Amount"
            type="number"
            fullWidth
            id="outlined-basic"l variant="outlined" 
            value={transactionAmount} onChange={(e) => setTransactionAmount(e.target.value)}
          />
          <div className='flex items-center p-4 font-sans justify-center '>
            <input className='' type="radio" id='expense' value="expense" checked={transactionType === "expense"} onChange={(e) => setTransactionType(e.target.value)} />
            <label className='pr-8 text-[15px] text-gray-800 pl-2' htmlFor="expense">Expense</label>
            <input type="radio" id='income' value="income" checked={transactionType === "income"} onChange={(e) => setTransactionType(e.target.value)} />
            <label className='pr-8 text-[15px] text-gray-800 pl-2' htmlFor="income">Income</label>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}