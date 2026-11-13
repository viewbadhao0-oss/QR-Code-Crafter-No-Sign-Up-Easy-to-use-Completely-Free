
/* =========================
   QR CODE CRAFTER
   BY TBOLT
========================= */

const qrText = document.getElementById("qrText");
const qrSize = document.getElementById("qrSize");
const qrColor = document.getElementById("qrColor");

const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");

const qrResult = document.getElementById("qrResult");

let currentQR = null;

/* =========================
   GENERATE QR CODE
========================= */

function generateQRCode() {

    const text = qrText.value.trim();

    if (!text) {
        alert("Please enter some text or a URL first!");
        qrText.focus();
        return;
    }

    if (typeof QRCode === "undefined") {
        alert("QR generator library could not load. Please check your internet connection and try again.");
        return;
    }

    const size = Number(qrSize.value);
    const color = qrColor.value;

    // Clear previous QR code
    qrResult.innerHTML = "";

    // Create QR code container
    const qrContainer = document.createElement("div");

    qrResult.appendChild(qrContainer);

    // Generate new QR code
    currentQR = new QRCode(qrContainer, {
        text: text,
        width: size,
        height: size,
        colorDark: color,
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    // Enable download button
    downloadBtn.disabled = false;
}

/* =========================
   DOWNLOAD QR CODE
========================= */

function downloadQRCode() {

    if (!currentQR) {
        alert("Please generate a QR code first!");
        return;
    }

    const canvas = qrResult.querySelector("canvas");
    const image = qrResult.querySelector("img");

    let imageURL = "";

    if (canvas) {
        imageURL = canvas.toDataURL("image/png");
    } else if (image && image.src) {
        imageURL = image.src;
    }

    if (!imageURL) {
        alert("QR code is not ready yet. Please try again.");
        return;
    }

    const link = document.createElement("a");

    link.href = imageURL;
    link.download = "QR-Code-Crafter.png";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/* =========================
   BUTTON EVENTS
========================= */

generateBtn.addEventListener("click", generateQRCode);

downloadBtn.addEventListener("click", downloadQRCode);

/* =========================
   ENTER KEY SUPPORT
========================= */

qrText.addEventListener("keydown", function(event) {

    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        generateQRCode();
    }

});

/* =========================
   RESET DOWNLOAD STATE
========================= */

qrText.addEventListener("input", function() {

    downloadBtn.disabled = true;

    currentQR = null;

});

/* =========================
   QR SIZE AND COLOR
   AUTO UPDATE
========================= */

qrSize.addEventListener("change", function() {

    if (qrText.value.trim()) {
        generateQRCode();
    }

});

qrColor.addEventListener("input", function() {

    if (qrText.value.trim()) {
        generateQRCode();
    }

});
