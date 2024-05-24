const privateKey = 'your-private-key';
const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
