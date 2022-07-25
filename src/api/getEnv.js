const getEnv = () => {
  if (typeof window !== 'undefined') {
    if (window.location.href.includes('d4cbooks.atemosta.com')) {
      return 'prod';
    // } else if (window.location.href.includes('qa.atemosta')) {
    //   return 'qa';
    // }
    // else if (window.location.href.includes('dev.atemosta')) {
    //   return 'dev';
    // }
    } else {
      return 'local';
    }
  }
};

export default getEnv;