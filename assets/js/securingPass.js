class Encryption {
    static key = "123456Aa123456Bb";
  
    static encrypt(data) {
      return CryptoJS.AES.encrypt(data, Encryption.key).toString();
    }
  
    static decrypt(encryptedData) {
      const bytes = CryptoJS.AES.decrypt(encryptedData, Encryption.key);
      return bytes.toString(CryptoJS.enc.Utf8);
    }
  }
  