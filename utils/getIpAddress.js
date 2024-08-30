const getIPv4Address = (ip) => {
  if (ip === '::1') {
    return '127.0.0.1';
  }

  if (ip.includes(':')) {
    return ip.split(':').pop();
  }

  return ip;
};

module.exports = { getIPv4Address };
