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
import updateExpense from "../api/updateExpense";

// Styles Import
import "../styles/EditExpense.css";

const ViewExpenseDetails = ({data, setData, open, setOpen}) => {
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

  const handleDeleteConfirm = () => {
    try {
      deleteExpense();
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
    expense.id = data.id;

    // Set Updated Expense with Default Values
    if (data.name && !expense.name){expense.name = data.name}
    if (data.price && !expense.price){expense.price = data.price}
    if (data.expense_type && !expense.expense_type){expense.expense_type = data.expense_type}
    if (data.purchase_source && !expense.purchase_source){expense.purchase_source = data.purchase_source}
    if (data.warranty_url && !expense.warranty_url){expense.warranty_url = data.warranty_url}
    if (data.description && !expense.description){expense.description = data.description}
    
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
      if (response.status === 200) {
        console.log(response);
        const updatedExpense = response.data;
        setData(updatedExpense);
        alert("Expense updated!");
      }
      else{
        alert("Unable to update expense: ", data.error);
      }

    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const deleteExpense = async () => {
    var expenseId = data.id;
    try {
      console.log("Attempting to delete expense...", expenseId);
      const response = await fetch("../api/deleteExpenseLocal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id: expenseId}),
      });
      const data = await response.json();
      if (response.status === 200) {
        alert("Expense deleted!");
        console.log(response);
        const updatedExpense = response.data;
        const dataNew = data;
        dataNew.push(updatedExpense);
        setData(dataNew);
      }
      else{
        alert("Unable to delete expense: ", data.error);
      }

    } catch (error) {
      console.log(error);
    }
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
            <div className="flex_row">
              <input
                className="input"
                type="text"
                placeholder="Product Name"
                defaultValue={data.name}
                onChange={(e) => {
                  setNewProduct({ ...newProduct, name: e.target.value });
                }}
              />
              <input
                className="input"
                type="number"
                placeholder="Price (USD)"
                defaultValue={data.price}
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
                defaultValue={data.expense_type}
                onChange={(e) => {
                  setNewProduct({ ...newProduct, expense_type: e.target.value });
                }}
              />
              <input
                className="input"
                type="text"
                placeholder="Purchase Source"
                defaultValue={data.purchase_source}
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
                defaultValue={data.warranty_url}
                onChange={(e) => {
                  setNewProduct({ ...newProduct, warranty_url: e.target.value });
                }}
              />
            </div>      
            <textarea
              className="text_area"
              placeholder="Description here..."
              defaultValue={data.description}
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
              Update Expense
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
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ViewExpenseDetails