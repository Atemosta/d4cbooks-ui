import React, { useState } from "react";
import Webcam from "react-webcam";
import styles from "../styles/CreateExpense.css";
// import { SLS_URL } from '../config';

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
    const webcamRef = React.useRef(null);
    
    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    }, [webcamRef]);

    const reset = () => {
      setImgSrc(null);
    };

    const videoConstraints = {
      facingMode: { exact: "environment" }
    };
  
    return (
      <div>
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
        <center>
          { imgSrc === null 
          ? <button onClick={(e)=>{ e.preventDefault(); capture();}} className={styles.input}>Capture Photo</button>
          : <button onClick={(e)=> { e.preventDefault(); reset();}} className={styles.input}> Retake Photo </button>
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
    <div className={styles.create_expense_container}>
      <div className={styles.create_product_form}>
        <header className={styles.header}>
          <h1>📝 Create New Expense</h1>
        </header>

        <div className={styles.form_container}>
          
          <WebcamCapture/>

          <div className={styles.flex_row}>
            <input
              className={styles.input}
              type="text"
              placeholder="Product Name"
              onChange={(e) => {
                setNewProduct({ ...newProduct, name: e.target.value });
              }}
            />
            <input
              className={styles.input}
              type="number"
              placeholder="Price (USD)"
              onChange={(e) => {
                setNewProduct({ ...newProduct, price: e.target.value });
              }}
            />
          </div>
          
          <div className={styles.flex_row}>
            <input
              className={styles.input}
              type="text"
              placeholder="Expense Type"
              onChange={(e) => {
                setNewProduct({ ...newProduct, expense_type: e.target.value });
              }}
            />
            <input
              className={styles.input}
              type="text"
              placeholder="Purchase Source"
              onChange={(e) => {
                setNewProduct({ ...newProduct, purchase_source: e.target.value });
              }}
            />
          </div>
          
          <button
            className={styles.button}
            onClick={() => {
              createExpense();
            }}
            disabled={loading}
          >
            Create Expense
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateExpense;