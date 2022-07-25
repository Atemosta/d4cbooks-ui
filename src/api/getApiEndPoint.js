import getEnv from './getEnv';
const endPoints = {
  // prod: 'TBD',
  // qa: 'TBD',
  dev: 'https://a18fff4z64.execute-api.us-east-1.amazonaws.com/dev',
  local: 'https://a18fff4z64.execute-api.us-east-1.amazonaws.com/dev',
};

const environment = getEnv();

const getApiEndPoint = () => {
  return endPoints[environment];
};

export default getApiEndPoint;