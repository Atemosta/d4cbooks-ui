import React, { useState } from "react";
import Webcam from "react-webcam";
import "../styles/CreateExpense.css";

const CreateExpense = ({address, data, setData}) => {
  const FACING_MODE_USER = "user";
  const FACING_MODE_ENVIRONMENT = "environment"
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

  const createExpense = async () => {
    setLoading(true);
    try {
      // Combine expense data and file.name
      const expense = {...newProduct };
      expense.address = address;
      const dataNew = data;
      // const response = await fetch("../api/addExpenseLocal", { // Local
      const response1 = await fetch("../api/addExpenseSLS", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expense),
      });
      const data1 = await response1.json();
      console.log(data1.id)
      // If Expense Details created successfully, append image
      if (response1.status === 201) {
        const response2 = await fetch(`../api/updateExpensePhotoSLS?id=${data1.id}&address=${address}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "text/plain",
          },
          // body: JSON.stringify({
          //   id: id,
          //   address: address,
          //   image: imgSrc
          // }),
          body: imgSrc,
        });
        const data2 = await response2.json();
        if (response2.status === 200) {
          alert("Product added!");
          dataNew.push(expense);
          setData(dataNew);
          setNewProduct({
            name: "",
            price: "",
            expense_type: "",
            purchase_source: "",
          })
        }
        else {
          alert("Expense data added, but photo upload failed. Please try again.", data2.error);
        }
      }
      else{
        alert("Unable to add expense: ", data1.error);
      }

    } catch (error) {
      console.log(error);
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
            onClick={() => {
              createExpense();
            }}
            disabled={loading}
          >
            { loading ? "Submitting Expense..." : "Create Expense" } 
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateExpense;