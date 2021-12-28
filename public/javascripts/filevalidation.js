function fileValidation() {
    console.log("I'm inside")
    var fileInput = 
    document.getElementById('file');
    var filePath = fileInput.value;
    
    // Allowing file type
    var allowedExtensions = /(\.json)$/i;
    if (!allowedExtensions.exec(filePath)) {
        alert('Invalid file type');
        fileInput.value = '';
        return false;
    } 
    else 
    {
        // Image preview
        if (fileInput.files && fileInput.files[0]) {
            // Create a new FileReader() object
	        let reader = new FileReader();

            // Setup the callback event to run when the file is read
	        reader.onload = logFile;

            // Read the file
            reader.readAsText(file.files[0]);

            alert(fileInput.files[0].value)
            
        }
    }
}
function logFile (event) {
	let str = event.target.result;
	let json = JSON.parse(str);
	console.log('string', str);
	console.log('json', json);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(json);

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://localhost:3000/uploadfile", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}