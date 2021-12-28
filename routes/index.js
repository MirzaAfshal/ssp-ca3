var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
const { IfExist } =  require('../FileOperations/IFExist')
const { AddData } = require('../FileOperations/AddDataToFile')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* UploadData in File */
router.post('/uploaddata', async(req, res) => {
  var FileName = req.body.name;
  var PassWord =  req.body.pass;
  var FileExist = await IfExist(FileName,PassWord);
  console.log("File Exist ->",FileName)
  if(FileExist){
    console.log("This file already exist")
    res.send({"status":"failed", "reason":"file already exist with these credentials"})
  }
  else{
    fs.writeFile(path.join(__dirname,"../UserFiles",FileName+'-'+PassWord+'-File.json'),"", err => {
      if (err) {
        console.error(err)
        return
      }
    })
    res.render('dashboard',{"status":"success", "Filename": FileName+'-'+PassWord+'-File.json', "password": PassWord})
  }
})

/* UploadRecord in File */
router.put('/uploadrecord', async (req,res) =>{
  console.log("inside ->",req.body);

  var data = req.body.record
  var timer = new Date().getTime()
  var secret = { }
  secret[timer] = data;
  await AddData(secret);
})

module.exports = router;
