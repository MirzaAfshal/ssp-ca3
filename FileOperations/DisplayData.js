const fs = require('fs');
var path= require('path');
const DisplayData = (FileName, AutoGeneratedString, FilePassword) =>{
    console.log("from function ->",FileName, AutoGeneratedString, FilePassword)
    return new Promise((resolve, reject) => {
        fs.readdir(
            path.resolve(__dirname, '../UserFiles'),
            (err, files) => {
                if (err) throw err;
                for (let file of files) {
                    console.log(file)
                    console.log(file.split('-'))
                    var ExistFileName = file.split('-')[0];
                    var RandomString = file.split('-')[1];
                    var ExistFilePassWord = file.split('-')[2];
                    console.log("----------",typeof (ExistFileName),typeof(FileName),ExistFileName,FileName.length,FileName.trim().length )
                    if(ExistFileName === FileName.trim() && RandomString === AutoGeneratedString && ExistFilePassWord === FilePassword)
                    {
                        console.log("hye")
                        fs.readFile(path.resolve(__dirname, '../UserFiles',ExistFileName+'-'+RandomString+'-'+ExistFilePassWord+'-File.json'), 'utf-8', function(err, content) {
                            if (err) {
                                return;
                            }
                            else{
                                if(content != ""){
                                    console.log("inside->",content)
                                    var filedata = JSON.parse(content);
                                    resolve(filedata)
                                }
                                else{
                                    console.log("------------")
                                    resolve("")
                                }
                            }
                        });
                    }
                }
            }
        );
    })
}

module.exports.DisplayData = DisplayData