const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const generateAndSaveQRCode = async (userId) => {
  try {
    const qrDir = path.join(__dirname, '../qrCodes');
    if (!fs.existsSync(qrDir)) fs.mkdirSync(qrDir);

    const filePath = path.join(qrDir, `${userId}.png`);

    await QRCode.toFile(filePath, String(userId), {
      errorCorrectionLevel: 'H',
      width: 300,
      margin: 1,
    });

    const link = `http://localhost:8080/qrcodes/${userId}.png`;
    return link;
  } catch (error) {
    console.error('QR Code generation failed:', error.message);
    return null;
  }
};

module.exports = { generateAndSaveQRCode };
