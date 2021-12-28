const fs = require('fs');
var path= require('path');
const IfExist = (filename, password) => {
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
                    if(ExistFileName === filename && ExistFilePassWord == password )
                    {
                        console.log("This file already Exist with this name ->",ExistFileName,ExistFilePassWord);
                        exists = true
                    }
                }
                resolve(exists)
            }
        );
    })
}

module.exports.IfExist = IfExist