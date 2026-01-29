const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const session = require('express-session');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'crypto-app-secret-key-2024',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 jam
}));

// Inisialisasi Database
const db = new sqlite3.Database('./crypto_app.db', (err) => {
    if (err) {
        console.error('Error membuka database:', err);
    } else {
        console.log('Database terhubung');
        initDatabase();
    }
});

// Membuat tabel
function initDatabase() {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS encryption_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        algorithm TEXT NOT NULL,
        operation TEXT NOT NULL,
        original_text TEXT NOT NULL,
        result_text TEXT NOT NULL,
        key_used TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )`);
}

// Middleware untuk cek login
function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        next();
    } else {
        res.status(401).json({ success: false, message: 'Silakan login terlebih dahulu' });
    }
}

// Route Register
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.json({ success: false, message: 'Semua field harus diisi' });
    }

    if (password.length < 6) {
        return res.json({ success: false, message: 'Password minimal 6 karakter' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        db.run(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword],
            function(err) {
                if (err) {
                    if (err.message.includes('UNIQUE')) {
                        return res.json({ success: false, message: 'Username atau email sudah terdaftar' });
                    }
                    return res.json({ success: false, message: 'Terjadi kesalahan saat registrasi' });
                }
                res.json({ success: true, message: 'Registrasi berhasil!' });
            }
        );
    } catch (error) {
        res.json({ success: false, message: 'Terjadi kesalahan server' });
    }
});

// Route Login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.json({ success: false, message: 'Username dan password harus diisi' });
    }

    db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
        if (err) {
            return res.json({ success: false, message: 'Terjadi kesalahan server' });
        }

        if (!user) {
            return res.json({ success: false, message: 'Username atau password salah' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if (!isValidPassword) {
            return res.json({ success: false, message: 'Username atau password salah' });
        }

        req.session.userId = user.id;
        req.session.username = user.username;
        res.json({ success: true, message: 'Login berhasil!', username: user.username });
    });
});

// Route Logout
app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.json({ success: true, message: 'Logout berhasil' });
});

// Route Cek Session
app.get('/api/check-session', (req, res) => {
    if (req.session.userId) {
        res.json({ 
            authenticated: true, 
            username: req.session.username 
        });
    } else {
        res.json({ authenticated: false });
    }
});

// Route Enkripsi/Dekripsi
app.post('/api/crypto', isAuthenticated, (req, res) => {
    const { algorithm, operation, text, key } = req.body;

    if (!algorithm || !operation || !text || !key) {
        return res.json({ success: false, message: 'Semua field harus diisi' });
    }

    let result;
    try {
        if (algorithm === 'aes') {
            result = operation === 'encrypt' ? encryptAES(text, key) : decryptAES(text, key);
        } else if (algorithm === 'vigenere') {
            result = operation === 'encrypt' ? encryptVigenere(text, key) : decryptVigenere(text, key);
        } else {
            return res.json({ success: false, message: 'Algorithm tidak valid' });
        }

        // Simpan ke history
        db.run(
            'INSERT INTO encryption_history (user_id, algorithm, operation, original_text, result_text, key_used) VALUES (?, ?, ?, ?, ?, ?)',
            [req.session.userId, algorithm.toUpperCase(), operation, text, result, key],
            function(err) {
                if (err) {
                    console.error('Error menyimpan history:', err);
                }
            }
        );

        res.json({ success: true, result: result });
    } catch (error) {
        res.json({ success: false, message: 'Error: ' + error.message });
    }
});

// Route Get History
app.get('/api/history', isAuthenticated, (req, res) => {
    db.all(
        'SELECT * FROM encryption_history WHERE user_id = ? ORDER BY created_at DESC LIMIT 50',
        [req.session.userId],
        (err, rows) => {
            if (err) {
                return res.json({ success: false, message: 'Error mengambil history' });
            }
            res.json({ success: true, data: rows });
        }
    );
});

// Route Delete History
app.delete('/api/history/:id', isAuthenticated, (req, res) => {
    const historyId = req.params.id;
    
    db.run(
        'DELETE FROM encryption_history WHERE id = ? AND user_id = ?',
        [historyId, req.session.userId],
        function(err) {
            if (err) {
                return res.json({ success: false, message: 'Error menghapus history' });
            }
            res.json({ success: true, message: 'History berhasil dihapus' });
        }
    );
});

// Route Clear All History
app.delete('/api/history', isAuthenticated, (req, res) => {
    db.run(
        'DELETE FROM encryption_history WHERE user_id = ?',
        [req.session.userId],
        function(err) {
            if (err) {
                return res.json({ success: false, message: 'Error menghapus history' });
            }
            res.json({ success: true, message: 'Semua history berhasil dihapus' });
        }
    );
});

// Fungsi AES Encryption
function encryptAES(text, key) {
    const keyHash = crypto.createHash('sha256').update(key).digest();
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', keyHash, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
}

// Fungsi AES Decryption
function decryptAES(encryptedText, key) {
    const parts = encryptedText.split(':');
    if (parts.length !== 2) {
        throw new Error('Format enkripsi tidak valid');
    }
    const keyHash = crypto.createHash('sha256').update(key).digest();
    const iv = Buffer.from(parts[0], 'hex');
    const encrypted = parts[1];
    const decipher = crypto.createDecipheriv('aes-256-cbc', keyHash, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// Fungsi Vigenere Encryption
function encryptVigenere(text, key) {
    let result = '';
    let keyIndex = 0;
    const keyUpper = key.toUpperCase();
    
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        
        if (char.match(/[a-z]/i)) {
            const isUpperCase = char === char.toUpperCase();
            const charCode = char.toUpperCase().charCodeAt(0);
            const keyChar = keyUpper[keyIndex % keyUpper.length];
            const keyCode = keyChar.charCodeAt(0);
            const shift = keyCode - 65;
            let encryptedCode = ((charCode - 65 + shift) % 26) + 65;
            let encryptedChar = String.fromCharCode(encryptedCode);
            
            result += isUpperCase ? encryptedChar : encryptedChar.toLowerCase();
            keyIndex++;
        } else {
            result += char;
        }
    }
    
    return result;
}

// Fungsi Vigenere Decryption
function decryptVigenere(text, key) {
    let result = '';
    let keyIndex = 0;
    const keyUpper = key.toUpperCase();
    
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        
        if (char.match(/[a-z]/i)) {
            const isUpperCase = char === char.toUpperCase();
            const charCode = char.toUpperCase().charCodeAt(0);
            const keyChar = keyUpper[keyIndex % keyUpper.length];
            const keyCode = keyChar.charCodeAt(0);
            const shift = keyCode - 65;
            let decryptedCode = ((charCode - 65 - shift + 26) % 26) + 65;
            let decryptedChar = String.fromCharCode(decryptedCode);
            
            result += isUpperCase ? decryptedChar : decryptedChar.toLowerCase();
            keyIndex++;
        } else {
            result += char;
        }
    }
    
    return result;
}

// Route utama
app.get('/', (req, res) => {
    if (req.session.userId) {
        res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
    } else {
        res.sendFile(path.join(__dirname, 'public', 'login.html'));
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});