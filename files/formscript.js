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
  var char_set = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789:/.=?_-& ';
  var key = 'mJwv0SDZCPdCJ5yQMGhE';
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



String.prototype.replaceAll = function(f,r){return this.split(f).join(r);};


function getCard(inp) {
	//document.getElementById("Image").src = "https://quohat.pythonanywhere.com/inscard-files/blank.png";
  var card_link = "https://quohat9.pythonanywhere.com/inscard-pro?inp="+inp;
	var request = makeHttpObject();
        request.open("GET", card_link, true);
        request.send(null);
        request.onreadystatechange = function() {
          if (request.readyState == 4){
            var photo_url = request.responseText;
            if (photo_url.includes("png")) {
							document.getElementById("Image").width = 600;
							document.getElementById("Image").src = photo_url;
							document.getElementById("imgdl").href = photo_url;
            } else {
                alert(photo_url);
            }
          }
        }
    }



function getJson(username, photo_url) {
  var pro_url = 'https://www.instagram.com/'+username+'/?__a=1';
  var request = makeHttpObject();
  request.open("GET", pro_url, true);
  request.send(null);
  request.onreadystatechange = function() {
    if (request.readyState == 4){
      var form_inp = document.getElementById('insurl').value;
      var html = request.responseText;
			var data = JSON.parse(html);
      var personname = data.graphql.user.full_name;
      var posts =  data.graphql.user.edge_owner_to_timeline_media.count;
      var pro_pic_url = data.graphql.user.profile_pic_url;
      var followers = data.graphql.user.edge_followed_by.count;
      var following = data.graphql.user.edge_follow.count;
      var dump = photo_url+'...'+pro_pic_url+'...'+username+'...'+posts+'...'+followers+'...'+following+'...'+form_inp;
      dump = dump.replaceAll('&', '---');
      getCard(encrypt(dump)+'...'+personname);
    }
  }
}


function aha() {
    var url = document.getElementById('insurl').value;
    if (url.length == 0){
        alert('Bạn phải dán link!');
        return;
    }
    if (url.split('/p/')[1].split('/')[0].length >= 15) {
        alert('Có vẻ như ảnh thuộc tài khoản riêng tư, hãy thử ảnh của tài khoản công khai nhé!');
        return;
    }

    document.getElementById("Image").height = 100;
	document.getElementById("Image").width = 289;
	document.getElementById("Image").src = "https://quohat9.pythonanywhere.com/inscard-files/loading.gif";
  var request = makeHttpObject();
    request.open("GET", url, true);
    request.send(null);
    request.onreadystatechange = function() {
      if (request.readyState == 4){
        var photo_url = '';
        var username = '';
        var html = request.responseText;
        reg = /(?:^|)og:image" content="(.*?)"(?:\W|$)/g;
        photo_url = html.match(reg);
        photo_url = photo_url[0];
        photo_url = photo_url.slice(19, photo_url.length-2);
				//---------------------------------
        html = html.slice(html.indexOf('</title>'), html.length);
        reg = /@.*? /g;
        username = html.match(reg);
        username = username[0];
        if (username.includes(')')) {
            username = username.slice(1, username.length-2);
        } else {
            username = username.slice(1, username.length-1);
        }
        //---------------------------------
        getJson(username, photo_url);
    	}
    }
}

