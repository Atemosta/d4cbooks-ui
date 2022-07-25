import axios from 'axios';
import getApiEndPoint from './getApiEndPoint';

async function getExpenses(address){
  const apiURL = getApiEndPoint() + '/expenses?address=' + address;
  try {
    var appData; 
    await axios({
      method: 'get',
      url: apiURL,
      headers: {
      "Content-Type" : "application/json",
      },
    })
    .then(response => appData = response.data)
    return appData
  } catch (error) {
    console.log(error.response);
    return []
  }
};

export default getExpenses;