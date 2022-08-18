import axios from 'axios';
import getApiEndPoint from './getApiEndPoint';

async function updateExpense(newExpenseData){
  const apiURL = getApiEndPoint() + '/expense';
  console.log(newExpenseData);
  try {
    var apiResponse; 
    await axios({
      method: 'patch',
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

export default updateExpense;