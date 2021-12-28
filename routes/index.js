var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
const querystring = require('querystring'); 
const { IfExist } =  require('../FileOperations/IFExist')
const { AddData } = require('../FileOperations/AddDataToFile')
const { UpdateData } = require('../FileOperations/UpdateDataInFile')
const { DeleteData } = require('../FileOperations/DeleteDataInFile')
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
})

/* endpoint for adding data into the file */

router.post('/uploaddata', async (req,res) => {
  var data  =  JSON.parse(JSON.stringify(req.body))
  var DataToInsert = {}
  if(typeof(data.signinemail) === "string"){
    console.log("string here",data.signinemail)
    var randkey = Math.floor(Math.random() * 10000000000000000);
    DataToInsert[randkey] = data.signinemail;
    await AddData(DataToInsert);
  }
  else if(typeof(data.signinemail) === "object"){
    data.signinemail.map(e => {
      var randkey = Math.floor(Math.random() * 10000000000000000);
      DataToInsert[randkey] = e;
    })
    await AddData(DataToInsert);
  }
  res.redirect('/dashboard')
})

/* endpoint for update data into the file */
router.put('/modifyrecord/:tag', async (req, res) =>{
  console.log(req.params.tag, req.body)
  var data = req.body;
  if(req.params.tag === "delete"){
    await DeleteData(data)
  }
  else{
    await UpdateData(data)
  }
})

module.exports = router;
