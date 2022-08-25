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
import updateExpensePhoto from "../api/updateExpensePhoto";

// Internal Component Imports
// import LoadingIndicator from './LoadingIndicator';
import PictureUpload from "./PictureUpload";

// External Imports
import Webcam from "react-webcam";

// Styles Import
import "../styles/EditExpense.css";

const ViewExpenseDetails = ({address, expenseOld, index, data, setData, open, setOpen}) => {
  // State
  const [newProduct, setNewProduct] = useState({
    id: expenseOld.id,
    address: address,
    name: expenseOld.name,
    price: expenseOld.price,
    expense_type: expenseOld.expense_type,
    purchase_source: expenseOld.purchase_source,
    warranty_url: expenseOld.warranty_url,
    description: expenseOld.description,
    photoURL: expenseOld.photoURL,
  });
  const [deleteTxn, setDeleteTxn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgSrc, setImgSrc] = React.useState(null);
  const [photoMode, setPhotoMode] = React.useState("camera");
  const [retakeMode, setRetakeMode] = React.useState(false);
  const [retakeDialog, setRetakeDialog] = useState(false);

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

  // Setup Webcam Component
  const WebcamCapture = () => {
    const FACING_MODE_USER = "user";
    const FACING_MODE_ENVIRONMENT = "environment"
    const [facingMode, setFacingMode] = useState(FACING_MODE_USER);
    const webcamRef = React.useRef(null);

    const flip = React.useCallback(() => {
      setFacingMode(
        prevState =>
          prevState === FACING_MODE_USER
            ? FACING_MODE_ENVIRONMENT
            : FACING_MODE_USER
      );
    }, []);

    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    }, [webcamRef]);

    const reset = () => {
      setImgSrc(null);
    };

    const videoConstraints = {
      facingMode: facingMode,
    };
  
    return (
      <div>
        <center>
        { imgSrc === null 
        ? 
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
        : <img src={imgSrc} alt={"Snapshot Taken"}/>
        }
          { imgSrc === null 
          ? 
          <div>
            <button onClick={(e)=>{ e.preventDefault(); capture();}} className="input" style={{marginRight: "10px"}} >Capture Photo</button>
            <button onClick={(e)=>{ e.preventDefault(); flip();}} className="input">Switch Camera</button>
            <br/>
            <button onClick={(e)=>{ e.preventDefault(); setPhotoMode("upload");}} className="input" style={{marginRight: "10px"}}>Upload Photo</button>
            <button onClick={(e)=>{ e.preventDefault(); setRetakeMode(false);}} className="input">Cancel</button>
          </div> 
          : 
          <div>
            <button onClick={(e)=>{ e.preventDefault(); setRetakeDialog(true);}} className="input">Submit New Photo</button>
            <br/>
            <button onClick={(e)=> { e.preventDefault(); reset();}} className="input"> Retake Photo </button>
            <br/>
            <button onClick={(e)=>{ e.preventDefault(); setRetakeMode(false);}} className="input">Cancel</button>
          </div>
          }
        </center>
      </div>
    );
  };

  const handleRetakeCancel = () => {
    setRetakeDialog(false);
    setRetakeMode(false);
  };  

  const handleRetakeConfirm = async () => {
    setLoading(true);
    try {
      const updatedPhotoURL = await submitRetakePhoto();
      setRetakeDialog(false);
      setRetakeMode(false);
      setImgSrc(null);
      if (updatedPhotoURL){alert("Succesfully updated photo!");}
    } catch (error) {
      alert("Unable to Retake Photo. Please try again or contact support.");
      console.log(error);
    }
    setLoading(false);
  };  

  const submitRetakePhoto = async () => {
    try {
      if (imgSrc) {
        // UPDATE PHOTO AND USE NEW PHOTO URL
        const response = await updateExpensePhoto(address, expenseOld.id, imgSrc);
            console.log(response);
            if (response.status === 200) {
              const updatedExpense = response.data;
              const newPhotoURL = updatedExpense.photoURL
              console.log(newPhotoURL);
              setNewProduct({ ...newProduct, photoURL: newPhotoURL})
              console.log("photoURL has been updated!: " + newPhotoURL);
              setLoading(false);
              return newPhotoURL;
            }
            else {
              alert("Photo upload failed. Please try again or contact support");
            }
      }
      else {
        alert("No photo taken! Please take a photo and submit again.")
      }
    } catch (error) {
      alert("Unable to update photo, please try again or contact support.")
      console.log("Error")
    }
  };

  const submitUpdatedExpense = async () => {
    setLoading(true);
    try {
      const expense = newProduct;
      console.log("Attempting to update expense...", expense.id);
      const response = await updateExpense(expense);
      console.log(response);
      if (response.status === 201) {
        console.log(response.data)
        const updatedExpense = response.data;
        const dataNew = data;
        dataNew[index] = updatedExpense;
        setData(dataNew);
        alert("Expense updated!");
      }
      else {
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
      else {
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
          { (retakeMode) 
          ? ((photoMode === "camera") && <WebcamCapture/>) || ((photoMode === "upload") && <PictureUpload onPictureSelected={setImgSrc}/>)
          :
            /* Start Form */
            <div>
              <div className="flex_row">
                <button style= {{cursor: 'pointer'}} onClick={() => window.open(`${newProduct.photoURL}`, '_blank')} className="input">View Photo</button>
                <button style= {{cursor: 'pointer'}} onClick={(e)=>{ e.preventDefault(); setRetakeMode(true);}} className="input">Retake Photo</button>
              </div>

              <div className="flex_row">
                <input
                  className="input"
                  type="text"
                  placeholder="Product Name"
                  defaultValue={newProduct.name}
                  onChange={(e) => {
                    setNewProduct({ ...newProduct, name: e.target.value });
                  }}
                />
                <input
                  className="input"
                  type="number"
                  placeholder="Price (USD)"
                  defaultValue={newProduct.price}
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
                  defaultValue={newProduct.expense_type}
                  onChange={(e) => {
                    setNewProduct({ ...newProduct, expense_type: e.target.value });
                  }}
                />
                <input
                  className="input"
                  type="text"
                  placeholder="Purchase Source"
                  defaultValue={newProduct.purchase_source}
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
                  defaultValue={newProduct.warranty_url}
                  onChange={(e) => {
                    setNewProduct({ ...newProduct, warranty_url: e.target.value });
                  }}
                />
              </div>      
              <textarea
                className="text_area"
                placeholder="Description here..."
                defaultValue={newProduct.description}
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
            // End Form
          }
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
      {/* Retake Photo Dialog  */}
      <Dialog
        open={retakeDialog}
        onClose={handleRetakeCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Retake Photo"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to submit this photo? The original photo will be lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRetakeCancel} disabled={loading}>Cancel</Button>
          <Button onClick={handleRetakeConfirm} disabled={loading} autoFocus>
          { loading ? "Updating Photo..." : "Confirm"}  
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ViewExpenseDetails