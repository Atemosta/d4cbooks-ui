import axios from 'axios';
import getApiEndPoint from './getApiEndPoint';

async function deleteExpense(expense){
  const apiURL = getApiEndPoint() + '/expense';
  console.log(expense);
  try {
    var apiResponse; 
    await axios({
      method: 'delete',
      url: apiURL,
      headers: {
      "Content-Type" : "application/json",
      },
      data: expense,
    })
    .then(response => apiResponse = response)
    return apiResponse
  } catch (error) {
    console.log(error.response);
    return []
  }
};

export default deleteExpense;