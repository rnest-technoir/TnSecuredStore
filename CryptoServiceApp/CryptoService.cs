using System;
using System.Collections.Generic;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace CryptoServiceApp
{
    public class CryptoService
    {
        private byte[] _iv;
        private byte[] _key;
        public CryptoService()
        {
            _key = Encoding.UTF8.GetBytes("veg3fKZS5s7TDKAP");
            _iv = Encoding.UTF8.GetBytes("FzyYnk2MZgagc4m9");
        }


        private byte[] Crypt(byte[] data, ICryptoTransform cryptor)
        {
            MemoryStream m = new MemoryStream();
            using (Stream c = new CryptoStream(m, cryptor, CryptoStreamMode.Write))
                c.Write(data, 0, data.Length);
            return m.ToArray();
        }

        public string Encrypt(string plainText)
        {
            using (var rm = new RijndaelManaged())
            {
                rm.Mode = CipherMode.CBC;
                rm.Padding = PaddingMode.PKCS7;
                rm.FeedbackSize = 128;

                rm.Key = _key;
                rm.IV = _iv;

                var decryptor = rm.CreateEncryptor(rm.Key, rm.IV);
                var bytes = Crypt(Encoding.UTF8.GetBytes(plainText), decryptor);
                string encoded = Encoding.UTF8.GetString(bytes);
                return Convert.ToBase64String(bytes);
            }
        }

        public string Decrypt(string encrypted)
        {
            string decrypted = "";
            using (var rm = new RijndaelManaged())
            {
                rm.Mode = CipherMode.CBC;
                rm.Padding = PaddingMode.PKCS7;
                rm.FeedbackSize = 128;

                rm.Key = _key;
                rm.IV = _iv;

                var decryptor = rm.CreateDecryptor(rm.Key, rm.IV);

                try
                {
                    using (var ms = new MemoryStream(Convert.FromBase64String(encrypted)))
                    {
                        using (var csDecrypt = new CryptoStream(ms, decryptor, CryptoStreamMode.Read))
                        {

                            using (var sr = new StreamReader(csDecrypt))
                            {
                                decrypted = sr.ReadToEnd();

                            }

                        }
                    }
                }
                catch
                {
                    decrypted = "keyError";
                }
            }
            return decrypted;
        }
    }
}
