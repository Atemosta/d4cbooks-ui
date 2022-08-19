// ----- Navbar Pages ----- //
const pages_all = ['About', 'Support'];
const pages = ['Create', 'View'];
const settings = ['Login', 'Account', 'Theme', 'Logout']

// -----  Chain Id Numbers ----- //
// 0x13881 is Polygon Testnet
// 0x89 is Polygon Mainnet
const CHAIN_ID = {
  'local': '0x13881',
  // 'dev': '0x13881',
  // 'qa': '0x13881',
  'prod': '0x89',
}

// -----  RPC Endpoint ----- //
const RPC_ENDPOINT = {
  'local': 'https://rpc-mumbai.matic.today',
  // 'dev': 'https://rpc-mumbai.matic.today',
  // 'qa': 'https://rpc-mumbai.matic.today',
  'prod': 'https://rpc-mainnet.matic.network',
}


// -----  SLS API Endpoints ----- //
const SLS_URL = {
  'local': 'https://a18fff4z64.execute-api.us-east-1.amazonaws.com/dev',
  // 'dev': 'https://a18fff4z64.execute-api.us-east-1.amazonaws.com/dev',
  // 'qa': 'TBD',
  'prod': 'https://upsvvd5b5d.execute-api.us-east-1.amazonaws.com/prod',
}

// ----- SLS API Endpoints ----- //
const WEB3AUTH_CLIENT_ID = {
  'local': 'BOqCiBiWbLsJZl4mtumLTGrTvdJG3NpmF8ZEmbcY8uNx9dm5g-wCgXYBOU7IgEsMQVsACzFT9igoYsfL7d1fjSU',
  // 'dev': 'hBOqCiBiWbLsJZl4mtumLTGrTvdJG3NpmF8ZEmbcY8uNx9dm5g-wCgXYBOU7IgEsMQVsACzFT9igoYsfL7d1fjSU',
  // 'qa': 'BOqCiBiWbLsJZl4mtumLTGrTvdJG3NpmF8ZEmbcY8uNx9dm5g-wCgXYBOU7IgEsMQVsACzFT9igoYsfL7d1fjSU',
  'prod': 'BJrvVXL4GJtfsqiHMwVcwPVNmCZYlIXAdRb2KHciaPwonCkPDr1cwW56yC5QwaUW3irR4_xjrzx9tsooK8w1sGU',
}

export { 
  pages_all, 
  pages, 
  settings, 
  CHAIN_ID, 
  RPC_ENDPOINT,
  SLS_URL, 
  WEB3AUTH_CLIENT_ID 
}
