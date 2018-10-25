if (QRCode){
  let el = document.getElementById('qrcode');
  
  if (!el){
    el = document.body.createElement('div');
    el.id = "qrcode";
    // document.body. TODO
  }
  
  
	new QRCode(el, {
	text: location.href,
	width: 128,
	height: 128,
	colorDark : "#000000",
	colorLight : "#ffffff",
	correctLevel : QRCode.CorrectLevel.H
});
}


