import axios from 'axios';
import getApiEndPoint from './getApiEndPoint';

async function getExpense(itemId){
  const apiURL = getApiEndPoint() + '/expense/' + itemId;
  try {
    var appData; 
    await axios({
      method: 'get',
      url: apiURL,
      headers: {
      "Content-Type" : "application/json",
      },
      data: {},
    })
    .then(response => appData = response.data.Items[0])
    return appData
  } catch (error) {
    console.log(error.response);
    return {}
  }
};

export default getExpense;