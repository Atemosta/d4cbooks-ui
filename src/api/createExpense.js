import axios from 'axios';
import getApiEndPoint from './getApiEndPoint';

async function createExpense(newExpenseData){
  const apiURL = getApiEndPoint() + '/expense';
  try {
    var apiResponse; 
    await axios({
      method: 'post',
      url: apiURL,
      headers: {
      "Content-Type" : "application/json",
      },
      data: newExpenseData,
    })
    .then(response => apiResponse = response)
    return apiResponse
  } catch (error) {
    console.log(error.response);
    return []
  }
};

export default createExpense;