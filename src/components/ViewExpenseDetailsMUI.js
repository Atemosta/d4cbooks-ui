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

// Card Imports
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// Import Styles
import styles from "../styles/EditExpense.css";

const ViewExpenseDetailsMUI = ({data, setData, open, setOpen}) => {
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
  // const [file, setFile] = useState({});
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

  const updateExpense = async () => {
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
      const response = await fetch("../api/updateExpenseLocal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expense),
      });
      const data = await response.json();
      if (response.status === 200) {
        alert("Expense updated!");
        setData(data);
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
        setData(data);
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
          <Card  sx={{ maxWidth: 800 }}>
            <header>
              <h1>Update Transaction Details
                <Tooltip title="Delete Transaction">
                  <IconButton onClick={() => setDeleteTxn(true)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </h1>
            </header>
            <CardMedia
              component="img"
              height="280"
              image="https://d4c-expenses-bucket-a398c7780f-dev.s3.amazonaws.com/0x0fef592988529fd2dcdbe9ef6fbf3bb6a0a21066/cceb67d5-006a-4d77-a492-32a994b51ba8.jpg"
              alt="green iguana"
            />
            <div>
              <div>
                <TextField
                  className='input'
                  type="text"
                  placeholder="Product Name"
                  defaultValue={data.name}
                  onChange={(e) => {
                    setNewProduct({ ...newProduct, name: e.target.value });
                  }}
                />
                <TextField
                  className='input'
                  type="number"
                  placeholder="Price (USD)"
                  defaultValue={data.price}
                  onChange={(e) => {
                    setNewProduct({ ...newProduct, price: e.target.value });
                  }}
                />
              </div>
              
              <div>
                <TextField
                  className='input'
                  type="text"
                  placeholder="Expense Type"
                  defaultValue={data.expense_type}
                  onChange={(e) => {
                    setNewProduct({ ...newProduct, expense_type: e.target.value });
                  }}
                />
                <TextField
                  className='input'
                  type="text"
                  placeholder="Purchase Source"
                  defaultValue={data.purchase_source}
                  onChange={(e) => {
                    setNewProduct({ ...newProduct, purchase_source: e.target.value });
                  }}
                />
              </div>
              
              <div>
                <TextField
                  className='input'
                  type="url"
                  placeholder="Warranty URL ex: https://warranty.aftershokz.com/cc/cpSignIn.html"
                  defaultValue={data.warranty_url}
                  onChange={(e) => {
                    setNewProduct({ ...newProduct, warranty_url: e.target.value });
                  }}
                />
              </div>      

              <br/>
              <TextareaAutosize
                placeholder="Description here..."
                defaultValue={data.description}
                onChange={(e) => {
                  setNewProduct({ ...newProduct, description: e.target.value });
                }}
              />
              <Button
                onClick={() => {
                  updateExpense();
                }}
                disabled={loading}
              >
                Update Expense
              </Button>
              <Button
                onClick={handleClose}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </Card>
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

export default ViewExpenseDetailsMUI