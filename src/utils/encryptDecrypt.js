import CryptoJS from 'crypto-js';

const secretKey = import.meta.env.VITE_ENCRYPTION_SECRET_KEY?.toString() || '';
const  encrypt = (data) => {   
    return CryptoJS.AES.encrypt(data, secretKey).toString();
}

const  decrypt = (data) => {
    const bytes  = CryptoJS.AES.decrypt(data, secretKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}

export { encrypt, decrypt }