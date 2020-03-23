function makeHttpObject() {
  try {return new XMLHttpRequest();}
  catch (error) {}
  try {return new ActiveXObject("Msxml2.XMLHTTP");}
  catch (error) {}
  try {return new ActiveXObject("Microsoft.XMLHTTP");}
  catch (error) {}

  throw new Error("Could not create HTTP request object.");
}



function encrypt(plaintext) {
	var char_set = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789:/.=?_-';
	var key = 'h';
	key = key.concat('o');
	key = key.concat('c');
	key = key.concat('h');
	key = key.concat('i');
	key = key.concat('m');
	key = key.concat('i');
	key = key.concat('n');
	key = key.concat('h');

  var pen = [];
  var ken = [];

  for(var i = 0; i < plaintext.length; i++) {
    pen[i] = char_set.indexOf(plaintext[i]);
  }
	for(var i = 0; i < key.length; i++) {
    ken[i] = char_set.indexOf(key[i]);
  }
  while (ken.length < pen.length) {
         ken = ken.concat(ken);
         }
  var encrypted = '';
  for(var i = 0; i < plaintext.length; i++) {
    encrypted = encrypted + (pen[i] ^ ken[i]).toString() + ' ';
  }
  return encrypted;
}



function getCard() {
	document.getElementById("Image").height = 100;
	document.getElementById("Image").width = 289;
	document.getElementById("Image").src = "https://cdn.dribbble.com/users/133424/screenshots/3708293/animacia3.gif";

	var cl = document.getElementById('insurl').value;
        var card_link = "https://quohat.pythonanywhere.com/inscard-pro?link="+encrypt(cl);

	var request = makeHttpObject();
        request.open("GET", card_link, true);
        request.send(null);
        request.onreadystatechange = function() {
          if (request.readyState == 4){
            var card_url = request.responseText;
            if (card_url.includes("png")) {
			document.getElementById("Image").width = 600;
			document.getElementById("Image").src = card_url;
			document.getElementById("imgdl").href = card_url;
			document.getElementById("noticeonios").innerHTML = "Trên các thiết bị iOS, hãy thử một hoặc vài cách sau để lưu ảnh với chất lượng cao nhất: 0) Nhấn vào ảnh. 1) Chạm và giữ nếu từ iphone 6 trở xuống. 2) Tắt block pop-up của Safari.  3) Tắt 3D touch.";
            } else {
                alert(card_url);
            }
          }
        };
    }
