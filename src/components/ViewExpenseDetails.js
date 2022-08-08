// Dialog Imports
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';

// API Import
import deleteExpense from '../api/deleteExpense';
import updateExpense from "../api/updateExpense";

// Component Imports
// import LoadingIndicator from './LoadingIndicator';

// Styles Import
import "../styles/EditExpense.css";

const ViewExpenseDetails = ({address, expenseOld, index, data, setData, open, setOpen}) => {
  // State
  const [newProduct, setNewProduct] = useState({
    // name: "",
    // price: "",
    // expense_type: "",
    // purchase_source: "",
    // warranty_url: "",
    // description: "",
  });
  const [deleteTxn, setDeleteTxn] = useState(false);
  const [loading, setLoading] = useState(false);

  // Functions
  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteTxn(false);
  };  

  const handleDeleteConfirm = async () => {
    try {
      await submitDeleteExpense();
      setDeleteTxn(false);
      setOpen(false);
    } catch (error) {
      console.log("Unable to Delete Expense: " + error)
    }
  };  

  const submitUpdatedExpense = async () => {
    setLoading(true);
    // Initial values
    const expense = newProduct;
    expense.id = expenseOld.id;
    expense.address = address;

    // Set Updated Expense with Default Values
    if (expenseOld.name && !expense.name){expense.name = expenseOld.name}
    if (expenseOld.price && !expense.price){expense.price = expenseOld.price}
    if (expenseOld.expense_type && !expense.expense_type){expense.expense_type = expenseOld.expense_type}
    if (expenseOld.purchase_source && !expense.purchase_source){expense.purchase_source = expenseOld.purchase_source}
    if (expenseOld.warranty_url && !expense.warranty_url){expense.warranty_url = expenseOld.warranty_url}
    if (expenseOld.description && !expense.description){expense.description = expenseOld.description}
    
    // If no default values provided, supply default value
    if (!expense.name){expense.name = ""}
    if (!expense.price){expense.price = ""}
    if (!expense.expense_type){expense.expense_type = ""}
    if (!expense.purchase_source){expense.purchase_source = ""}
    if (!expense.warranty_url){expense.warranty_url = ""}
    if (!expense.description){expense.description = ""}

    try {
      console.log("Attempting to update expense...", expense.id);
      const response = await updateExpense(expense);
      console.log(response);
      if (response.status === 201) {
        const updatedExpense = response.data;
        const dataNew = data;
        dataNew[index] = updatedExpense;
        setData(dataNew);
        alert("Expense updated!");
      }
      else{
        alert("Unable to update expense");
      }

    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const submitDeleteExpense = async () => {
    // Disable the Trigger Buttons
    setLoading(true);

    // Initial values
    const expense = newProduct;
    const id = expenseOld.id;
    expense.id = id;
    expense.address = address;    
    try {
      console.log("Attempting to delete expense...", id);
      const response = await deleteExpense(expense);
      console.log(response);
      if (response.status === 200) {
        const dataNew = data;
        console.log("dataNew preslice")
        console.log(dataNew);
        dataNew.splice(index, 1); // Removes item located at index and mutates array 
        console.log("dataNew postslice")
        console.log(dataNew);
        setData(dataNew);
        alert(`Expense deleted!`);
      }
      else{
        alert("Unable to delete expense");
      }

    } catch (error) {
      console.log(error);
    }

    // Reenable the Trigger Buttons
    setLoading(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
        <div className="create_product_container">
        <div className="create_product_form">
          <header>
            <div style={{ backgroundColor: "#6495ED", textAlign: "center", fontSize: "25px", fontWeight: "450",padding: "10px 10px 10px 10px"}}>Update Transaction Details
              <Tooltip title="Delete Transaction">
                <IconButton onClick={() => setDeleteTxn(true)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </div>

          </header>

          <div className="form_container">

            {/* <img
              src={expenseOld.photoURL}
              alt="Snapshot of Receipt"
            /> */}
            <div className="flex_row">
              <button onClick={() => window.open(`${expenseOld.photoURL}`, '_blank')} className="input">View Photo</button>
              <button onClick={(e)=>{ e.preventDefault(); console.log("noms");}} className="input">Retake Photo</button>
            </div>

            <div className="flex_row">
              <input
                className="input"
                type="text"
                placeholder="Product Name"
                defaultValue={expenseOld.name}
                onChange={(e) => {
                  setNewProduct({ ...newProduct, name: e.target.value });
                }}
              />
              <input
                className="input"
                type="number"
                placeholder="Price (USD)"
                defaultValue={expenseOld.price}
                onChange={(e) => {
                  setNewProduct({ ...newProduct, price: e.target.value });
                }}
              />
            </div>
            
            <div className="flex_row">
              <input
                className="input"
                type="text"
                placeholder="Expense Type"
                defaultValue={expenseOld.expense_type}
                onChange={(e) => {
                  setNewProduct({ ...newProduct, expense_type: e.target.value });
                }}
              />
              <input
                className="input"
                type="text"
                placeholder="Purchase Source"
                defaultValue={expenseOld.purchase_source}
                onChange={(e) => {
                  setNewProduct({ ...newProduct, purchase_source: e.target.value });
                }}
              />
            </div>
            
            <div className="flex_row">
              <input
                className="input"
                type="url"
                placeholder="Warranty URL ex: https://warranty.aftershokz.com/cc/cpSignIn.html"
                defaultValue={expenseOld.warranty_url}
                onChange={(e) => {
                  setNewProduct({ ...newProduct, warranty_url: e.target.value });
                }}
              />
            </div>      
            <textarea
              className="text_area"
              placeholder="Description here..."
              defaultValue={expenseOld.description}
              onChange={(e) => {
                setNewProduct({ ...newProduct, description: e.target.value });
              }}
            />
            <button
              className="button"
              onClick={() => {
                submitUpdatedExpense();
              }}
              disabled={loading}
            >
              { loading ? "Updating Expense..." : "Update Expense"}  
            </button>
            <button
              className="button"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
        </DialogContent>
      </Dialog>     
      {/* Delete Txn Dialog  */}
      <Dialog
        open={deleteTxn}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Transaction"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this transaction? 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} disabled={loading}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} disabled={loading} autoFocus>
          { loading ? "Deleting Expense..." : "Confirm"}  
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ViewExpenseDetails