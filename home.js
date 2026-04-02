function buildCardUrl() {
  const url = new URL("./card.html", window.location.href);
  return url.toString();
}

function initQrCode() {
  const qrTarget = document.getElementById("qrcode");
  const linkHint = document.getElementById("card-link");
  const cardUrl = buildCardUrl();

  new QRCode(qrTarget, {
    text: cardUrl,
    width: 216,
    height: 216,
    correctLevel: QRCode.CorrectLevel.H
  });

  linkHint.textContent = cardUrl;
}

initQrCode();
