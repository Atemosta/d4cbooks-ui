import axios from 'axios';
import getApiEndPoint from './getApiEndPoint';

async function updateExpensePhoto(address, expenseId, imageBase64){
  const apiURL = getApiEndPoint() + `/expense/${expenseId}/photo?address=${address}`;
  try {
    var apiResponse; 
    await axios({
      method: 'patch',
      url: apiURL,
      headers: {
      "Content-Type" : "text/plain",
      },
      data: imageBase64,
    })
    .then(response => apiResponse = response)
    return apiResponse
  } catch (error) {
    console.log(error.response);
    return []
  }
};

export default updateExpensePhoto;