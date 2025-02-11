const multer = require('multer');
const path = require('path');
const fs = require('fs');
const createFolder = (folder) => {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
  };
// Fungsi untuk menentukan kategori berdasarkan jenis file
const getCategory = (fileExtension) => {
    const imageTypes = ['jpg', 'jpeg', 'png'];
    const documentTypes = ['pdf', 'doc', 'docx', 'txt'];
    const videoTypes = ['mp4', 'avi', 'mkv'];
  
    if (imageTypes.includes(fileExtension)) {
      return 'images';
    } else if (documentTypes.includes(fileExtension)) {
      return 'document';
    } else if (videoTypes.includes(fileExtension)) {
      return 'video';
    } else {
      return 'other';
    }
  };

  // Fungsi untuk memfilter jenis file yang boleh di-upload
const fileFilter = (req, file, cb) => {
    // Tentukan file yang boleh di-upload (berdasarkan ekstensi atau MIME type)
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']; // Hanya izinkan JPG, PNG, dan PDF
  
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);  // File diterima
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and PDF files are allowed.'), false);  // File ditolak
    }
  };

// Fungsi untuk membuat lokasi penyimpanan file secara dinamis
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Dapatkan ekstensi file
    const fileExtension = path.extname(file.originalname).slice(1).toLowerCase(); // contoh: 'jpg', 'pdf', dll.

    // Tentukan kategori file
    const fileType = getCategory(fileExtension);

    // Tentukan tanggal saat ini
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    
    // Path dinamis berdasarkan kategori file dan tanggal
    const uploadPath = path.join('public', fileType, `${year}-${month}-${day}`);

    // Buat folder jika belum ada
    createFolder(uploadPath);

    // Kirim path penyimpanan
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const fileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  }
});

// Fungsi untuk menginisialisasi multer
const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }
 });

module.exports = upload;
