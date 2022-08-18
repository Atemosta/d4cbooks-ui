import getEnv from './getEnv';
import { SLS_URL } from '../config';

const environment = getEnv();

const getApiEndPoint = () => {
  return SLS_URL[environment];
};

export default getApiEndPoint;