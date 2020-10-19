var DriveBaseUrl        = 'https://www.googleapis.com/';
var DriveDiscoveryUrl   = 'discovery/v1/apis/drive/v3/rest';
var DriveListUrl        = 'drive/v3/files?';
var DriveReadUrl        = 'drive/v3/files/';
var DriveWriteUrl       = 'upload/drive/v3/files/';
var DriveRenameUrl      = 'https://content.googleapis.com/drive/v3/files/';

// discovery - fetch
fetch(
    DriveBaseUrl + DriveDiscoveryUrl,
    {
        method: 'GET',
        async: true,
        headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
        },
        'contentType': 'json'
    }
).then(
    (response) => response.json()
).then(function(respJson) {
    console.log(respJson);    
}).catch(function(error) {
    console.log(error);
});

// list files - fetch
fetch(
    DriveBaseUrl + DriveListUrl + 
        "q='root' in parents" + " and " +
        "(mimeType = 'text/plain')" + " and " +
        "name contains 'SOMETHING'",
    {
        method: 'GET',
        async: true,
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        }
    }
).then(
    (response) => response.json()
).then(function(respJson) {
    console.log(respJson);
}).catch(function(error) {
    console.log(error);
});

// read file - fetch
fetch(
    DriveBaseUrl + DriveReadUrl + fileId + '?alt=media',
    {
        method: 'GET',
        // async: true,
        headers: {
            Authorization: 'Bearer ' + token,
            'Accept': 'application/json'
        }
    }
).then(response => response.arrayBuffer()
// ).then(response => response.text()
).then(function(respRaw) {
    console.log(respRaw);
}).catch(function(error) {
    console.log(error);
});

// read file - XMLHttpRequest
var xhr = new XMLHttpRequest();
xhr.open(
    'GET', 
    DriveBaseUrl + DriveReadUrl + fileId + '?alt=media',
    // true
    );
xhr.setRequestHeader('Authorization', 'Bearer ' + token);
xhr.setRequestHeader('Accept', 'application/json');
xhr.responseType = 'arraybuffer';
xhr.onload = function(e) {
    let responseData = this.response;
    console.log(responseData);
};
xhr.onerror = function() {
//   callback(null);
    console.log('responseFailed');
};
xhr.send();

// rename file - fetch
fetch(
    DriveRenameUrl + fileId + '?alt=json',                            
    {
        method: 'PATCH',
        headers: {
            Authorization: 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': FilenameString
        })
    }
).then(response => response.text()
).then(function(respText) {
    console.log(respText);
}).catch(function(error) {
    console.log(error);
});

// write file - update with Array Buffer                        
fetch(
    DriveBaseUrl + DriveWriteUrl + fileId,
    {
        method: 'PATCH',
        headers: {
            Authorization: 'Bearer ' + token,
            'Accept': 'text/plain',
            'Content-Type': 'text/plain'
        },
        body: ContentArrayBuffer
    }
).then(response => response.text()
).then(function(respText) {
    console.log(respText);
}).catch(function(error) {
    console.log(error);
});