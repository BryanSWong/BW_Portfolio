var public_key = "0da95040a439aded19c7038ed9698074";
var private_key = "cf2439902d6e71a59e53978ca96d05ce8f40af82";



//Get the current timestamp.
function getCurrentTimeStamp() {
	return Date.now();
}


function getHashToken(public_key, private_key, timeStamp) {
	
	var hash = CryptoJS.MD5(timeStamp+private_key+public_key).toString();
	//var hashToken = hash.toString(CryptoJS.enc.Hex);

	return hash;
}

// credit to Mirza Shiraz Baig for function call.
function getCharData(x) {


	var timeStamp = getCurrentTimeStamp();

	var hash = getHashToken(public_key, private_key, timeStamp);

	return JSON.parse($.ajax({
		type: 'GET',
		url: "http://gateway.marvel.com:80/v1/public/characters?ts="+timeStamp+"&name="+x+"&apikey="+public_key+"&hash="+hash,
		dataType: 'json',
		global: false,
		async: false,
		success: function(data) {
			return data;
		}
	}).responseText);

}

	var results = getCharData().data.results[0];

$(function(){

	$('#submit').on('click', function(){

		var name = $('#input').val();
		console.log(name);
		var info = getCharData(name).data.results[0];

		var imageSize = "/portrait_incredible.";
		var extension = info.thumbnail.extension;
		var url = info.thumbnail.path+imageSize+extension;

		document.getElementById("image").setAttribute("src",url);

		document.getElementById("name").innerHTML = "Name: " + info.name;

		document.getElementById("id").innerHTML = "ID#: " + info.id;

		document.getElementById("desc").innerHTML = info.description;

	});

});


