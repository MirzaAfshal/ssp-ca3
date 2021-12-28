const Submitdata = (e) =>{
    console.log(e)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "filename": "afshal",
    "password": "adsffs"
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://localhost:3000/uploaddata", requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log("Here is the result->",result)
    })
    .catch(error => console.log('error', error));
    e.preventDefault();
}