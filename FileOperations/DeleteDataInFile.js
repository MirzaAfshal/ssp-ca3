const fs = require('fs');
var path= require('path');
const DeleteData = (data) =>{
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
                    var ExistFilePassWord = file.split('-')[2];
                    if(ExistFileName === 'muhammad afshal' && ExistFilePassWord == '1234' )
                    {
                        console.log("hye")
                        fs.readFile(path.resolve(__dirname, '../UserFiles','muhammad afshal-uKqAhCfbTF-1234-File.json'), 'utf-8', function(err, content) {
                            if (err) {
                                return;
                            }
                            else{
                                if(content != ""){
                                    console.log("inside->",content)
                                    var filedata = JSON.parse(content);
                                    console.log(filedata)
                                    // filedata.push(data)
                                    /* for adding values in already existing object */
                                    for (const [key, value] of Object.entries(data)) {
                                        delete filedata[key]
                                    }
                                    console.log(filedata)
                                    fs.writeFile(path.join(__dirname,"../UserFiles",'muhammad afshal-uKqAhCfbTF-1234-File.json'), JSON.stringify(filedata), err => {
                                        if (err) {
                                          console.error(err)
                                          return 
                                        }
                                    })
                                }
                                else{
                                    console.log("------------")
                                    fs.appendFile(path.join(__dirname,"../UserFiles",'muhammad afshal-uKqAhCfbTF-1234-File.json'),JSON.stringify(data), 'utf8',
                                    // callback function
                                    function(err) {     
                                        if (err) throw err;
                                        // if no error
                                        console.log("Data is appended to file successfully.")
                                    });
                                }
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

module.exports.DeleteData = DeleteData