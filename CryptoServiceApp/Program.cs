using System;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace CryptoServiceApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("START");

            var service = new CryptoService();
            string plainText = "Cernunnos5064!";
            string encrypted = service.Encrypt(plainText);
            Console.WriteLine($"Encrypted: {encrypted}");

            string decrypted = service.Decrypt(encrypted);
            Console.WriteLine($"Decrypted: {decrypted}");


            Console.WriteLine("END");
            Console.Read();
        }

        static void Test()
        {
            string encrypted = "nOBsUOtEZxF80qM+FnbzCg==";
            string decrypted = "";

            //byte[] key = Encoding.UTF8.GetBytes("8080808080808081"); 
            byte[] key = Encoding.UTF8.GetBytes("veg3fKZS5s7TDKAP");
            //byte[] iv = Encoding.UTF8.GetBytes("8080808080808082"); 
            byte[] iv = Encoding.UTF8.GetBytes("FzyYnk2MZgagc4m9");

            using (var rm = new RijndaelManaged())
            {
                rm.Mode = CipherMode.CBC;
                rm.Padding = PaddingMode.PKCS7;
                rm.FeedbackSize = 128;

                rm.Key = key;
                rm.IV = iv;

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

            Console.WriteLine($"Decrypted: {decrypted}");
        }

        public static byte[] Decrypt(byte[] data, byte[] key, byte[] iv)
        {
            using (Aes algorithm = Aes.Create())
            {
                using (ICryptoTransform decryptor = algorithm.CreateDecryptor(key, iv))
                    return Crypt(data, decryptor);
            }
            
        }

        static byte[] Crypt(byte[] data, ICryptoTransform cryptor)
        {
            MemoryStream m = new MemoryStream();
            using (Stream c = new CryptoStream(m, cryptor, CryptoStreamMode.Write))
                c.Write(data, 0, data.Length);
            return m.ToArray();
        }

        public static string Encrypt(string data, byte[] key, byte[] iv)
        {
            return Convert.ToBase64String(
            Encrypt(Encoding.UTF8.GetBytes(data), key, iv));
        }

        public static byte[] Encrypt(byte[] data, byte[] key, byte[] iv)
        {
            using (Aes algorithm = Aes.Create())
            using (ICryptoTransform encryptor = algorithm.CreateEncryptor(key, iv))
                return Crypt(data, encryptor);
        }

    }
}
