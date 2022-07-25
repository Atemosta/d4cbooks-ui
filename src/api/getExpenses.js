import axios from 'axios';
import getApiEndPoint from './getApiEndPoint';

async function getExpenses(address){
  const apiURL = getApiEndPoint() + '/expenses?address=' + address;
  console.log(apiURL);
  try {
    var appData; 
    await axios({
      method: 'get',
      url: apiURL,
      headers: {
      "Content-Type" : "application/json",
      },
    })
    .then(response => appData = response)
    console.log(appData)
    return appData
  } catch (error) {
    console.log(error.response);
    return []
  }
};

export default getExpenses;