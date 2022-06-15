let express = require( 'express' );
let app = express();
let server = require( 'http' ).Server( app );
let io = require( 'socket.io' )( server );
let stream = require( './ws/stream' );
let path = require( 'path' );
let favicon = require( 'serve-favicon' );

app.use( favicon( path.join( __dirname, 'favicon.ico' ) ) );
app.use( '/assets', express.static( path.join( __dirname, 'assets' ) ) );
var cfenv = require('cfenv');
app.get( '/', ( req, res ) => {
    res.sendFile( __dirname + '/index.html' );
} );






//--IBM

app.get('/transcript',(req, res) => {
	let fetch = require("node-fetch");
var options = {
  "method": "GET",
  "headers": {
    "Ocp-Apim-Subscription-Key": "263b459802cc4084864a331f5aa3ddb7",
   "Content-Type": "application/json"
  }
};
fetch('https://api.videoindexer.ai/Auth/trial/Accounts?generateAccessTokens=true&allowEdit=False',options).then(res => res.json())
    .then((jsontoken) => {
   console.log(jsontoken[0].accessToken);
   fetch('https://api.videoindexer.ai/trial/accounts/df0b84da-409e-4f5e-9015-45a3e014f181/videos/e5d3d478cb/Index?accessToken='+jsontoken[0].accessToken)
  .then((res) => { 
    return res.json() 
  })
  .then((jsonData) => {
   console.log(jsonData);
let text="<H1> Transript from Meeting Number 629956</h1><br><br><table>"
for(var i = 0;i< (jsonData.videos[0].insights.transcript).length;i++)
{
  
    text=text+"<tr><td> <b>Start Time: </b>"+(jsonData.videos[0].insights.transcript[i].instances[0].adjustedStart)+"</td><td> <b>Text: </b>"+(jsonData.videos[0].insights.transcript[i].text)+'</td></tr>';
}
text=text+"</table>";
console.log(text);
res.send(text);
  })
  .catch((err) => {
    // handle error for example
    console.error(err);
  });
  });
});

app.get('/email', (req, res) => {
	
	const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');
			
			let length1= 16;
  
  var html="<!DOCTYPE html><html><head><style>table {  font-family: arial, sans-serif;  border-collapse: collapse;  width: 100%;}td, th {  border: 1px solid black;  text-align: center;  padding: 8px;}tr:nth-child(even) {  background-color:#ddd;}</style></head><body><h2 style='color:blue'>Attentiveness Report Based on Face</h2><table style='border: 1px solid black;'>  <tr style='color:black;'>    <th>Number of Attendees</th>    <th>Attentiveness Level</th>    <th>Angerness Level</th><th>Contempt Level</th><th>Disgust Level</th> <th>Fear Level</th><th>Neutral Level</th><th>Sadness Level</th><th>Surprise Level</th> <th>Wearing Glass</th></tr>  ";

html=html+"<tr><td style='text-align: center;'><p style='font-size:12px;text-align: center;'><pre> 16 </td>"; 
html=html+"<td style='text-align: center;'>  0.8215</td>";
html=html+"<td style='text-align: center;'>  0.00019</td>";
html=html+"<td style='text-align: center;'>  0.00263</td>";
html=html+"<td style='text-align: center;'>  0</td>";
html=html+"<td style='text-align: center;'>  0</td>";
html=html+"<td style='text-align: center;'>  0.1755</td>";
html=html+"<td style='text-align: center;'>  0.00013</td>";
html=html+"<td style='text-align: center;'> 0.00006</td>";
html=html+"<td style='text-align: center;'>  1 </td>";
html=html+"</td></tr></table><br>";
html=html+"<h2 style='color:blue'>Attentiveness Report based on Voice</h2>";
let html2="";
let fetch = require("node-fetch");
var options = {
  "method": "GET",
  "headers": {
    "Ocp-Apim-Subscription-Key": "263b459802cc4084864a331f5aa3ddb7",
   "Content-Type": "application/json"
  }
};
fetch('https://api.videoindexer.ai/Auth/trial/Accounts?generateAccessTokens=true&allowEdit=False',options).then(res => res.json())
    .then((jsontoken) => {
   console.log(jsontoken[0].accessToken);
   fetch('https://api.videoindexer.ai/trial/accounts/df0b84da-409e-4f5e-9015-45a3e014f181/videos/e5d3d478cb/Index?accessToken='+jsontoken[0].accessToken)
  .then((res) => { 
    return res.json() 
  })
  .then((jsonData) => {
   console.log(jsonData.summarizedInsights.sentiments[1].seenDurationRatio);
    console.log(jsonData.summarizedInsights.emotions[0].seenDurationRatio);
	html2=html2+"<table style='border: 1px solid black;'>  <tr style='color:black;'>    <th>Number of Attendees</th>    <th>Neutral Level</th>    <th>Fear Level</th></tr>  ";
    html2=html2+"<tr><td style='text-align: center;'><p style='font-size:12px;text-align: center;'><pre> "+length1+"</td>"; 
    html2=html2+"<td style='text-align: center;'>"+jsonData.summarizedInsights.sentiments[1].seenDurationRatio+"</td>";

html2=html2+"<td style='text-align: center;'>"+jsonData.summarizedInsights.emotions[0].seenDurationRatio+"</td>";

html2=html2+"</tr></table><br><br>Transcript URL: -<BR><a href='#'>https://connectify.eu-gb.mybluemix.net/transcript</a></body>";
const msg = {
  to: 'saurabhksinha900@gmail.com',
  from: 'aelf@aelf-zoom.com',
  subject: 'Attentiveness Report of Meeting Number 629956',
  text: 'Attentiveness Report',
  html: html+html2
  };

sgMail.send(msg);
var email=html+html2;
  
  res.write(email);
  res.end();
  })
  .catch((err) => {
    // handle error for examples
    console.error(err);
  });
  });

  });
  
  app.get('/render',(req,res)=>{
    res.sendFile(__dirname +"/index1.html");
});
app.get( '/videos', ( req, res ) => {
    res.sendFile( __dirname + '/index2.html' );
} );
app.get( '/recordings', ( req, res ) => {
    res.sendFile( __dirname + '/recordings.html' );
} );
app.get( '/video1', ( req, res ) => {
    res.sendFile( __dirname + '/video.html' );
} );
app.get('/teams',(req,res)=>{
    res.sendFile(__dirname +"/msteams.html");
});

io.of( '/stream' ).on( 'connection', stream );
var appEnv = cfenv.getAppEnv();
server.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

