using System.Security.Cryptography;
using System.Text;

namespace SecureNotesApp.Services
{
    public class EncryptionService
    {
        // ✅ Asegúrate que esta clave tenga exactamente 32 caracteres (para AES-256)
        private readonly string key = "EstaEsUnaClaveSegura123456789012";

        public string Encrypt(string input)
        {
            using var aes = Aes.Create();

            // 🔐 Validación de longitud segura
            var keyBytes = Encoding.UTF8.GetBytes(key);
            if (keyBytes.Length != 32)
                throw new ArgumentException("La clave debe tener exactamente 32 caracteres para AES-256.");

            aes.Key = keyBytes;
            aes.GenerateIV();

            using var ms = new MemoryStream();
            ms.Write(aes.IV, 0, aes.IV.Length); // Guardamos IV al inicio del stream

            using var cs = new CryptoStream(ms, aes.CreateEncryptor(), CryptoStreamMode.Write);
            using var sw = new StreamWriter(cs);
            sw.Write(input);

            return Convert.ToBase64String(ms.ToArray());
        }

        public string Decrypt(string cipher)
        {
            var fullCipher = Convert.FromBase64String(cipher);

            using var aes = Aes.Create();
            var keyBytes = Encoding.UTF8.GetBytes(key);
            if (keyBytes.Length != 32)
                throw new ArgumentException("La clave debe tener exactamente 32 caracteres para AES-256.");

            aes.Key = keyBytes;
            aes.IV = fullCipher.Take(16).ToArray();
            var encryptedData = fullCipher.Skip(16).ToArray();

            using var ms = new MemoryStream(encryptedData);
            using var cs = new CryptoStream(ms, aes.CreateDecryptor(), CryptoStreamMode.Read);
            using var sr = new StreamReader(cs);

            return sr.ReadToEnd();
        }
    }
}
