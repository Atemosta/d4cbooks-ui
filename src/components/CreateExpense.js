import React, { useState } from "react";

// External Imports
import Webcam from "react-webcam";

// Internal Imports
import createExpense from "../api/createExpense";
import updateExpensePhoto from "../api/updateExpensePhoto";

// Styles Import
import "../styles/CreateExpense.css";

const CreateExpense = ({address, data, setData}) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    expense_type: "",
    purchase_source: "",
  });
  const [loading, setLoading] = useState(false);
  const [imgSrc, setImgSrc] = React.useState(null);

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
          ? <div>
          <button onClick={(e)=>{ e.preventDefault(); flip();}} className="input">Switch Camera</button>
          <br/>
          <button onClick={(e)=>{ e.preventDefault(); capture();}} className="input">Capture Photo</button>
          </div> 
          : <button onClick={(e)=> { e.preventDefault(); reset();}} className="input"> Retake Photo </button>
          }
        </center>
      </div>
    );
  };

  const submitExpense = async () => {
    setLoading(true);
    if (!newProduct.name || !newProduct.price || !newProduct.expense_type || !newProduct.purchase_source || !imgSrc) {
      alert("Please fill out all fields and capture a photo!");
    } else {
      try {
        // Submit Current Data
        const expense = newProduct;
        expense.address = address;
        console.log(expense);
        const response1 = await createExpense(expense);
        console.log(response1);
        // If Expense Details created successfully, append image
        if (response1.status === 201) {
          const expenseId = response1.data.id;
          const response2 = await updateExpensePhoto(address, expenseId, imgSrc);
          console.log(response2);
          if (response2.status === 200) {
            alert("New expense created!");
            const expenseWithPhotoURL = response2.data;
            const dataNew = data;
            dataNew.push(expenseWithPhotoURL);
            setData(dataNew);
            setNewProduct({
              name: "",
              price: "",
              expense_type: "",
              purchase_source: "",
            })
          }
          else {
            alert("Expense data added, but photo upload failed. Please try again.");
          }
        }
        else{
          alert("Unable to create expense. Please try again.");
        }
      } 
      catch (error) {
        console.log(error);
      } 
    }
    setLoading(false)
  };

  return (
    <div className="create_expense_container">
      <div className="create_product_form">
        <header className="header">
          <div>📝 Create New Expense</div>
        </header>

        <div className="form_container">
          
          <WebcamCapture/>

          <div className="flex_row">
            <input
              className="input"
              type="text"
              placeholder="Expense Name"
              onChange={(e) => {
                setNewProduct({ ...newProduct, name: e.target.value });
              }}
            />
            <input
              className="input"
              type="number"
              placeholder="Price (USD)"
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
              onChange={(e) => {
                setNewProduct({ ...newProduct, expense_type: e.target.value });
              }}
            />
            <input
              className="input"
              type="text"
              placeholder="Purchase Source"
              onChange={(e) => {
                setNewProduct({ ...newProduct, purchase_source: e.target.value });
              }}
            />
          </div>
          
          <button
            className="button"
            onClick={() => submitExpense()}
            disabled={loading}
          >
            { loading ? "Submitting New Expense..." : "Create Expense"}  
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateExpense;