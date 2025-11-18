// Format address to short form (0x1234...5678)
export const formatAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Format timestamp to relative time
export const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const now = Date.now();
  const diff = now - timestamp;
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (seconds < 60) return `${seconds} sec${seconds !== 1 ? 's' : ''} ago`;
  if (minutes < 60) return `${minutes} min${minutes !== 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hr${hours !== 1 ? 's' : ''} ago`;
  if (days < 30) return `${days} day${days !== 1 ? 's' : ''} ago`;
  
  return date.toLocaleDateString();
};

// Format large numbers with commas
export const formatNumber = (num) => {
  if (!num) return '0';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Format ETH value
export const formatEth = (value, decimals = 4) => {
  if (!value) return '0';
  const num = parseFloat(value);
  if (num === 0) return '0';
  if (num < 0.0001) return '< 0.0001';
  return num.toFixed(decimals);
};

// Validate Ethereum address
export const isValidAddress = (address) => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

// Convert Wei to ETH
export const weiToEth = (wei) => {
  return (parseInt(wei) / 1e18).toFixed(6);
};

// Convert Gwei to ETH
export const gweiToEth = (gwei) => {
  return (parseInt(gwei) / 1e9).toFixed(9);
};

// Calculate gas cost in ETH
export const calculateGasCost = (gasUsed, gasPrice) => {
  return ((parseInt(gasUsed) * parseInt(gasPrice)) / 1e18).toFixed(6);
};

// Truncate text
export const truncate = (text, length = 50) => {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
};

// Copy to clipboard
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
};

// Get explorer URL
export const getExplorerUrl = (type, value, network = 'mainnet') => {
  const baseUrl = network === 'mainnet' 
    ? 'https://etherscan.io' 
    : `https://${network}.etherscan.io`;
  
  switch (type) {
    case 'tx':
      return `${baseUrl}/tx/${value}`;
    case 'address':
      return `${baseUrl}/address/${value}`;
    case 'block':
      return `${baseUrl}/block/${value}`;
    case 'token':
      return `${baseUrl}/token/${value}`;
    default:
      return baseUrl;
  }
};