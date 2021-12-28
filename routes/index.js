var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
const querystring = require('querystring'); 
const { IfExist } =  require('../FileOperations/IFExist')
const { AddData } = require('../FileOperations/AddDataToFile')
const { RandomString } = require('../FileOperations/GenerateRandomString')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Upload FileName */
router.post('/uploadfilename', async(req, res) => {
  var FileName = req.body.name.toLowerCase();
  var PassWord =  req.body.pass;
  var GeneratedString = await RandomString();
  var FileExist = await IfExist(FileName, GeneratedString, PassWord);


  console.log("File Name ->",FileName)
  if(FileExist){
    console.log("This file already exist")
    res.send({"status":"failed", "reason":"file already exist with these credentials"})
  }
  else{
    fs.writeFile(path.join(__dirname,"../UserFiles",FileName+'-'+GeneratedString+'-'+PassWord+'-File.json'),"", err => {
      if (err) {
        console.error(err)
        return
      }
    })
    /* for send data as querystring in url */
    var string = querystring.stringify({"status":"success", "Filename": FileName+'-'+GeneratedString, "password": PassWord});
    res.redirect('/dashboard/?' + string);
  }
})
/* UploadRecord in File */
router.get('/dashboard/', async (req,res) =>{
  /* we can receive the data from url query string */
  /* also we couldn't render using put method */
  var data = req.query;
  res.render('dashboard', data)
  // var data = req.body.record
  // var timer = new Date().getTime()
  // var secret = { }
  // secret[timer] = data;
  // await AddData(secret);
})

/* endpoint for adding data into the file */

router.post('/uploaddata', (req,res) => {
  console.log("here is the datt ->",req.body)
  res.render('dashboard')

})

module.exports = router;
