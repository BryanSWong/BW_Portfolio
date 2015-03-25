var public_key = "0da95040a439aded19c7038ed9698074";
var private_key = "cf2439902d6e71a59e53978ca96d05ce8f40af82";

/*
function getCharData(){
	var url = "http://gateway.marvel.com:80/v1/public/characters?name=Captain%20America&apikey="+KEY;
	
	return $.get(url);

}

$(document).ready(function(){

	var info =[]

	info.push(getCharData());

});

<script>
var hash = CryptoJS.MD5("1abcd1234");
console.log(hash);
var hashToken = hash.toString(CryptoJS.enc.Hex);
if(hashToken == "ffd275c5130566a2916217b101f26150") {
 alert("SUCCESS");
}
else {
	alert("FAILURE");
}

</script>
*/

//Get the current timestamp.
function getCurrentTimeStamp() {
	return Date.now();
}

//console.log(getCurrentTimeStamp());



//console.log(timeStamp)

function getHashToken(public_key, private_key, timeStamp) {
	
	var hash = CryptoJS.MD5(timeStamp+private_key+public_key).toString();
	//var hashToken = hash.toString(CryptoJS.enc.Hex);

	return hash;
}



//console.log(getHashToken());

//console.log(hash);


function getCharData() {

	var timeStamp = getCurrentTimeStamp();

	var hash = getHashToken(public_key, private_key, timeStamp);

	var url = "http://gateway.marvel.com:80/v1/public/characters?ts="+timeStamp+"&name=Captain%20America&apikey="+public_key+"&hash="+hash;
	//console.log($.get(url));

	//return $.get(url);
	return $.get(url);
}

function getCharData2() {
	var timeStamp = getCurrentTimeStamp();

	var hash = getHashToken(public_key, private_key, timeStamp);
	return JSON.parse($.ajax({
		type: 'GET',
		url: "http://gateway.marvel.com:80/v1/public/characters?ts="+timeStamp+"&name=Captain%20America&apikey="+public_key+"&hash="+hash,
		dataType: 'json',
		global: false,
		async: false,
		success: function(data) {
			return data;
		}
	}).responseText);
}

//var test = getCharData2();
//console.log(test);

//var info = getCharData();

//console.log(info);





