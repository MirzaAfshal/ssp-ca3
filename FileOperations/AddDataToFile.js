const fs = require('fs');
var path= require('path');
const AddData = (data) =>{
    console.log("from function ->",data)
    return new Promise((resolve, reject) => {
        var exists = false
        fs.readdir(
            path.resolve(__dirname, '../UserFiles'),
            (err, files) => {
                if (err) throw err;

                for (let file of files) {
                    console.log(file)
                    console.log(file.split('-'))
                    var ExistFileName = file.split('-')[0];
                    var ExistFilePassWord = file.split('-')[1];
                    if(ExistFileName === 'Muhammad Hamza' && ExistFilePassWord == '12345' )
                    {
                        console.log("hye")
                        fs.readFile(path.resolve(__dirname, '../UserFiles','Muhammad Hamza-12345-File.json'), 'utf-8', function(err, content) {
                            if (err) {
                                return;
                            }
                            else{
                                console.log("inside->",content)
                                var filedata = JSON.parse(content);
                                console.log(filedata[0])
                                filedata.push(data)
                                console.log(filedata)
                                fs.writeFile(path.join(__dirname,"../UserFiles",'Muhammad Hamza-12345-File.json'), JSON.stringify(filedata), err => {
                                    if (err) {
                                      console.error(err)
                                      return
                                    }
                                })
                            }
                          });
                        exists = true
                    }
                }
                resolve(exists)
            }
        );
    })
}

module.exports.AddData = AddData