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



app.get('/transcript_old',(req, res) => {
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
let text="<H1> Transcript from Meeting Number 629956</h1><br><br><table>"
for(var i = 0;i< jsonData.videos[0].insights.transcript.length;i++)
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

html2=html2+"</tr></table><br><br>Transcript URL: -<BR><a href='https://ibm-bridge.eu-gb.mybluemix.net/transcript'>https://ibm-bridge.eu-gb.mybluemix.net/transcript</a></body>";
const msg = {
  to: 'saurabhksinha900@gmail.com',
  from: 'ibm-bridge@ibm.com',
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
  
 
 /* app.get('/check',(req,res)=>{
    res.sendFile(__dirname +"/index3.html");*/
    
app.get('/check19',(req,res)=>{
    res.sendFile(__dirname +"/index37.html");    
});
app.get('/upload_local',(req,res)=>{
	
let fetch = require("node-fetch");
var options = {
  "method": "GET",
  "headers": {
    "Ocp-Apim-Subscription-Key": "fe9c381f1ff3483cb3d8cbbc5c72d943",
   "Content-Type": "application/json"
  }
};

fetch('https://api.videoindexer.ai/Auth/trial/Accounts?generateAccessTokens=true&allowEdit=True',options).then(res => res.json())
    .then((jsontoken) => {
   console.log(jsontoken[0].accessToken);
   
   
   
   res.send("<html> <!DOCTYPE html><html lang='en'><head>  <meta charset='UTF-8'>  <meta name='viewport' content='width=device-width, initial-scale=1.0'>  <meta http-equiv='X-UA-Compatible' content='ie=edge'>  <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.3.1/css/all.css' integrity='sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU'    crossorigin='anonymous'>    <title>Video Analytics</title></head><style>:root {  --primary-color: #568c9b;  --primary-hover-color: #FFD700;  --bg-color: #FFD700;  --box-shadow: 3px 4px 12px rgba(0, 0, 0, 0.7);}* {  box-sizing: border-box;}body {  font-family: 'Lato', sans-serif;  margin: 0;  color: #333;  background: #f4f4f4;}ul {  list-style: none;  padding: 0;}a {  color: #fff;  text-decoration: none;}a:hover {  color: var(--primary-color);}.container {  max-width: 960px;  padding: 1rem 4rem;  margin: auto;  overflow: hidden;}.error {  padding: 5px;  border: #777 dotted 1px;  margin-bottom: 15px;}/* Header */header {  display: flex;  position: absolute;  top: 0;  left: 0;  width: 100%;  justify-content: space-between;  align-items: center;  padding: 1rem 6rem;}header nav ul {  display: flex;}header nav li {  margin: 0 1rem;}/* Login Button Spacing *//*header nav li:last-child {  margin-left: -5px;}*/header.inner {  background: var(--bg-color);  border-bottom: 4px solid var(--primary-color);  position: relative;  box-shadow: var(--box-shadow);}/* Buttons */.btn {  color: #fff;  padding: 0.6rem;  border: 1px solid #ccc;  transition: all 0.7s;}.btn:hover {  background: var(--primary-color);  border: 1px solid var(--primary-color);  color: #fff;}.btn-reverse {  background: var(--primary-color);  border: 1px solid var(--primary-color);}.btn-reverse:hover {  background: var(--primary-hover-color);  border: 1px solid var(--primary-hover-color);}/* Home Search */.search-wrap {  background: url('../img/showcase.jpg') no-repeat center center fixed / cover;  height: 100vh;  width: 100%;  padding: 1.3rem 3rem;  display: flex;  flex-direction: column;  justify-content: center;  align-items: center;}.search-wrap h1 {  font-size: 3rem;  font-weight: 800;  color: #fff;  margin: 0 0 1.5rem;  text-align: center;}.search-form input[type='submit'] {  background: var(--primary-color);  border: 1px solid var(--primary-color);  color: #fff;  padding: 0 2rem;  cursor: pointer;  transition: all 0.8s;}.search-form input[type='submit']:hover {  background: var(--primary-hover-color);  border: 1px solid var(--primary-hover-color);}.search-form {  display: flex;  width: 600px;  box-shadow: var(--box-shadow);}.search-form i {  color: #333;}/* Everything in the search form */.search-form > * {  border: 0;  padding: 0 0 0 10px;  background: #fff;  line-height: 50px;  font-size: 1rem;  border-radius: 0;  outline: 0;}input[type='search'] {  flex-basis: 600px;}/* Gigs */.gig {  background: var(--bg-color);  border-bottom: 4px solid var(--primary-color);  color: #fff;  padding: 1rem;  margin-bottom: 1rem;  box-shadow: var(--box-shadow);}.gig ul {  list-style: none;  display: flex;}.gig li {  margin-right: 0.5rem;  padding: 0.6rem;}.gig .tech span {  color: var(--primary-color);}/* Form */.form-wrap {  margin: auto;  background: var(--bg-color);  color: #fff;  padding: 1rem 3rem 3rem;  margin-top: 3rem;  border-bottom: 4px solid var(--primary-color);  box-shadow: var(--box-shadow);}.form-wrap.reg-form,.form-wrap.login-form {  width: 60%;}.form-wrap h1,.form-wrap h2,.form-wrap p {  text-align: center;}.form-wrap .btn {  margin-top: 1rem;  display: block;  width: 100%;  text-align: center;  font-size: 18px;}label {  display: block;  margin-bottom: 0.5rem;}.input-box {  padding: 0.5rem;  font-size: 18px;  width: 100%;  margin-bottom: 1.2rem;}/* Tablets */@media (max-width: 800px) {  .container {    padding: 1rem 2rem;  }  header {    flex-direction: column;    padding: 0.3rem !important; }  .search-form {    width: 100%;  }  input[type='search'] {    flex-basis: 100%;  }  .search-wrap h1 {    font-size: 2rem;  }  .search-wrap {    padding: 2.3rem;  }  .gig ul {    flex-direction: column;  }  .gig .btn {    display: block;    margin-top: 1rem;    text-align: center;  }  .form-wrap.reg-form,  .form-wrap.login-form {    width: 80%;  }}/* Smartphones */@media (max-width: 500px) {  .container {    padding: 1rem;  }  header nav li {    margin: 0 10px;  }  .search-form {    display: flex;    flex-direction: column;  }  input[type='search'] {    flex-basis: 0;  }  .search-form i {    display: none;  }  .form-wrap {    padding: 1rem 2rem 2rem;  }  .form-wrap.reg-form,  .form-wrap.login-form {    width: 100%;  }}</style> <body style='background-color:#3333ff;'>  <header>    <h2><a href='https://V-Platform.saurabhksinha90.repl.co/upload_local'>        &#9776;&nbsp;&nbsp;V-Platform Video Analytics Platform</a></h2>    <nav>      <ul>        <li>          <a href='https://V-Platform.saurabhksinha90.repl.co/main_page'>Home</a>        </li>        <li>          <a href='https://V-Platform.saurabhksinha90.repl.co/main_page'>URL Based</a>        </li> <li>          <a href='https://V-Platform.saurabhksinha90.repl.co/upload_local'>File Upload</a>        </li>  <li>          <a href='https://V-Platform.saurabhksinha90.repl.co/page3/?id=517d533271'>Already Uploaded</a>        </li> <li>          <a href='#'>About</a>        </li> <li>          <a href='#'>Contact</a>        </li> </ul>    </nav>  </header>  <section id='search' class='search-wrap'>    <h1>Provide File Path from Your Local</h1><form action='https://api.videoindexer.ai/trial/Accounts/324517cb-f57f-4b61-a5b1-6c85051b92c0/Videos?name=324517cb-f57f-4b61-a5b1-6c85051b92c0&privacy=Private&indexingPreset=Default&streamingPreset=Default&sendSuccessEmail=False&accessToken="+jsontoken[0].accessToken+"' method='post' enctype='multipart/form-data' ><p><input type='file' name='file1' style='padding: 10px;font-size: 17px;  border: 1px solid grey;  float: left;  width: 80%; height:46px; background: #f1f1f1;'><button type='submit' style='height:46px; width=190px; background: #FFD700;'>Submit</button></p></form></body></html>");
   });
   
   
});
app.get('/already_uploaded',(req,res)=>{
	
let fetch = require("node-fetch");
var options = {
  "method": "GET",
  "headers": {
    "Ocp-Apim-Subscription-Key": "fe9c381f1ff3483cb3d8cbbc5c72d943",
   "Content-Type": "application/json"
  }
};

fetch('https://api.videoindexer.ai/Auth/trial/Accounts?generateAccessTokens=true&allowEdit=True',options).then(res => res.json())
    .then((jsontoken) => {
   console.log(jsontoken[0].accessToken);
   
   
   
   res.send("<html> <!DOCTYPE html><html lang='en'><head>  <meta charset='UTF-8'>  <meta name='viewport' content='width=device-width, initial-scale=1.0'>  <meta http-equiv='X-UA-Compatible' content='ie=edge'>  <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.3.1/css/all.css' integrity='sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU'    crossorigin='anonymous'>    <title>Video Analytics</title></head><style>:root {  --primary-color: #568c9b;  --primary-hover-color: #FFD700;  --bg-color: #FFD700;  --box-shadow: 3px 4px 12px rgba(0, 0, 0, 0.7);}* {  box-sizing: border-box;}body {  font-family: 'Lato', sans-serif;  margin: 0;  color: #333;  background: #f4f4f4;}ul {  list-style: none;  padding: 0;}a {  color: #fff;  text-decoration: none;}a:hover {  color: var(--primary-color);}.container {  max-width: 960px;  padding: 1rem 4rem;  margin: auto;  overflow: hidden;}.error {  padding: 5px;  border: #777 dotted 1px;  margin-bottom: 15px;}/* Header */header {  display: flex;  position: absolute;  top: 0;  left: 0;  width: 100%;  justify-content: space-between;  align-items: center;  padding: 1rem 6rem;}header nav ul {  display: flex;}header nav li {  margin: 0 1rem;}/* Login Button Spacing *//*header nav li:last-child {  margin-left: -5px;}*/header.inner {  background: var(--bg-color);  border-bottom: 4px solid var(--primary-color);  position: relative;  box-shadow: var(--box-shadow);}/* Buttons */.btn {  color: #fff;  padding: 0.6rem;  border: 1px solid #ccc;  transition: all 0.7s;}.btn:hover {  background: var(--primary-color);  border: 1px solid var(--primary-color);  color: #fff;}.btn-reverse {  background: var(--primary-color);  border: 1px solid var(--primary-color);}.btn-reverse:hover {  background: var(--primary-hover-color);  border: 1px solid var(--primary-hover-color);}/* Home Search */.search-wrap {  background: url('../img/showcase.jpg') no-repeat center center fixed / cover;  height: 100vh;  width: 100%;  padding: 1.3rem 3rem;  display: flex;  flex-direction: column;  justify-content: center;  align-items: center;}.search-wrap h1 {  font-size: 3rem;  font-weight: 800;  color: #fff;  margin: 0 0 1.5rem;  text-align: center;}.search-form input[type='submit'] {  background: var(--primary-color);  border: 1px solid var(--primary-color);  color: #fff;  padding: 0 2rem;  cursor: pointer;  transition: all 0.8s;}.search-form input[type='submit']:hover {  background: var(--primary-hover-color);  border: 1px solid var(--primary-hover-color);}.search-form {  display: flex;  width: 600px;  box-shadow: var(--box-shadow);}.search-form i {  color: #333;}/* Everything in the search form */.search-form > * {  border: 0;  padding: 0 0 0 10px;  background: #fff;  line-height: 50px;  font-size: 1rem;  border-radius: 0;  outline: 0;}input[type='search'] {  flex-basis: 600px;}/* Gigs */.gig {  background: var(--bg-color);  border-bottom: 4px solid var(--primary-color);  color: #fff;  padding: 1rem;  margin-bottom: 1rem;  box-shadow: var(--box-shadow);}.gig ul {  list-style: none;  display: flex;}.gig li {  margin-right: 0.5rem;  padding: 0.6rem;}.gig .tech span {  color: var(--primary-color);}/* Form */.form-wrap {  margin: auto;  background: var(--bg-color);  color: #fff;  padding: 1rem 3rem 3rem;  margin-top: 3rem;  border-bottom: 4px solid var(--primary-color);  box-shadow: var(--box-shadow);}.form-wrap.reg-form,.form-wrap.login-form {  width: 60%;}.form-wrap h1,.form-wrap h2,.form-wrap p {  text-align: center;}.form-wrap .btn {  margin-top: 1rem;  display: block;  width: 100%;  text-align: center;  font-size: 18px;}label {  display: block;  margin-bottom: 0.5rem;}.input-box {  padding: 0.5rem;  font-size: 18px;  width: 100%;  margin-bottom: 1.2rem;}/* Tablets */@media (max-width: 800px) {  .container {    padding: 1rem 2rem;  }  header {    flex-direction: column;    padding: 0.3rem !important; }  .search-form {    width: 100%;  }  input[type='search'] {    flex-basis: 100%;  }  .search-wrap h1 {    font-size: 2rem;  }  .search-wrap {    padding: 2.3rem;  }  .gig ul {    flex-direction: column;  }  .gig .btn {    display: block;    margin-top: 1rem;    text-align: center;  }  .form-wrap.reg-form,  .form-wrap.login-form {    width: 80%;  }}/* Smartphones */@media (max-width: 500px) {  .container {    padding: 1rem;  }  header nav li {    margin: 0 10px;  }  .search-form {    display: flex;    flex-direction: column;  }  input[type='search'] {    flex-basis: 0;  }  .search-form i {    display: none;  }  .form-wrap {    padding: 1rem 2rem 2rem;  }  .form-wrap.reg-form,  .form-wrap.login-form {    width: 100%;  }}</style> <body style='background-color:#3333ff;'>  <header>    <h2><a href='https://V-Platform.saurabhksinha90.repl.co/upload_local'>        &#9776;&nbsp;&nbsp;V-Platform Video Analytics Platform</a></h2>    <nav>      <ul>        <li>          <a href='https://V-Platform.saurabhksinha90.repl.co/main_page'>Home</a>        </li>        <li>          <a href='https://V-Platform.saurabhksinha90.repl.co/main_page'>URL Based</a>        </li> <li>          <a href='https://V-Platform.saurabhksinha90.repl.co/upload_local'>File Upload</a>        </li>  <li>          <a href='https://V-Platform.saurabhksinha90.repl.co/page3/?id=517d533271'>Already Uploaded</a>        </li> <li>          <a href='#'>About</a>        </li> <li>          <a href='#'>Contact</a>        </li> </ul>    </nav>  </header>  <section id='search' class='search-wrap'>    <h1>Provide File Path from Your Local</h1><p>Transforming-Finance-Tech-Everywhere <a href='https://V-Platform.saurabhksinha90.repl.co/page3/?id=517d533271'><button type='submit' style='height:100px; width=300px; background: #FFD700;'>id=517d533271</button></a></p></body></html>");
   });
   
   
});
  app.get('/check1',(req1,res1)=>{
var fs = require("fs");
var unirest = require("unirest");

var req = unirest("POST", "https://api.videoindexer.ai/trial/Accounts/324517cb-f57f-4b61-a5b1-6c85051b92c0/Videos");

req.query({
  "name": "324517cb-f57f-4b61-a5b1-6c85051b92c0",
  "privacy": "Private",
  "indexingPreset": "Default",
  "streamingPreset": "Default",
  "sendSuccessEmail": "False",
  "accessToken": "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJBY2NvdW50SWQiOiIzMjQ1MTdjYi1mNTdmLTRiNjEtYTViMS02Yzg1MDUxYjkyYzAiLCJBbGxvd0VkaXQiOiJUcnVlIiwiRXh0ZXJuYWxVc2VySWQiOiI4RTc2RkQxNkVEQjA0N0Y3QkE4QjhCREExOTUzODJFMSIsIlVzZXJUeXBlIjoiTWljcm9zb2Z0Q29ycEFhZCIsIklzc3VlckxvY2F0aW9uIjoiVHJpYWwiLCJuYmYiOjE2MDc4ODg2ODcsImV4cCI6MTYwNzg5MjU4NywiaXNzIjoiaHR0cHM6Ly9hcGkudmlkZW9pbmRleGVyLmFpLyIsImF1ZCI6Imh0dHBzOi8vYXBpLnZpZGVvaW5kZXhlci5haS8ifQ.IKDjPDHrg4zWgE6IE-FIVlyDf7k35a4Vjfndpxmltpw"
});

req.headers({
  "Postman-Token": "8bd68028-822d-47e0-9874-78f601a174fc",
  "cache-control": "no-cache",
  "Host": "api.videoindexer.ai",
  "Ocp-Apim-Subscription-Key": "fe9c381f1ff3483cb3d8cbbc5c72d943",
  "Content-Type": "application/x-www-form-urlencoded",
  "content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
});

req.multipart([
  {
    "body": fs.createReadStream(__dirname +"../19.mp4")
  }
]);

req.end(function (res) {
  if (res.error) throw new Error(res.error);

  res1.send(res.body);
});

//res1.send('saurabh');
});

app.get('/page2',(req,res)=>{
var videoUrl = req.query.id;
//var file1 = req.query.file1;
var videoId= videoUrl.replace("https://www.youtube.com/watch?v=","");
var request = require('request');

function qsToJson(qs) {
  var res = {};
  var pars = qs.split('&');
  var kv, k, v;
  for (i in pars) {
    kv = pars[i].split('=');
    k = kv[0];
    v = kv[1];
    res[k] = decodeURIComponent(v);
  }
  return res;
}

var retrieve = function(id, callback) {
  var url = 'https://www.youtube.com/get_video_info?html5=1&video_id=' + id;
  
  request(url, function(err, res, body) {
    if (!err && res.statusCode == 200) {
      var get_video_info = qsToJson(body);
      
      // remapping urls into an array of objects
      var tmp = get_video_info["url_encoded_fmt_stream_map"];
      if (tmp) {
        tmp = tmp.split(',');
        for (i in tmp) {
          tmp[i] = qsToJson(tmp[i]);
        }
        get_video_info["url_encoded_fmt_stream_map"] = tmp;
     
      }
      
      // done
      callback(null, get_video_info);
    }
    else {
      console.log('(youtube.get-video.info) HTTP response not 200/OK');
      callback(err, null);
    }
  });
};

function cb(err, res1) {
  if (err) console.log('ERROR:', err);
  else 
  {
  
  
  //res.send(encodeURIComponent(JSON.parse(res1.player_response).streamingData.formats[JSON.parse(res1.player_response).streamingData.formats.length-1].url));

   
  let fetch = require("node-fetch");
var options = {
  "method": "GET",
  "headers": {
    "Ocp-Apim-Subscription-Key": "fe9c381f1ff3483cb3d8cbbc5c72d943",
   "Content-Type": "application/json"
  }
};
var options1 = {
  "method": "POST",
  "headers": {
    "Ocp-Apim-Subscription-Key": "fe9c381f1ff3483cb3d8cbbc5c72d943",
   "Content-Type": "multipart/form-data"
  }
};
fetch('https://api.videoindexer.ai/Auth/trial/Accounts?generateAccessTokens=true&allowEdit=True',options).then(res => res.json())
    .then((jsontoken) => {
   console.log(jsontoken[0].accessToken);
   
      
    fetch('https://api.videoindexer.ai/trial/Accounts/324517cb-f57f-4b61-a5b1-6c85051b92c0/Videos?name=324517cb-f57f-4b61-a5b1-6c85051b92c0&privacy=Private&videoUrl='+encodeURIComponent(JSON.parse(res1.player_response).streamingData.formats[JSON.parse(res1.player_response).streamingData.formats.length-1].url)+'&indexingPreset=Default&streamingPreset=Default&sendSuccessEmail=False&accessToken='+jsontoken[0].accessToken,options1)
  .then((res) => { 
    return res.json(); 
  })
  .then((jsonData1) => {
   //console.log(JSON.parse(JSON.stringify(jsonData1)));    
   var data=JSON.parse(JSON.stringify(jsonData1));

//res.send(data);

res.send('<html>We are processing your request now. Click to check video insights. <body><a href="https://V-Platform.saurabhksinha90.repl.co/page3/?id='+JSON.parse(JSON.stringify(jsonData1)).id+'&main='+videoId+'"><input type="button" id="sub" value="Insights" /> </a> </body><html>');

  })
  .catch((err) => {
    // handle error for example
    console.error(err);
  });
  
   

  
  });
  
  
  
  }
}

retrieve(videoId, cb);


  });

app.get('/main_page',(req,res)=>{
    res.sendFile(__dirname +"/page.html");
});
app.get('/blockchain_upload',(req,res)=>{
    res.sendFile(__dirname +"/page19.html");
});

app.get('/page19',(req,res)=>{
const keywords19 = req.query.id;	
var request = require("request");

var options = { method: 'POST',
  url: 'https://textvis-word-cloud-v1.p.rapidapi.com/v1/textToCloud',
  headers: 
   { 'Postman-Token': '6b465578-1854-4e05-bb16-60f94dbc4794',
     'cache-control': 'no-cache',
     useQueryString: 'true',
     'x-rapidapi-host': 'textvis-word-cloud-v1.p.rapidapi.com',
     'content-type': 'application/json',
     'x-rapidapi-key': '45b24b73a0msh375c87d70f8af30p1ea8dejsn8686a33f304a' },
  body: '{\r\n    "text": "'+keywords19+'",\r\n    "scale": 0,\r\n    "width": 1800,\r\n    "height": 1800,\r\n    "colors": [\r\n        "#375E97",\r\n        "#FB6542",\r\n        "#FFBB00",\r\n        "#3F681C"\r\n    ],\r\n    "font": "Tahoma",\r\n    "use_stopwords": true,\r\n    "language": "en",\r\n    "uppercase": false\r\n}' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  res.send("<html><body><script>fetch('https://deep-index.moralis.io/api/v2/ipfs/uploadFolder', {    method: 'POST',    headers: {        'accept': 'application/json',        'X-API-Key': 'cexNuIrndG6kpKifNZZDvMyw2wfJtMXB6DuPV8zTbL89FDOXiqoUYVBXlAwK8TaQ',        'Content-Type': 'application/json'    },    body: JSON.stringify([        {            'path':'"+body+"' ,            'content':'"+body+"'      }    ])}).then(res => res.json())    .then(jsonData => console.log(jsonData));</script><img src='"+body+"'/></body></html>");
});

    
});

app.get('/page3',(req,res)=>{
const videoId = req.query.id;
var main='';
 main = main+req.query.main;
let fetch = require("node-fetch");

var options = {
  "method": "GET",
  "headers": {
    "Ocp-Apim-Subscription-Key": "fe9c381f1ff3483cb3d8cbbc5c72d943",
   "Content-Type": "application/json"
  }
};

fetch('https://api.videoindexer.ai/Auth/trial/Accounts?generateAccessTokens=true&allowEdit=True',options).then(res => res.json())
    .then((jsontoken) => {
   console.log(jsontoken[0].accessToken);

fetch('https://api.videoindexer.ai/trial/Accounts/324517cb-f57f-4b61-a5b1-6c85051b92c0/Videos/'+videoId+'/Index?reTranslate=False&includeStreamingUrls=True&accessToken='+jsontoken[0].accessToken)
  .then((res) => { 
    return res.json() ;
  })
  .then((jsonData2) => {
var processingProgress=0;
   
if((jsonData2.state) ==='Processed') {
	//res.send(jsonData2.state);
	var data="<!DOCTYPE html><html lang='en'><head>    <meta charset='utf-8'>    <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no'>        <!-- SEO Meta Tags -->    <meta name='description' content='Create a stylish landing page for your business startup and get leads for the offered services with this HTML landing page template.'>    <meta name='author' content='V-Platform'>    <!-- OG Meta Tags to improve the way the post looks when you share the page on LinkedIn, Facebook, Google+ -->	<meta property='og:site_name' content='' /> <!-- website name -->	<meta property='og:site' content='' /> <!-- website link -->	<meta property='og:title' content=''/> <!-- title shown in the actual shared post -->	<meta property='og:description' content='' /> <!-- description shown in the actual shared post -->	<meta property='og:image' content='' /> <!-- image link, make sure it''s jpg --><meta property='og:url' content='' /> <!-- where do you want your post to link to -->	<meta property='og:type' content='article' />    <!-- Website Title -->    <title>V-Platform Video Analytics</title>        <!-- Styles -->  <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.0.8/css/all.css'>  <link href='https://fonts.googleapis.com/css?family=Raleway:400,400i,600,700,700i&amp;subset=latin-ext' rel='stylesheet'>    <link href='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/bootstrap.css' rel='stylesheet'>    <link href='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/fontawesome-all.css' rel='stylesheet'>    <link href='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/swiper.css' rel='stylesheet'>	<link href='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/magnific-popup.css' rel='stylesheet'>	<link href='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/styles.css' rel='stylesheet'>		<!-- Favicon  -->   <link rel='icon' href='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/favicon1.png'></head><body data-spy='scroll' data-target='.fixed-top'>        <!-- Preloader -->	<div class='spinner-wrapper'>        <div class='spinner'>            <div class='bounce1'></div>            <div class='bounce2'></div>            <div class='bounce3'></div>        </div>    </div>    <!-- end of preloader -->       <!-- Navigation -->    <nav class='navbar navbar-expand-lg navbar-dark navbar-custom fixed-top'>        <!-- Text Logo - Use this if you don''t have a graphic logo -->        <!-- <a class='navbar-brand logo-text page-scroll' href='index.html'>V-Platform</a> -->        <!-- Image Logo -->        <a class='navbar-brand logo-image' href='https://V-Platform.saurabhksinha90.repl.co/check19'><img src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/V-Platform_logo.png' alt='alternative' style='height:100px; width:110px;'></a>                <!-- Mobile Menu Toggle Button -->        <button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarsExampleDefault' aria-controls='navbarsExampleDefault' aria-expanded='false' aria-label='Toggle navigation'>            <span class='navbar-toggler-awesome fas fa-bars'></span>            <span class='navbar-toggler-awesome fas fa-times'></span>        </button>        <!-- end of mobile menu toggle button -->       <div class='collapse navbar-collapse' id='navbarsExampleDefault'>            <ul class='navbar-nav ml-auto'>                <li class='nav-item'>                    <a class='nav-link page-scroll' href='https://V-Platform.saurabhksinha90.repl.co/main_page'>Home <span class='sr-only'>(current)</span></a>                </li>                <li class='nav-item'>                    <a class='nav-link page-scroll' href='https://V-Platform.saurabhksinha90.repl.co/main_page'>URL Based</a>                </li>                <li class='nav-item'>                    <a class='nav-link page-scroll' href='https://V-Platform.saurabhksinha90.repl.co/upload_local'>File Upload</a>                </li>                <li class='nav-item'>                    <a class='nav-link page-scroll' href='https://V-Platform.saurabhksinha90.repl.co/page3/?id=517d533271'>Already Uploaded</a>                </li>               <!-- Dropdown Menu -->                          <li class='nav-item dropdown'>                    <a class='nav-link dropdown-toggle page-scroll' href='#about' id='navbarDropdown' role='button' aria-haspopup='true' aria-expanded='false'>About</a>                    <div class='dropdown-menu' aria-labelledby='navbarDropdown'>                        <a class='dropdown-item' href='terms-conditions.html'><span class='item-text'>Terms Conditions</span></a>                        <div class='dropdown-items-divide-hr'></div>                        <a class='dropdown-item' href='privacy-policy.html'><span class='item-text'>Privacy Policy</span></a>                    </div>                </li>                <!-- end of dropdown menu -->                <li class='nav-item'>                    <a class='nav-link page-scroll' href='#contact'>Contact</a>                </li>            </ul>           <span class='nav-item social-icons'>                <span class='fa-stack'>                    <a href='#your-link'>                        <i class='fas fa-circle fa-stack-2x facebook'></i>                        <i class='fab fa-facebook-f fa-stack-1x'></i>                    </a>                </span>                <span class='fa-stack'>                    <a href='#your-link'>                        <i class='fas fa-circle fa-stack-2x twitter'></i>                        <i class='fab fa-twitter fa-stack-1x'></i>                    </a>                </span>            </span>        </div>   </nav> <!-- end of navbar -->    <!-- end of navigation -->    <!-- Header -->    <header id='header' class='header'>        <div class='header-content'>            <div class='container'>                <div class='row'>                    <div class='col-lg-6'>                        <div class='text-container'>                            <h1>V-Platform<span class='turquoise'> Video Analytics</span> Report</h1>                           <p class='p-large'>";                            
	
	let keywords1="";
for(var p = 0;p< (jsonData2.videos[0].insights.keywords).length;p++)
{
  
    
    keywords1=keywords1+(jsonData2.videos[0].insights.keywords[p].text+' ').repeat(jsonData2.videos[0].insights.keywords[p].instances.length+' ');
}

let silence="NA"; 
let keywords="";
for(var j = 0;j< (jsonData2.videos[0].insights.keywords).length;j++)
{
  
    keywords=keywords+(jsonData2.videos[0].insights.keywords[j].text+' | '+ jsonData2.videos[0].insights.keywords[j].instances.length+'<br/>');
}

let faces="";
for(var k = 0;k<(jsonData2.summarizedInsights.faces).length;k++)
{
  
    faces=faces+jsonData2.summarizedInsights.faces[k].name+" appeares in "+((jsonData2.summarizedInsights.faces[k].seenDurationRatio)*100).toFixed(2)+"% of video <br/>";
}

let text1="";
for(var l = 0;l< (jsonData2.videos[0].insights.transcript).length;l++)
{
  
    //text1=text1+(jsonData2.videos[0].insights.transcript[l].text);
      text1=text1+  "<table><tr><td>"+"\n<b>	Speaker "+(jsonData2.videos[0].insights.transcript[l].speakerId)+"</b>: "+"</td><td>"+(jsonData2.videos[0].insights.transcript[l].text)+'</td></tr></table>';
}

 
 data=data+"<br/><b>Total Number of People in video:</b>"+jsonData2.summarizedInsights.faces.length+"<br/>";
if (((jsonData2.summarizedInsights.emotions).length)>0)
{
let text2="<br/><b>Emotions Analysis</b><br/>";
for(var l = 0;l< (jsonData2.summarizedInsights.emotions).length;l++)
{
  
    text2=text2+(jsonData2.summarizedInsights.emotions[l].type)+' '+((jsonData2.summarizedInsights.emotions[l].seenDurationRatio)*100).toFixed(2)+"%<br/>";
}
data=data+text2;
}
 
if (((jsonData2.summarizedInsights.sentiments).length)>0)
{
let text3="<br/><b>Sentiments Analysis</b><br/>";
for(var m = 0;m< (jsonData2.summarizedInsights.sentiments).length;m++)
{
  
    text3=text3+(jsonData2.summarizedInsights.sentiments[m].sentimentKey)+' '+((jsonData2.summarizedInsights.sentiments[m].seenDurationRatio)*100).toFixed(2)+"%<br/>";
}
data=data+text3;
}
if (((jsonData2.summarizedInsights.audioEffects).length)>0)
{
let text5="<br/><b>Audio Effects</b><br/>";

for(var n = 0;n< (jsonData2.summarizedInsights.audioEffects).length;n++)
{
  
    text5=text5+(jsonData2.summarizedInsights.audioEffects[n].audioEffectKey)+' '+((jsonData2.summarizedInsights.audioEffects[n].seenDurationRatio)*100).toFixed(2)+"%<br/>";
    silence=((jsonData2.summarizedInsights.audioEffects[n].seenDurationRatio)*100).toFixed(2)+"%<br/>";
}
data=data+text5;
}

	let keywords3="";
for(var p = 0;p< (jsonData2.videos[0].insights.keywords).length;p++)
{
  
    
    keywords3=keywords3+"<strong class='blue'>"+(jsonData2.videos[0].insights.keywords[p].text+'</strong> | ');
}
data=data+"<br/><b>Faces</b><br/>"+faces+"<br/><br/>"; 
 
data=data+"Click below to get <b>Word Cloud</b> generated from your video</p><a class='btn-solid-lg page-scroll' href='https://V-Platform.saurabhksinha90.repl.co/page19/?id="+keywords1+"'>Get Word Cloud</a>                        </div> <!-- end of text-container -->                   </div> <!-- end of col -->                    <div class='col-lg-6'>                        <div class='image-container'>                            <img class='img-fluid' src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/header-teamwork.svg' alt='alternative'>                        </div> <!-- end of image-container -->                    </div> <!-- end of col -->                </div> <!-- end of row -->            </div> <!-- end of container -->        </div> <!-- end of header-content -->    </header> <!-- end of header -->    <!-- end of header -->        <!-- Services -->    <div id='services' class='cards-1'>        <div class='container'>            <div class='row'>                <div class='col-lg-12'>                    <h2>Insight Details</h2>                    <p class='p-heading p-large'>Please find below more intelligent stats gathered from the video</p>                </div> <!-- end of col -->            </div> <!-- end of row -->           <div class='row'>                <div class='col-lg-12'>                    <!-- Card -->                    <div class='card'>                        <img class='card-image' src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/services-icon-1.svg' alt='alternative'>                        <div class='card-body'>                            <h4 class='card-title'>Total Participants</h4>                            <p>Total Number of Participants in the entire video is <h5>"+jsonData2.summarizedInsights.faces.length+"</h5></p>                        </div>                    </div>                    <!-- end of card -->                    <!-- Card -->                    <div class='card'>                       <img class='card-image' src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/services-icon-2.svg' alt='alternative'>                        <div class='card-body'>                            <h4 class='card-title'>Total Word Count</h4>                            <p>Total number of words spoken in the video is <h5>"+(text1.split(" ").length+1)+"</h5></p>                        </div>                    </div>                    <!-- end of card -->                    <!-- Card -->                    <div class='card'>                        <img class='card-image' src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/services-icon-3.svg' alt='alternative'>                        <div class='card-body'>                            <h4 class='card-title'>Audio Effects</h4>                            <p>Total silence detected during the entire video is <h5>"+silence+"</h5> </p>                        </div>                   </div>                    <!-- end of card -->                                    </div> <!-- end of col -->            </div> <!-- end of row -->        </div> <!-- end of container -->    </div> <!-- end of cards-1 -->    <!-- end of services -->    <!-- Details 1 -->    <div class='basic-1'>        <div class='container'>            <div class='row'>                <div class='col-lg-6'>                   <div class='text-container'>                        <h2>Top Keywords Used</h2>                        <p>";
data=data+keywords3+"</p>                        <a class='btn-solid-reg popup-with-move-anim' href='#details-lightbox-1'>More Details</a>                    </div> <!-- end of text-container -->                </div> <!-- end of col -->                <div class='col-lg-6'>                    <div class='image-container'>                        <img class='img-fluid' src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/details-1-office-worker.svg' alt='alternative'>                    </div> <!-- end of image-container -->                </div> <!-- end of col -->            </div> <!-- end of row -->        </div> <!-- end of container -->    </div> <!-- end of basic-1 -->    <!-- end of details 1 -->        ";
data=data+"<!-- Details 2 -->    <div class='basic-2'>        <div class='container'>            <div class='row'>                <div class='col-lg-6'>                    <div class='image-container'>                        <img class='img-fluid' src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/details-2-office-team-work.svg' alt='alternative'>                    </div> <!-- end of image-container -->                </div> <!-- end of col -->                <div class='col-lg-6'>                    <div class='text-container'>                        <h2>Topics Covered in the video</h2>                        <ul class='list-unstyled li-space-lg'>                            ";

let topics="";
if(((jsonData2.summarizedInsights.topics).length)>0)
{
for(var c = 0;c<(jsonData2.summarizedInsights.topics).length;c++)
{
  
    topics=topics+"<li class='media'>                               <i class='fas fa-check'></i>                                <div class='media-body'>"+jsonData2.summarizedInsights.topics[c].name+"</div>                            </li> ";
}
data=data+topics;
}
data=data+"</ul>                        <a class='btn-solid-reg popup-with-move-anim' href='#details-lightbox-2'>LIGHTBOX</a>                    </div> <!-- end of text-container -->                </div> <!-- end of col -->           </div> <!-- end of row -->        </div> <!-- end of container -->    </div> <!-- end of basic-2 -->    <!-- end of details 2 -->  ";
data=data+"  <!-- Details Lightboxes -->    <!-- Details Lightbox 1 -->	<div id='details-lightbox-1' class='lightbox-basic zoom-anim-dialog mfp-hide'>        <div class='container'>            <div class='row'>                <button title='Close (Esc)' type='button' class='mfp-close x-button'>Ã—</button>                <div class='col-lg-8'>                    <div class='image-container'>                        <img class='img-fluid' src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/details-lightbox-1.svg' alt='alternative'>                    </div> <!-- end of image-container -->               </div> <!-- end of col -->                <div class='col-lg-4'>                    <h3>More Details about Keywords</h3>                    <hr>                    <h5>Including Counts</h5>                                        <ul class='list-unstyled li-space-lg'>         ";

let keywords5="";
for(var s = 0;s< (jsonData2.videos[0].insights.keywords).length;s++)
{
  
    keywords5=keywords5+"<li class='media'>                            <i class='fas fa-check'></i><div class='media-body'>"+(jsonData2.videos[0].insights.keywords[s].text)+'<b> | '+(jsonData2.videos[0].insights.keywords[s].instances.length)+"</b></div>                        </li>";
}

data=data+keywords5+"               </ul>                    <a class='btn-solid-reg mfp-close page-scroll' href='#request'>REQUEST</a> <a class='btn-outline-reg mfp-close as-button' href='#screenshots'>BACK</a>                </div> <!-- end of col -->            </div> <!-- end of row -->       </div> <!-- end of container -->    </div> <!-- end of lightbox-basic -->    <!-- end of details lightbox 1 -->    <!-- Details Lightbox 2 -->	<div id='details-lightbox-2' class='lightbox-basic zoom-anim-dialog mfp-hide'>        <div class='container'>            <div class='row'>                <button title='Close (Esc)' type='button' class='mfp-close x-button'>Ã—</button>                <div class='col-lg-8'>                    <div class='image-container'>                        <img class='img-fluid' src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/details-lightbox-2.svg' alt='alternative'>                    </div> <!-- end of image-container -->                </div> <!-- end of col -->                <div class='col-lg-4'>                   <h3>Search To Optimize</h3>                    <hr>                    <h5>Core feature</h5>                    <p>The emailing module basically will speed up your email marketing operations while offering more subscriber control.</p>                    <p>Do you need to build lists for your email campaigns? It just got easier with Evolo.</p>                    <ul class='list-unstyled li-space-lg'>                        <li class='media'>                            <i class='fas fa-check'></i><div class='media-body'>List building framework</div>                        </li>                        <li class='media'>                            <i class='fas fa-check'></i><div class='media-body'>Easy database browsing</div>                        </li>                        <li class='media'>                            <i class='fas fa-check'></i><div class='media-body'>User administration</div>                        </li>                       <li class='media'>                            <i class='fas fa-check'></i><div class='media-body'>Automate user signup</div>                        </li>                        <li class='media'>                            <i class='fas fa-check'></i><div class='media-body'>Quick formatting tools</div>                        </li>                        <li class='media'>                            <i class='fas fa-check'></i><div class='media-body'>Fast email checking</div>                        </li>                    </ul>                    <a class='btn-solid-reg mfp-close page-scroll' href='#request'>REQUEST</a> <a class='btn-outline-reg mfp-close as-button' href='#screenshots'>BACK</a>                </div> <!-- end of col -->            </div> <!-- end of row -->        </div> <!-- end of container -->    </div> <!-- end of lightbox-basic -->   <!-- end of details lightbox 2 -->    <!-- end of details lightboxes -->  ";
data=data+"  <!-- Pricing -->    <div id='pricing' class='cards-2'>        <div class='container'>            <div class='row'>                <div class='col-lg-12'>                    <h2>Statistics based on Participants Voice </h2>                    <p class='p-heading p-large'>We''ve prepared statistics based on the voice of speakers in the video. This has details about the Speakers talk to listen ratio, Speakers longest monologue, word counts and number of fragments. We have calculated this based on the advanced voice analytics technology.</p>                </div> <!-- end of col -->            </div> <!-- end of row -->            <div class='row'>                <div class='col-lg-12'>                    ";

let y2="";

if((Object.keys(jsonData2.summarizedInsights.statistics.speakerTalkToListenRatio).length)>0)
{
for(var y = 0;y<Object.keys(jsonData2.summarizedInsights.statistics.speakerTalkToListenRatio).length;y++)
{
 
    y2=y2+"<!-- Card-->                    <div class='card'>                        <div class='card-body'>                            <div class='card-title'> Speaker "+Object.keys(jsonData2.summarizedInsights.statistics.speakerTalkToListenRatio)[y]+"</div>                            <div class='card-subtitle'>Below is the detailed analysis based on the voice of speaker "+Object.keys(jsonData2.summarizedInsights.statistics.speakerTalkToListenRatio)[y]+"</div>                            <hr class='cell-divide-hr'>                            <div class='price'>                                <span class='currency'></span><span class='value'>"+JSON.parse(jsonData2.summarizedInsights.statistics.speakerWordCount[Object.keys(jsonData2.summarizedInsights.statistics.speakerTalkToListenRatio)[y]])+"</span>                                <div class='frequency'>words</div>                            </div>                            <hr class='cell-divide-hr'>                            <ul class='list-unstyled li-space-lg'>                                <li class='media'>                                    <i class='fas fa-check'></i><div class='media-body'>Talk To listen Ratio is <b>"+JSON.parse(jsonData2.summarizedInsights.statistics.speakerTalkToListenRatio[Object.keys(jsonData2.summarizedInsights.statistics.speakerTalkToListenRatio)[y]])+"</b></div>                                </li>                               <li class='media'>                                    <i class='fas fa-check'></i><div class='media-body'>Longest Monolog <b>"+JSON.parse(jsonData2.summarizedInsights.statistics.speakerLongestMonolog[Object.keys(jsonData2.summarizedInsights.statistics.speakerTalkToListenRatio)[y]])+"</b></div>                                </li>                                <li class='media'>                                    <i class='fas fa-check'></i><div class='media-body'>Number of Fragments <b>"+JSON.parse(jsonData2.summarizedInsights.statistics.speakerNumberOfFragments[Object.keys(jsonData2.summarizedInsights.statistics.speakerTalkToListenRatio)[y]])+"</b></div>                                </li>                                <li class='media'>                                    <i class='fas fa-check'></i><div class='media-body'>Word Count <b>"+JSON.parse(jsonData2.summarizedInsights.statistics.speakerWordCount[Object.keys(jsonData2.summarizedInsights.statistics.speakerTalkToListenRatio)[y]])+"</b></div>                                </li>                            </ul>                            <div class='button-wrapper'>                                <a class='btn-solid-reg page-scroll' href='#request'>REQUEST</a>                           </div>                        </div>                    </div> <!-- end of card -->                    <!-- end of card -->                    ";
}
}

data=data+y2;
data=data+"</div> <!-- end of col -->            </div> <!-- end of row -->        </div> <!-- end of container -->    </div> <!-- end of cards-2 -->    <!-- end of pricing --> ";
data=data+"   <!-- Request -->    <div id='request' class='form-1'>        <div class='container'>            <div class='row'>                <div class='col-lg-6'>                   <div class='text-container'>                        <h2>Labels seen in the video</h2>                        <p>We could see labels in the video. </p>                        <ul class='list-unstyled li-space-lg'>                            ";
let labels1="";
for(var q = 0;q< (jsonData2.summarizedInsights.labels).length;q++)
{
  
    labels1=labels1+"<li class='media'>                                <i class='fas fa-check'></i>                                <div class='media-body'><strong class='blue'>"+(jsonData2.summarizedInsights.labels[q].name)+"</strong> </div>                            </li>                            ";
   
}

data=data+labels1;
   

data=data+"                     </ul>                    </div> <!-- end of text-container -->                </div> <!-- end of col -->                <div class='col-lg-6'>                    <div class='image-container'>                       <br/> <img class='img-fluid' src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/testimonials-2-men-talking.svg' alt='alternative'>                    </div> <!-- end of image-container -->                </div> <!-- end of col -->          </div> <!-- end of row -->        </div> <!-- end of container -->    </div> <!-- end of form-1 -->    <!-- end of request -->    ";



data=data+"<!-- Video -->    <div class='basic-3'>       <div class='container'>            <div class='row'>                <div class='col-lg-12'>                    <h2>Check Out The Video</h2>                </div> <!-- end of col -->            </div> <!-- end of row -->            <div class='row'>                <div class='col-lg-12'>                                        <!-- Video Preview -->                    <div class='image-container'>                        <div class='video-wrapper'>                            <a class='popup-youtube' href='https://www.youtube.com/watch?v="+main.replace('https://www.youtube.com/watch?v=','')+"' data-effect='fadeIn'>                                <img class='img-fluid' src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/video-frame.svg' alt='alternative'>                                <span class='video-play-button'>                                   <span></span>                                </span>                            </a>                        </div> <!-- end of video-wrapper -->                    </div> <!-- end of image-container -->                    <!-- end of video preview -->                    <p>You can revisit the video and see how our advanced video analytics based on face and voice of the participants help you take this to next level.</p>                </div> <!-- end of col -->            </div> <!-- end of row -->        </div> <!-- end of container -->    </div> <!-- end of basic-3 -->    <!-- end of video -->   <!-- Testimonials -->    <div class='slider-2'>        <div class='container'>            <div class='row'>                <div class='col-lg-6'>                    <div class='image-container'>                        <img class='img-fluid' src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/testimonials-2-men-talking.svg' alt='alternative'>                    </div> <!-- end of image-container -->                </div> <!-- end of col -->                <div class='col-lg-6'>                    <h2>Testimonials</h2>                    <!-- Card Slider -->                    <div class='slider-container'>                        <div class='swiper-container card-slider'>                           <div class='swiper-wrapper'>                                                                <!-- Slide -->                                <div class='swiper-slide'>                                    <div class='card'>                                        <img class='card-image' src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/testimonial-1.svg' alt='alternative'>                                        <div class='card-body'>                                            <p class='testimonial-text'>I just finished my trial period and was so amazed with the support and results that I purchased Evolo right away at the special price.</p>                                            <p class='testimonial-author'>Jude Thorn - Designer</p>                                        </div>                                    </div>                                </div> <!-- end of swiper-slide -->                                <!-- end of slide -->                                        <!-- Slide -->                               <div class='swiper-slide'>                                    <div class='card'>                                        <img class='card-image' src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/testimonial-2.svg' alt='alternative'>                                        <div class='card-body'>                                            <p class='testimonial-text'>Evolo has always helped or startup to position itself in the highly competitive market of mobile applications. You will not regret using it!</p>                                            <p class='testimonial-author'>Marsha Singer - Developer</p>                                        </div>                                    </div>                                        </div> <!-- end of swiper-slide -->                                <!-- end of slide -->                                        <!-- Slide -->                                <div class='swiper-slide'>                                    <div class='card'>                                        <img class='card-image' src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/testimonial-3.svg' alt='alternative'>                                       <div class='card-body'>                                            <p class='testimonial-text'>Love their services and was so amazed with the support and results that I purchased Evolo for two years in a row. They are awesome.</p>                                            <p class='testimonial-author'>Roy Smith - Marketer</p>                                        </div>                                    </div>                                        </div> <!-- end of swiper-slide -->                                <!-- end of slide -->                                                           </div> <!-- end of swiper-wrapper -->                                    <!-- Add Arrows -->                            <div class='swiper-button-next'></div>                            <div class='swiper-button-prev'></div>                            <!-- end of add arrows -->                               </div> <!-- end of swiper-container -->                    </div> <!-- end of slider-container -->                    <!-- end of card slider -->                </div> <!-- end of col -->            </div> <!-- end of row -->        </div> <!-- end of container -->    </div> <!-- end of slider-2 -->    <!-- end of testimonials -->    <!-- About -->    <div id='about' class='basic-4'>        <div class='container'>            <div class='row'>               <div class='col-lg-12'>                    <h2>About The Participants</h2>                    <p class='p-heading p-large'>See the faces appeared in the video</p>                </div> <!-- end of col -->            </div> <!-- end of row -->            ";

data=data+"<div class='row'>                <div class='col-lg-12'>                                        ";

let faces1="";


for(var t = 0;t<(jsonData2.summarizedInsights.faces).length;t++)
{
 
    faces1=faces1+"<!-- Team Member -->                    <div class='team-member'>                        <div class='image-wrapper'>                            <img class='img-fluid' src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/team-member-1.svg' alt='alternative'>                        </div> <!-- end of image-wrapper -->                        <p class='p-large'><strong>"+jsonData2.summarizedInsights.faces[t].name+"</strong></p>                        <p class='job-title'> appeares in "+((jsonData2.summarizedInsights.faces[t].seenDurationRatio)*100).toFixed(2)+"% of video </p>                       <span class='social-icons'>                            <span class='fa-stack'>                                <a href='#your-link'>                                    <i class='fas fa-circle fa-stack-2x facebook'></i>                                    <i class='fab fa-facebook-f fa-stack-1x'></i>                                </a>                            </span>                            <span class='fa-stack'>                                <a href='#your-link'>                                    <i class='fas fa-circle fa-stack-2x twitter'></i>                                    <i class='fab fa-twitter fa-stack-1x'></i>                                </a>                            </span>                        </span> <!-- end of social-icons -->                    </div> <!-- end of team-member -->                   <!-- end of team member -->                  ";
}


data=data+faces1+"</div> <!-- end of col -->           </div> <!-- end of row -->        </div> <!-- end of container -->    </div> <!-- end of basic-4 -->    <!-- end of about -->    ";

data=data+"<!-- Pricing -->    <div id='pricing' class='cards-2'>        <div class='container'>            <div class='row'>                <div class='col-lg-12'>                    <h2>Named Entities </h2>                    <p class='p-heading p-large'>We have calculated below list of entity details based on the voice of the speakers.</p>                </div> <!-- end of col -->            </div> <!-- end of row -->            <div class='row'>                <div class='col-lg-12'>                   ";
data=data+" <!-- Card-->                    <div class='card'>                        <div class='card-body'>                            <div class='card-title'> Named Locations </div>                            <div class='card-subtitle'>Below is the detailed analysis </div><hr class='cell-divide-hr'>                            <div class='price'>                                <span class='currency'></span><span class='value'>"+(jsonData2.summarizedInsights.namedLocations).length+"</span>                                <div class='frequency'></div>                            </div>                            <hr class='cell-divide-hr'>                            <ul class='list-unstyled li-space-lg'>                         ";

let y3="";


for(var y = 0;y<(jsonData2.summarizedInsights.namedLocations).length;y++)
{
 
    y3=y3+"                                   <li class='media'>                                    <i class='fas fa-check'></i><div class='media-body'><b>"+(jsonData2.summarizedInsights.namedLocations[y].name)+"</b></div>                                </li>      ";
    
}
data=data+y3+"         </ul>                            <div class='button-wrapper'>                                <a class='btn-solid-reg page-scroll' href='#request'>REQUEST</a>                           </div>                        </div>                    </div> <!-- end of card -->                    <!-- end of card -->                    ";

data=data+" <!-- Card-->                    <div class='card'>                        <div class='card-body'>                            <div class='card-title'> Brands </div>                            <div class='card-subtitle'>Below is the detailed analysis </div><hr class='cell-divide-hr'>                            <div class='price'>                                <span class='currency'></span><span class='value'>"+(jsonData2.summarizedInsights.brands).length+"</span>                                <div class='frequency'></div>                            </div>                            <hr class='cell-divide-hr'>                            <ul class='list-unstyled li-space-lg'>                         ";

let y5="";


for(var y = 0;y<(jsonData2.summarizedInsights.brands).length;y++)
{
 
    y5=y5+"                                   <li class='media'>                                    <i class='fas fa-check'></i><div class='media-body'><b>"+(jsonData2.summarizedInsights.brands[y].name)+"</b></div>                                </li>      ";
    
}
data=data+y5+"         </ul>                            <div class='button-wrapper'>                                <a class='btn-solid-reg page-scroll' href='#request'>REQUEST</a>                           </div>                        </div>                    </div> <!-- end of card -->                    <!-- end of card -->                    ";

data=data+" <!-- Card-->                    <div class='card'>                        <div class='card-body'>                            <div class='card-title'> Named People </div>                            <div class='card-subtitle'>Below is the detailed analysis </div><hr class='cell-divide-hr'>                            <div class='price'>                                <span class='currency'></span><span class='value'>"+(jsonData2.summarizedInsights.namedPeople).length+"</span>                                <div class='frequency'></div>                            </div>                            <hr class='cell-divide-hr'>                            <ul class='list-unstyled li-space-lg'>                         ";

let y6="";


for(var y = 0;y<(jsonData2.summarizedInsights.namedPeople).length;y++)
{
 
    y6=y6+"                                   <li class='media'>                                    <i class='fas fa-check'></i><div class='media-body'><b>"+(jsonData2.summarizedInsights.namedPeople[y].name)+"</b></div>                                </li>      ";
    
}
data=data+y6+"         </ul>                            <div class='button-wrapper'>                                <a class='btn-solid-reg page-scroll' href='#request'>REQUEST</a>                           </div>                        </div>                    </div> <!-- end of card -->                    <!-- end of card -->                    ";


data=data+"</div> <!-- end of col -->            </div> <!-- end of row -->        </div> <!-- end of container -->    </div> <!-- end of cards-2 -->    <!-- end of pricing --> ";

data=data+"   <!-- Footer -->    <div class='footer'>        <div class='container'>            <div class='row'>                <div class='col-md-4'>                    <div class='footer-col'>                        <h4>About V-Platform</h4>                        <p>We''re passionate about offering some of the best business growth services for startups</p>                    </div>                </div> <!-- end of col -->               <div class='col-md-4'>                    <div class='footer-col middle'>                        <h4>Important Links</h4>                        <ul class='list-unstyled li-space-lg'>                            <li class='media'>                                <i class='fas fa-square'></i>                                <div class='media-body'>Our business partners <a class='turquoise' href='#your-link'>startupguide.com</a></div>                            </li>                            <li class='media'>                                <i class='fas fa-square'></i>                                <div class='media-body'>Read our <a class='turquoise' href='terms-conditions.html'>Terms & Conditions</a>, <a class='turquoise' href='privacy-policy.html'>Privacy Policy</a></div>                            </li>                        </ul>                    </div>                </div> <!-- end of col -->               <div class='col-md-4'>                    <div class='footer-col last'>                        <h4>Social Media</h4>                        <span class='fa-stack'>                            <a href='#your-link'>                                <i class='fas fa-circle fa-stack-2x'></i>                                <i class='fab fa-facebook-f fa-stack-1x'></i>                            </a>                        </span>                        <span class='fa-stack'>                            <a href='#your-link'>                                <i class='fas fa-circle fa-stack-2x'></i>                                <i class='fab fa-twitter fa-stack-1x'></i>                            </a>                        </span>                       <span class='fa-stack'>                            <a href='#your-link'>                                <i class='fas fa-circle fa-stack-2x'></i>                                <i class='fab fa-google-plus-g fa-stack-1x'></i>                            </a>                        </span>                        <span class='fa-stack'>                            <a href='#your-link'>                                <i class='fas fa-circle fa-stack-2x'></i>                                <i class='fab fa-instagram fa-stack-1x'></i>                            </a>                        </span>                        <span class='fa-stack'>                            <a href='#your-link'>                                <i class='fas fa-circle fa-stack-2x'></i>                               <i class='fab fa-linkedin-in fa-stack-1x'></i>                            </a>                        </span>                    </div>                 </div> <!-- end of col -->            </div> <!-- end of row -->        </div> <!-- end of container -->    </div> <!-- end of footer -->      <!-- end of footer -->    <!-- Copyright -->    <div class='copyright'>        <div class='container'>            <div class='row'>               <div class='col-lg-12'>                    <p class='p-small'>Copyright Â© 2020 <a href='#'>V-Platform</a> - All rights reserved</p>                </div> <!-- end of col -->            </div> <!-- enf of row -->        </div> <!-- end of container -->    </div> <!-- end of copyright -->     <!-- end of copyright -->        	    <!-- Scripts -->    <script src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/jquery.min.js'></script> <!-- jQuery for Bootstrap''s JavaScript plugins -->    <script src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/popper.min.js'></script> <!-- Popper tooltip library for Bootstrap -->    <script src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/bootstrap.min.js'></script> <!-- Bootstrap framework -->    <script src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/jquery.easing.min.js'></script> <!-- jQuery Easing for smooth scrolling between anchors -->    <script src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/swiper.min.js'></script> <!-- Swiper for image and text sliders -->   <script src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/jquery.magnific-popup.js'></script> <!-- Magnific Popup for lightboxes -->    <script src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/validator.min.js'></script> <!-- Validator.js - Bootstrap plugin that validates forms -->    <script src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/scripts.js'></script> <!-- Custom scripts --></body></html>";
	res.send(data+"<br/><br/> <br/><br/><br/><br/><br/> <b>TRANSCRIPTS</b><br/><br/>"+text1);

  } 
  else
  {
  	processingProgress=jsonData2.videos[0].processingProgress;
  	res.send("Processing Progress ="+processingProgress+" Please try again in some time by clicking below button. "+"<body><a href='https://V-Platform.saurabhksinha90.repl.co/page3/?id="+videoId+"&main="+main.replace('https://www.youtube.com/watch?v=','')+"'><input type='button' id='sub' value='Insights' /> </a> </body><html>");
  }
  });
      
    });

    
});

app.get('/page5',(req,res)=>{
const videoId = req.query.id;
var main='';
 main = main+req.query.main;
let fetch = require("node-fetch");

var options = {
  "method": "GET",
  "headers": {
    "Ocp-Apim-Subscription-Key": "4734ccdd7bde438eb870a5cffdce5fe9",
   "Content-Type": "application/json"
  }
};

fetch('https://api.videoindexer.ai/Auth/trial/Accounts?generateAccessTokens=true&allowEdit=True',options).then(res => res.json())
    .then((jsontoken) => {
   console.log(jsontoken[0].accessToken);

fetch('https://api.videoindexer.ai/trial/Accounts/b3372de9-fd18-4e81-ac93-cdaeff9d5153/Videos/'+videoId+'/Index?reTranslate=False&includeStreamingUrls=True&accessToken='+jsontoken[0].accessToken)
  .then((res) => { 
    return res.json() ;
  })
  .then((jsonData2) => {
var processingProgress=0;
   
if((jsonData2.state) ==='Processed') {
	//res.send(jsonData2.state);
	var data="<!DOCTYPE html><html lang='en'><head>    <meta charset='utf-8'>    <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no'>        <!-- SEO Meta Tags -->    <meta name='description' content='Create a stylish landing page for your business startup and get leads for the offered services with this HTML landing page template.'>    <meta name='author' content='V-Platform'>    <!-- OG Meta Tags to improve the way the post looks when you share the page on LinkedIn, Facebook, Google+ -->	<meta property='og:site_name' content='' /> <!-- website name -->	<meta property='og:site' content='' /> <!-- website link -->	<meta property='og:title' content=''/> <!-- title shown in the actual shared post -->	<meta property='og:description' content='' /> <!-- description shown in the actual shared post -->	<meta property='og:image' content='' /> <!-- image link, make sure it''s jpg --><meta property='og:url' content='' /> <!-- where do you want your post to link to -->	<meta property='og:type' content='article' />    <!-- Website Title -->    <title>V-Platform Video Analytics</title>        <!-- Styles -->  <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.0.8/css/all.css'>  <link href='https://fonts.googleapis.com/css?family=Raleway:400,400i,600,700,700i&amp;subset=latin-ext' rel='stylesheet'>    <link href='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/bootstrap.css' rel='stylesheet'>    <link href='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/fontawesome-all.css' rel='stylesheet'>    <link href='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/swiper.css' rel='stylesheet'>	<link href='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/magnific-popup.css' rel='stylesheet'>	<link href='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/styles.css' rel='stylesheet'>		<!-- Favicon  -->   <link rel='icon' href='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/favicon1.png'></head><body data-spy='scroll' data-target='.fixed-top'>        <!-- Preloader -->	<div class='spinner-wrapper'>        <div class='spinner'>            <div class='bounce1'></div>            <div class='bounce2'></div>            <div class='bounce3'></div>        </div>    </div>    <!-- end of preloader -->       <!-- Navigation -->    <nav class='navbar navbar-expand-lg navbar-dark navbar-custom fixed-top'>        <!-- Text Logo - Use this if you don''t have a graphic logo -->        <!-- <a class='navbar-brand logo-text page-scroll' href='index.html'>V-Platform</a> -->        <!-- Image Logo -->        <a class='navbar-brand logo-image' href='https://V-Platform.saurabhksinha90.repl.co/check19'><img src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/logo.jpg' alt='alternative'></a>                <!-- Mobile Menu Toggle Button -->        <button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarsExampleDefault' aria-controls='navbarsExampleDefault' aria-expanded='false' aria-label='Toggle navigation'>            <span class='navbar-toggler-awesome fas fa-bars'></span>            <span class='navbar-toggler-awesome fas fa-times'></span>        </button>        <!-- end of mobile menu toggle button -->       <div class='collapse navbar-collapse' id='navbarsExampleDefault'>            <ul class='navbar-nav ml-auto'>                <li class='nav-item'>                    <a class='nav-link page-scroll' href='https://V-Platform.saurabhksinha90.repl.co/main_page'>Home <span class='sr-only'>(current)</span></a>                </li>                <li class='nav-item'>                    <a class='nav-link page-scroll' href='https://V-Platform.saurabhksinha90.repl.co/main_page'>URL Based</a>                </li>                <li class='nav-item'>                    <a class='nav-link page-scroll' href='https://V-Platform.saurabhksinha90.repl.co/upload_local'>File Upload</a>                </li>                <li class='nav-item'>                    <a class='nav-link page-scroll' href='https://V-Platform.saurabhksinha90.repl.co/page3/?id=517d533271'>Already Uploaded</a>                </li>               <!-- Dropdown Menu -->                          <li class='nav-item dropdown'>                    <a class='nav-link dropdown-toggle page-scroll' href='#about' id='navbarDropdown' role='button' aria-haspopup='true' aria-expanded='false'>About</a>                    <div class='dropdown-menu' aria-labelledby='navbarDropdown'>                        <a class='dropdown-item' href='terms-conditions.html'><span class='item-text'>Terms Conditions</span></a>                        <div class='dropdown-items-divide-hr'></div>                        <a class='dropdown-item' href='privacy-policy.html'><span class='item-text'>Privacy Policy</span></a>                    </div>                </li>                <!-- end of dropdown menu -->                <li class='nav-item'>                    <a class='nav-link page-scroll' href='#contact'>Contact</a>                </li>            </ul>           <span class='nav-item social-icons'>                <span class='fa-stack'>                    <a href='#your-link'>                        <i class='fas fa-circle fa-stack-2x facebook'></i>                        <i class='fab fa-facebook-f fa-stack-1x'></i>                    </a>                </span>                <span class='fa-stack'>                    <a href='#your-link'>                        <i class='fas fa-circle fa-stack-2x twitter'></i>                        <i class='fab fa-twitter fa-stack-1x'></i>                    </a>                </span>            </span>        </div>   </nav> <!-- end of navbar -->    <!-- end of navigation -->    <!-- Header -->    <header id='header' class='header'>        <div class='header-content'>            <div class='container'>                <div class='row'>                    <div class='col-lg-6'>                        <div class='text-container'>                            <h1>V-Platform<span class='turquoise'> Video Analytics</span> Report</h1>                           <p class='p-large'>";                            
	
	let keywords1="";
for(var p = 0;p< (jsonData2.videos[0].insights.keywords).length;p++)
{
  
    
    keywords1=keywords1+(jsonData2.videos[0].insights.keywords[p].text+' ').repeat(jsonData2.videos[0].insights.keywords[p].instances.length+' ');
}

let silence="NA"; 
let keywords="";
for(var j = 0;j< (jsonData2.videos[0].insights.keywords).length;j++)
{
  
    keywords=keywords+(jsonData2.videos[0].insights.keywords[j].text+' | '+ jsonData2.videos[0].insights.keywords[j].instances.length+'<br/>');
}

let faces="";
for(var k = 0;k<(jsonData2.summarizedInsights.faces).length;k++)
{
  
    faces=faces+jsonData2.summarizedInsights.faces[k].name+" appeares in "+((jsonData2.summarizedInsights.faces[k].seenDurationRatio)*100).toFixed(2)+"% of video <br/>";
}

let text1="";
for(var l = 0;l< (jsonData2.videos[0].insights.transcript).length;l++)
{
  
    //text1=text1+(jsonData2.videos[0].insights.transcript[l].text);
      text1=text1+  "<table><tr><td>"+"\n<b>	Speaker "+(jsonData2.videos[0].insights.transcript[l].speakerId)+"</b>: "+"</td><td>"+(jsonData2.videos[0].insights.transcript[l].text)+'</td></tr></table>';
}

 
 data=data+"<br/><b>Total Number of People in video:</b>"+jsonData2.summarizedInsights.faces.length+"<br/>";
if (((jsonData2.summarizedInsights.emotions).length)>0)
{
let text2="<br/><b>Emotions Analysis</b><br/>";
for(var l = 0;l< (jsonData2.summarizedInsights.emotions).length;l++)
{
  
    text2=text2+(jsonData2.summarizedInsights.emotions[l].type)+' '+((jsonData2.summarizedInsights.emotions[l].seenDurationRatio)*100).toFixed(2)+"%<br/>";
}
data=data+text2;
}
 
if (((jsonData2.summarizedInsights.sentiments).length)>0)
{
let text3="<br/><b>Sentiments Analysis</b><br/>";
for(var m = 0;m< (jsonData2.summarizedInsights.sentiments).length;m++)
{
  
    text3=text3+(jsonData2.summarizedInsights.sentiments[m].sentimentKey)+' '+((jsonData2.summarizedInsights.sentiments[m].seenDurationRatio)*100).toFixed(2)+"%<br/>";
}
data=data+text3;
}
if (((jsonData2.summarizedInsights.audioEffects).length)>0)
{
let text5="<br/><b>Audio Effects</b><br/>";

for(var n = 0;n< (jsonData2.summarizedInsights.audioEffects).length;n++)
{
  
    text5=text5+(jsonData2.summarizedInsights.audioEffects[n].audioEffectKey)+' '+((jsonData2.summarizedInsights.audioEffects[n].seenDurationRatio)*100).toFixed(2)+"%<br/>";
    silence=((jsonData2.summarizedInsights.audioEffects[n].seenDurationRatio)*100).toFixed(2)+"%<br/>";
}
data=data+text5;
}

	let keywords3="";
for(var p = 0;p< (jsonData2.videos[0].insights.keywords).length;p++)
{
  
    
    keywords3=keywords3+"<strong class='blue'>"+(jsonData2.videos[0].insights.keywords[p].text+'</strong> | ');
}
data=data+"<br/><b>Faces</b><br/>"+faces+"<br/><br/>"; 
 
data=data+"Click below to get <b>Word Cloud</b> generated from your video</p><a class='btn-solid-lg page-scroll' href='https://V-Platform.saurabhksinha90.repl.co/page19/?id="+keywords1+"'>Get Word Cloud</a>                        </div> <!-- end of text-container -->                   </div> <!-- end of col -->                    <div class='col-lg-6'>                        <div class='image-container'>                            <img class='img-fluid' src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/header-teamwork.svg' alt='alternative'>                        </div> <!-- end of image-container -->                    </div> <!-- end of col -->                </div> <!-- end of row -->            </div> <!-- end of container -->        </div> <!-- end of header-content -->    </header> <!-- end of header -->    <!-- end of header -->        <!-- Services -->    <div id='services' class='cards-1'>        <div class='container'>            <div class='row'>                <div class='col-lg-12'>                    <h2>Insight Details</h2>                    <p class='p-heading p-large'>Please find below more intelligent stats gathered from the video</p>                </div> <!-- end of col -->            </div> <!-- end of row -->           <div class='row'>                <div class='col-lg-12'>                    <!-- Card -->                    <div class='card'>                        <img class='card-image' src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/services-icon-1.svg' alt='alternative'>                        <div class='card-body'>                            <h4 class='card-title'>Total Participants</h4>                            <p>Total Number of Participants in the entire video is <h5>"+jsonData2.summarizedInsights.faces.length+"</h5></p>                        </div>                    </div>                    <!-- end of card -->                    <!-- Card -->                    <div class='card'>                       <img class='card-image' src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/services-icon-2.svg' alt='alternative'>                        <div class='card-body'>                            <h4 class='card-title'>Total Word Count</h4>                            <p>Total number of words spoken in the video is <h5>"+(text1.split(" ").length+1)+"</h5></p>                        </div>                    </div>                    <!-- end of card -->                    <!-- Card -->                    <div class='card'>                        <img class='card-image' src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/services-icon-3.svg' alt='alternative'>                        <div class='card-body'>                            <h4 class='card-title'>Audio Effects</h4>                            <p>Total silence detected during the entire video is <h5>"+silence+"</h5> </p>                        </div>                   </div>                    <!-- end of card -->                                    </div> <!-- end of col -->            </div> <!-- end of row -->        </div> <!-- end of container -->    </div> <!-- end of cards-1 -->    <!-- end of services -->    <!-- Details 1 -->    <div class='basic-1'>        <div class='container'>            <div class='row'>                <div class='col-lg-6'>                   <div class='text-container'>                        <h2>Top Keywords Used</h2>                        <p>";
data=data+keywords3+"</p>                        <a class='btn-solid-reg popup-with-move-anim' href='#details-lightbox-1'>More Details</a>                    </div> <!-- end of text-container -->                </div> <!-- end of col -->                <div class='col-lg-6'>                    <div class='image-container'>                        <img class='img-fluid' src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/details-1-office-worker.svg' alt='alternative'>                    </div> <!-- end of image-container -->                </div> <!-- end of col -->            </div> <!-- end of row -->        </div> <!-- end of container -->    </div> <!-- end of basic-1 -->    <!-- end of details 1 -->        ";
data=data+"<!-- Details 2 -->    <div class='basic-2'>        <div class='container'>            <div class='row'>                <div class='col-lg-6'>                    <div class='image-container'>                        <img class='img-fluid' src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/details-2-office-team-work.svg' alt='alternative'>                    </div> <!-- end of image-container -->                </div> <!-- end of col -->                <div class='col-lg-6'>                    <div class='text-container'>                        <h2>Topics Covered in the video</h2>                        <ul class='list-unstyled li-space-lg'>                            ";

let topics="";
if(((jsonData2.summarizedInsights.topics).length)>0)
{
for(var c = 0;c<(jsonData2.summarizedInsights.topics).length;c++)
{
  
    topics=topics+"<li class='media'>                               <i class='fas fa-check'></i>                                <div class='media-body'>"+jsonData2.summarizedInsights.topics[c].name+"</div>                            </li> ";
}
data=data+topics;
}
data=data+"</ul>                        <a class='btn-solid-reg popup-with-move-anim' href='#details-lightbox-2'>LIGHTBOX</a>                    </div> <!-- end of text-container -->                </div> <!-- end of col -->           </div> <!-- end of row -->        </div> <!-- end of container -->    </div> <!-- end of basic-2 -->    <!-- end of details 2 -->  ";
data=data+"  <!-- Details Lightboxes -->    <!-- Details Lightbox 1 -->	<div id='details-lightbox-1' class='lightbox-basic zoom-anim-dialog mfp-hide'>        <div class='container'>            <div class='row'>                <button title='Close (Esc)' type='button' class='mfp-close x-button'>Ã—</button>                <div class='col-lg-8'>                    <div class='image-container'>                        <img class='img-fluid' src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/details-lightbox-1.svg' alt='alternative'>                    </div> <!-- end of image-container -->               </div> <!-- end of col -->                <div class='col-lg-4'>                    <h3>More Details about Keywords</h3>                    <hr>                    <h5>Including Counts</h5>                                        <ul class='list-unstyled li-space-lg'>         ";

let keywords5="";
for(var s = 0;s< (jsonData2.videos[0].insights.keywords).length;s++)
{
  
    keywords5=keywords5+"<li class='media'>                            <i class='fas fa-check'></i><div class='media-body'>"+(jsonData2.videos[0].insights.keywords[s].text)+'<b> | '+(jsonData2.videos[0].insights.keywords[s].instances.length)+"</b></div>                        </li>";
}

data=data+keywords5+"               </ul>                    <a class='btn-solid-reg mfp-close page-scroll' href='#request'>REQUEST</a> <a class='btn-outline-reg mfp-close as-button' href='#screenshots'>BACK</a>                </div> <!-- end of col -->            </div> <!-- end of row -->       </div> <!-- end of container -->    </div> <!-- end of lightbox-basic -->    <!-- end of details lightbox 1 -->    <!-- Details Lightbox 2 -->	<div id='details-lightbox-2' class='lightbox-basic zoom-anim-dialog mfp-hide'>        <div class='container'>            <div class='row'>                <button title='Close (Esc)' type='button' class='mfp-close x-button'>Ã—</button>                <div class='col-lg-8'>                    <div class='image-container'>                        <img class='img-fluid' src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/details-lightbox-2.svg' alt='alternative'>                    </div> <!-- end of image-container -->                </div> <!-- end of col -->                <div class='col-lg-4'>                   <h3>Search To Optimize</h3>                    <hr>                    <h5>Core feature</h5>                    <p>The emailing module basically will speed up your email marketing operations while offering more subscriber control.</p>                    <p>Do you need to build lists for your email campaigns? It just got easier with Evolo.</p>                    <ul class='list-unstyled li-space-lg'>                        <li class='media'>                            <i class='fas fa-check'></i><div class='media-body'>List building framework</div>                        </li>                        <li class='media'>                            <i class='fas fa-check'></i><div class='media-body'>Easy database browsing</div>                        </li>                        <li class='media'>                            <i class='fas fa-check'></i><div class='media-body'>User administration</div>                        </li>                       <li class='media'>                            <i class='fas fa-check'></i><div class='media-body'>Automate user signup</div>                        </li>                        <li class='media'>                            <i class='fas fa-check'></i><div class='media-body'>Quick formatting tools</div>                        </li>                        <li class='media'>                            <i class='fas fa-check'></i><div class='media-body'>Fast email checking</div>                        </li>                    </ul>                    <a class='btn-solid-reg mfp-close page-scroll' href='#request'>REQUEST</a> <a class='btn-outline-reg mfp-close as-button' href='#screenshots'>BACK</a>                </div> <!-- end of col -->            </div> <!-- end of row -->        </div> <!-- end of container -->    </div> <!-- end of lightbox-basic -->   <!-- end of details lightbox 2 -->    <!-- end of details lightboxes -->  ";
data=data+"  <!-- Pricing -->    <div id='pricing' class='cards-2'>        <div class='container'>            <div class='row'>                <div class='col-lg-12'>                    <h2>Statistics based on Participants Voice </h2>                    <p class='p-heading p-large'>We''ve prepared statistics based on the voice of speakers in the video. This has details about the Speakers talk to listen ratio, Speakers longest monologue, word counts and number of fragments. We have calculated this based on the advanced voice analytics technology.</p>                </div> <!-- end of col -->            </div> <!-- end of row -->            <div class='row'>                <div class='col-lg-12'>                    ";

let y2="";

if((Object.keys(jsonData2.summarizedInsights.statistics.speakerTalkToListenRatio).length)>0)
{
for(var y = 0;y<Object.keys(jsonData2.summarizedInsights.statistics.speakerTalkToListenRatio).length;y++)
{
 
    y2=y2+"<!-- Card-->                    <div class='card'>                        <div class='card-body'>                            <div class='card-title'> Speaker "+Object.keys(jsonData2.summarizedInsights.statistics.speakerTalkToListenRatio)[y]+"</div>                            <div class='card-subtitle'>Below is the detailed analysis based on the voice of speaker "+Object.keys(jsonData2.summarizedInsights.statistics.speakerTalkToListenRatio)[y]+"</div>                            <hr class='cell-divide-hr'>                            <div class='price'>                                <span class='currency'></span><span class='value'>"+JSON.parse(jsonData2.summarizedInsights.statistics.speakerWordCount[Object.keys(jsonData2.summarizedInsights.statistics.speakerTalkToListenRatio)[y]])+"</span>                                <div class='frequency'>words</div>                            </div>                            <hr class='cell-divide-hr'>                            <ul class='list-unstyled li-space-lg'>                                <li class='media'>                                    <i class='fas fa-check'></i><div class='media-body'>Talk To listen Ratio is <b>"+JSON.parse(jsonData2.summarizedInsights.statistics.speakerTalkToListenRatio[Object.keys(jsonData2.summarizedInsights.statistics.speakerTalkToListenRatio)[y]])+"</b></div>                                </li>                               <li class='media'>                                    <i class='fas fa-check'></i><div class='media-body'>Longest Monolog <b>"+JSON.parse(jsonData2.summarizedInsights.statistics.speakerLongestMonolog[Object.keys(jsonData2.summarizedInsights.statistics.speakerTalkToListenRatio)[y]])+"</b></div>                                </li>                                <li class='media'>                                    <i class='fas fa-check'></i><div class='media-body'>Number of Fragments <b>"+JSON.parse(jsonData2.summarizedInsights.statistics.speakerNumberOfFragments[Object.keys(jsonData2.summarizedInsights.statistics.speakerTalkToListenRatio)[y]])+"</b></div>                                </li>                                <li class='media'>                                    <i class='fas fa-check'></i><div class='media-body'>Word Count <b>"+JSON.parse(jsonData2.summarizedInsights.statistics.speakerWordCount[Object.keys(jsonData2.summarizedInsights.statistics.speakerTalkToListenRatio)[y]])+"</b></div>                                </li>                            </ul>                            <div class='button-wrapper'>                                <a class='btn-solid-reg page-scroll' href='#request'>REQUEST</a>                           </div>                        </div>                    </div> <!-- end of card -->                    <!-- end of card -->                    ";
}
}

data=data+y2;
data=data+"</div> <!-- end of col -->            </div> <!-- end of row -->        </div> <!-- end of container -->    </div> <!-- end of cards-2 -->    <!-- end of pricing --> ";
data=data+"   <!-- Request -->    <div id='request' class='form-1'>        <div class='container'>            <div class='row'>                <div class='col-lg-6'>                   <div class='text-container'>                        <h2>Labels seen in the video</h2>                        <p>We could see labels in the video. </p>                        <ul class='list-unstyled li-space-lg'>                            ";
let labels1="";
for(var q = 0;q< (jsonData2.summarizedInsights.labels).length;q++)
{
  
    labels1=labels1+"<li class='media'>                                <i class='fas fa-check'></i>                                <div class='media-body'><strong class='blue'>"+(jsonData2.summarizedInsights.labels[q].name)+"</strong> </div>                            </li>                            ";
   
}

data=data+labels1;
   

data=data+"                     </ul>                    </div> <!-- end of text-container -->                </div> <!-- end of col -->                <div class='col-lg-6'>                    <div class='image-container'>                       <br/> <img class='img-fluid' src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/testimonials-2-men-talking.svg' alt='alternative'>                    </div> <!-- end of image-container -->                </div> <!-- end of col -->          </div> <!-- end of row -->        </div> <!-- end of container -->    </div> <!-- end of form-1 -->    <!-- end of request -->    ";



data=data+"<!-- Video -->    <div class='basic-3'>       <div class='container'>            <div class='row'>                <div class='col-lg-12'>                    <h2>Check Out The Video</h2>                </div> <!-- end of col -->            </div> <!-- end of row -->            <div class='row'>                <div class='col-lg-12'>                                        <!-- Video Preview -->                    <div class='image-container'>                        <div class='video-wrapper'>                            <a class='popup-youtube' href='https://www.youtube.com/watch?v="+main.replace('https://www.youtube.com/watch?v=','')+"' data-effect='fadeIn'>                                <img class='img-fluid' src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/video-frame.svg' alt='alternative'>                                <span class='video-play-button'>                                   <span></span>                                </span>                            </a>                        </div> <!-- end of video-wrapper -->                    </div> <!-- end of image-container -->                    <!-- end of video preview -->                    <p>You can revisit the video and see how our advanced video analytics based on face and voice of the participants help you take this to next level.</p>                </div> <!-- end of col -->            </div> <!-- end of row -->        </div> <!-- end of container -->    </div> <!-- end of basic-3 -->    <!-- end of video -->   <!-- Testimonials -->    <div class='slider-2'>        <div class='container'>            <div class='row'>                <div class='col-lg-6'>                    <div class='image-container'>                        <img class='img-fluid' src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/testimonials-2-men-talking.svg' alt='alternative'>                    </div> <!-- end of image-container -->                </div> <!-- end of col -->                <div class='col-lg-6'>                    <h2>Testimonials</h2>                    <!-- Card Slider -->                    <div class='slider-container'>                        <div class='swiper-container card-slider'>                           <div class='swiper-wrapper'>                                                                <!-- Slide -->                                <div class='swiper-slide'>                                    <div class='card'>                                        <img class='card-image' src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/testimonial-1.svg' alt='alternative'>                                        <div class='card-body'>                                            <p class='testimonial-text'>I just finished my trial period and was so amazed with the support and results that I purchased Evolo right away at the special price.</p>                                            <p class='testimonial-author'>Jude Thorn - Designer</p>                                        </div>                                    </div>                                </div> <!-- end of swiper-slide -->                                <!-- end of slide -->                                        <!-- Slide -->                               <div class='swiper-slide'>                                    <div class='card'>                                        <img class='card-image' src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/testimonial-2.svg' alt='alternative'>                                        <div class='card-body'>                                            <p class='testimonial-text'>Evolo has always helped or startup to position itself in the highly competitive market of mobile applications. You will not regret using it!</p>                                            <p class='testimonial-author'>Marsha Singer - Developer</p>                                        </div>                                    </div>                                        </div> <!-- end of swiper-slide -->                                <!-- end of slide -->                                        <!-- Slide -->                                <div class='swiper-slide'>                                    <div class='card'>                                        <img class='card-image' src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/testimonial-3.svg' alt='alternative'>                                       <div class='card-body'>                                            <p class='testimonial-text'>Love their services and was so amazed with the support and results that I purchased Evolo for two years in a row. They are awesome.</p>                                            <p class='testimonial-author'>Roy Smith - Marketer</p>                                        </div>                                    </div>                                        </div> <!-- end of swiper-slide -->                                <!-- end of slide -->                                                           </div> <!-- end of swiper-wrapper -->                                    <!-- Add Arrows -->                            <div class='swiper-button-next'></div>                            <div class='swiper-button-prev'></div>                            <!-- end of add arrows -->                               </div> <!-- end of swiper-container -->                    </div> <!-- end of slider-container -->                    <!-- end of card slider -->                </div> <!-- end of col -->            </div> <!-- end of row -->        </div> <!-- end of container -->    </div> <!-- end of slider-2 -->    <!-- end of testimonials -->    <!-- About -->    <div id='about' class='basic-4'>        <div class='container'>            <div class='row'>               <div class='col-lg-12'>                    <h2>About The Participants</h2>                    <p class='p-heading p-large'>See the faces appeared in the video</p>                </div> <!-- end of col -->            </div> <!-- end of row -->            ";

data=data+"<div class='row'>                <div class='col-lg-12'>                                        ";

let faces1="";


for(var t = 0;t<(jsonData2.summarizedInsights.faces).length;t++)
{
 
    faces1=faces1+"<!-- Team Member -->                    <div class='team-member'>                        <div class='image-wrapper'>                            <img class='img-fluid' src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/team-member-1.svg' alt='alternative'>                        </div> <!-- end of image-wrapper -->                        <p class='p-large'><strong>"+jsonData2.summarizedInsights.faces[t].name+"</strong></p>                        <p class='job-title'> appeares in "+((jsonData2.summarizedInsights.faces[t].seenDurationRatio)*100).toFixed(2)+"% of video </p>                       <span class='social-icons'>                            <span class='fa-stack'>                                <a href='#your-link'>                                    <i class='fas fa-circle fa-stack-2x facebook'></i>                                    <i class='fab fa-facebook-f fa-stack-1x'></i>                                </a>                            </span>                            <span class='fa-stack'>                                <a href='#your-link'>                                    <i class='fas fa-circle fa-stack-2x twitter'></i>                                    <i class='fab fa-twitter fa-stack-1x'></i>                                </a>                            </span>                        </span> <!-- end of social-icons -->                    </div> <!-- end of team-member -->                   <!-- end of team member -->                  ";
}


data=data+faces1+"</div> <!-- end of col -->           </div> <!-- end of row -->        </div> <!-- end of container -->    </div> <!-- end of basic-4 -->    <!-- end of about -->    ";

data=data+"<!-- Pricing -->    <div id='pricing' class='cards-2'>        <div class='container'>            <div class='row'>                <div class='col-lg-12'>                    <h2>Named Entities </h2>                    <p class='p-heading p-large'>We have calculated below list of entity details based on the voice of the speakers.</p>                </div> <!-- end of col -->            </div> <!-- end of row -->            <div class='row'>                <div class='col-lg-12'>                   ";
data=data+" <!-- Card-->                    <div class='card'>                        <div class='card-body'>                            <div class='card-title'> Named Locations </div>                            <div class='card-subtitle'>Below is the detailed analysis </div><hr class='cell-divide-hr'>                            <div class='price'>                                <span class='currency'></span><span class='value'>"+(jsonData2.summarizedInsights.namedLocations).length+"</span>                                <div class='frequency'></div>                            </div>                            <hr class='cell-divide-hr'>                            <ul class='list-unstyled li-space-lg'>                         ";

let y3="";


for(var y = 0;y<(jsonData2.summarizedInsights.namedLocations).length;y++)
{
 
    y3=y3+"                                   <li class='media'>                                    <i class='fas fa-check'></i><div class='media-body'><b>"+(jsonData2.summarizedInsights.namedLocations[y].name)+"</b></div>                                </li>      ";
    
}
data=data+y3+"         </ul>                            <div class='button-wrapper'>                                <a class='btn-solid-reg page-scroll' href='#request'>REQUEST</a>                           </div>                        </div>                    </div> <!-- end of card -->                    <!-- end of card -->                    ";

data=data+" <!-- Card-->                    <div class='card'>                        <div class='card-body'>                            <div class='card-title'> Brands </div>                            <div class='card-subtitle'>Below is the detailed analysis </div><hr class='cell-divide-hr'>                            <div class='price'>                                <span class='currency'></span><span class='value'>"+(jsonData2.summarizedInsights.brands).length+"</span>                                <div class='frequency'></div>                            </div>                            <hr class='cell-divide-hr'>                            <ul class='list-unstyled li-space-lg'>                         ";

let y5="";


for(var y = 0;y<(jsonData2.summarizedInsights.brands).length;y++)
{
 
    y5=y5+"                                   <li class='media'>                                    <i class='fas fa-check'></i><div class='media-body'><b>"+(jsonData2.summarizedInsights.brands[y].name)+"</b></div>                                </li>      ";
    
}
data=data+y5+"         </ul>                            <div class='button-wrapper'>                                <a class='btn-solid-reg page-scroll' href='#request'>REQUEST</a>                           </div>                        </div>                    </div> <!-- end of card -->                    <!-- end of card -->                    ";

data=data+" <!-- Card-->                    <div class='card'>                        <div class='card-body'>                            <div class='card-title'> Named People </div>                            <div class='card-subtitle'>Below is the detailed analysis </div><hr class='cell-divide-hr'>                            <div class='price'>                                <span class='currency'></span><span class='value'>"+(jsonData2.summarizedInsights.namedPeople).length+"</span>                                <div class='frequency'></div>                            </div>                            <hr class='cell-divide-hr'>                            <ul class='list-unstyled li-space-lg'>                         ";

let y6="";


for(var y = 0;y<(jsonData2.summarizedInsights.namedPeople).length;y++)
{
 
    y6=y6+"                                   <li class='media'>                                    <i class='fas fa-check'></i><div class='media-body'><b>"+(jsonData2.summarizedInsights.namedPeople[y].name)+"</b></div>                                </li>      ";
    
}
data=data+y6+"         </ul>                            <div class='button-wrapper'>                                <a class='btn-solid-reg page-scroll' href='#request'>REQUEST</a>                           </div>                        </div>                    </div> <!-- end of card -->                    <!-- end of card -->                    ";


data=data+"</div> <!-- end of col -->            </div> <!-- end of row -->        </div> <!-- end of container -->    </div> <!-- end of cards-2 -->    <!-- end of pricing --> ";

data=data+"   <!-- Footer -->    <div class='footer'>        <div class='container'>            <div class='row'>                <div class='col-md-4'>                    <div class='footer-col'>                        <h4>About Viewlytics</h4>                        <p>We''re passionate about offering some of the best business growth services for startups</p>                    </div>                </div> <!-- end of col -->               <div class='col-md-4'>                    <div class='footer-col middle'>                        <h4>Important Links</h4>                        <ul class='list-unstyled li-space-lg'>                            <li class='media'>                                <i class='fas fa-square'></i>                                <div class='media-body'>Our business partners <a class='turquoise' href='#your-link'>startupguide.com</a></div>                            </li>                            <li class='media'>                                <i class='fas fa-square'></i>                                <div class='media-body'>Read our <a class='turquoise' href='terms-conditions.html'>Terms & Conditions</a>, <a class='turquoise' href='privacy-policy.html'>Privacy Policy</a></div>                            </li>                        </ul>                    </div>                </div> <!-- end of col -->               <div class='col-md-4'>                    <div class='footer-col last'>                        <h4>Social Media</h4>                        <span class='fa-stack'>                            <a href='#your-link'>                                <i class='fas fa-circle fa-stack-2x'></i>                                <i class='fab fa-facebook-f fa-stack-1x'></i>                            </a>                        </span>                        <span class='fa-stack'>                            <a href='#your-link'>                                <i class='fas fa-circle fa-stack-2x'></i>                                <i class='fab fa-twitter fa-stack-1x'></i>                            </a>                        </span>                       <span class='fa-stack'>                            <a href='#your-link'>                                <i class='fas fa-circle fa-stack-2x'></i>                                <i class='fab fa-google-plus-g fa-stack-1x'></i>                            </a>                        </span>                        <span class='fa-stack'>                            <a href='#your-link'>                                <i class='fas fa-circle fa-stack-2x'></i>                                <i class='fab fa-instagram fa-stack-1x'></i>                            </a>                        </span>                        <span class='fa-stack'>                            <a href='#your-link'>                                <i class='fas fa-circle fa-stack-2x'></i>                               <i class='fab fa-linkedin-in fa-stack-1x'></i>                            </a>                        </span>                    </div>                 </div> <!-- end of col -->            </div> <!-- end of row -->        </div> <!-- end of container -->    </div> <!-- end of footer -->      <!-- end of footer -->    <!-- Copyright -->    <div class='copyright'>        <div class='container'>            <div class='row'>               <div class='col-lg-12'>                    <p class='p-small'>Copyright Â© 2020 <a href='https://V-Platform.com'>V-Platform</a> - All rights reserved</p>                </div> <!-- end of col -->            </div> <!-- enf of row -->        </div> <!-- end of container -->    </div> <!-- end of copyright -->     <!-- end of copyright -->        	    <!-- Scripts -->    <script src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/jquery.min.js'></script> <!-- jQuery for Bootstrap''s JavaScript plugins -->    <script src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/popper.min.js'></script> <!-- Popper tooltip library for Bootstrap -->    <script src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/bootstrap.min.js'></script> <!-- Bootstrap framework -->    <script src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/jquery.easing.min.js'></script> <!-- jQuery Easing for smooth scrolling between anchors -->    <script src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/swiper.min.js'></script> <!-- Swiper for image and text sliders -->   <script src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/jquery.magnific-popup.js'></script> <!-- Magnific Popup for lightboxes -->    <script src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/validator.min.js'></script> <!-- Validator.js - Bootstrap plugin that validates forms -->    <script src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/scripts.js'></script> <!-- Custom scripts --></body></html>";
	res.send(data+"<br/><br/> <br/><br/><br/><br/><br/> <b>TRANSCRIPTS</b><br/><br/>"+text1);

  } 
  else
  {
  	processingProgress=jsonData2.videos[0].processingProgress;
  	res.send("Processing Progress ="+processingProgress+" Please try again in some time by clicking below button. "+"<body><a href='https://V-Platform.saurabhksinha90.repl.co/page3/?id="+videoId+"&main="+main.replace('https://www.youtube.com/watch?v=','')+"'><input type='button' id='sub' value='Insights' /> </a> </body><html>");
  }
  });
      
    });

    
});


app.get( '/videoanalytics', ( req, res ) => {
	let fetch = require("node-fetch");
var options = {
  "method": "GET",
  "headers": {
   "Content-Type": "application/json"
  }
};
fetch('https://www.googleapis.com/youtube/v3/search?key=AIzaSyBxRQ4sURZO5epIPPYMlkDhqo2ZxPXSz60&channelId=UCvDOfCgmS7q4OYMKVpy5Xjw&part=snippet,id&order=date&maxResults=20',options).then(res => res.json())
    .then((jsonData) => {
   //console.log(JSON.stringify(jsonData));
let text1='';
   for(var i = 0;i< jsonData.items.length;i++)
{
  
    text1=text1+" "+(i+1)+" "+(jsonData.items[i].snippet.title)+'\n'
    +"https://www.youtube.com/watch?v="+(jsonData.items[i].id.videoId)+'\n';
}
console.log(text1);
res.send(text1);
  });
    //res.sendFile( __dirname + '/video.html' );
} );


app.get('/transcript',(req, res) => {
	let fetch = require("node-fetch");
var options = {
  "method": "GET",
  "headers": {
    "Ocp-Apim-Subscription-Key": "fe9c381f1ff3483cb3d8cbbc5c72d943",
   "Content-Type": "application/json"
  }
};
fetch('https://api.videoindexer.ai/Auth/trial/Accounts?generateAccessTokens=true&allowEdit=False',options).then(res => res.json())
    .then((jsontoken) => {
   console.log(jsontoken[0].accessToken);
   fetch('https://api.videoindexer.ai/trial/Accounts/324517cb-f57f-4b61-a5b1-6c85051b92c0/Videos/517d533271/Index?reTranslate=False&includeStreamingUrls=True&accessToken='+jsontoken[0].accessToken)
  .then((res) => { 
    return res.json() 
  })
  .then((jsonData) => {
   console.log(jsonData);
let text="<H1> Transcript from Meeting: <b>Transforming Finance_ Tech Is Everywhere <b></h1><br><a href='https://milkeninstitute.org/events/global-conference-2020/livestream/Transforming-Finance-Tech-Everywhere'><img src='https://saurabhksinha.s3.jp-tok.cloud-object-storage.appdomain.cloud/milken.JPG' height='37%' width='46%'/></a><br>Video Link: <a href='https://milkeninstitute.org/events/global-conference-2020/livestream/Transforming-Finance-Tech-Everywhere' style='font-size:12px'>https://milkeninstitute.org/events/global-conference-2020/livestream/Transforming-Finance-Tech-Everywhere</a> <br><br><table>";
let speaker="";
for(var i = 0;i< jsonData.videos[0].insights.transcript.length;i++)
{
	if(jsonData.videos[0].insights.transcript[i].speakerId==1)
	 {speaker="Matt Brown";}
	else if(jsonData.videos[0].insights.transcript[i].speakerId==2) 
	{speaker="Eli Rosner";}
	else if(jsonData.videos[0].insights.transcript[i].speakerId==3) 
	{speaker="Mohit Joshi";}
	else if(jsonData.videos[0].insights.transcript[i].speakerId==4) 
	{speaker="Melissa Koide";}
	else if(jsonData.videos[0].insights.transcript[i].speakerId==5) 
	{speaker="Munish Varma";}
	
	
  
    text=text+"<tr><td>"+"\n<b>"+speaker+"</b>: "+"</td><td>"+(jsonData.videos[0].insights.transcript[i].text)+'</td></tr>';
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


io.of( '/stream' ).on( 'connection', stream );
var appEnv = cfenv.getAppEnv();
server.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
