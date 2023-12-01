let tokenFileString;

function generatePostRequest() {
    // Get the form data
    let tokenEndpoint = document.getElementById("token-endpoint").value;
    let clientSecret = document.getElementById("client-secret").value;
    let clientId = document.getElementById("client-id").value;
    let authorizationCode = document.getElementById("auth-code").value;
    let redirectUri = document.getElementById("redirect-uri").value;

    // Generate the cURL request
    let curlCommand =  "curl -X POST " + tokenEndpoint + " \\"
    + "\n -d grant_type=authorization_code \\"
    + "\n -d redirect_uri=" + redirectUri + " \\"
    + "\n -d client_id=" + clientId + " \\"
    + "\n -d client_secret=" + clientSecret + " \\"
    + "\n -d code=" + authorizationCode;

    document.getElementById("curl-command").value = curlCommand;

    // Enable the execute button
    document.getElementById("execute-post-request").disabled = false;
    document.getElementById("copy-curl-command").disabled = false;
}

function copyCurlCommand() {
    let curlCommand = document.getElementById("curl-command").value;
    navigator.clipboard.writeText(curlCommand);
}

function executePostRequest() {
    let tokenEndpoint = document.getElementById("token-endpoint").value;
    let clientSecret = document.getElementById("client-secret").value;
    let clientId = document.getElementById("client-id").value;
    let authorizationCode = decodeURIComponent(document.getElementById("auth-code").value);
    let redirectUri = decodeURIComponent(getCookie("redirect_uri"));

    let data = new URLSearchParams({
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
        code: authorizationCode
    });

    console.log(data);

    fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    })
    .then(response => response.json())
    .then(responseData => {
        console.log(responseData);
        generateTokenFileString(responseData);
    })
    .catch(error => {
        console.error(error);
    })
    .finally(() => {
        document.getElementById("execute-post-request").disabled = true;
    });
}

function generateTokenFileString(responseData) {
    let refreshToken = responseData.refresh_token || ""; // Insert a blank string if refresh_token is not present

    let tokenFile = {
        token: responseData.access_token,
        refresh_token: refreshToken,
        token_uri: document.getElementById("token-endpoint").value,
        client_id: document.getElementById("client-id").value,
        client_secret: document.getElementById("client-secret").value,
        scopes: responseData.scope.split(" "),
        expiry: new Date(Date.now() + responseData.expires_in * 1000).toISOString(),
    }

    tokenFileString = JSON.stringify(tokenFile, null, 4);

    document.getElementById("download-token-file").disabled = false;
}

function downloadTokenFile() {
    if (tokenFileString) {
        let blob = new Blob([tokenFileString], {type: "text/plain;charset=utf-8"});
        let url = URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = 'token.json';
        a.click();
    } else {
        console.log('No token file to download');
    }
}

function populateFromCookies() {
    let token_ep = getCookie("token_ep");
    let client_secret = getCookie("client_secret");
    let client_id = getCookie("client_id");

    document.getElementById("token-endpoint").value = token_ep;
    document.getElementById("client-secret").value = client_secret;
    document.getElementById("client-id").value = client_id;
    document.getElementById("redirect-uri").value = getCookie("redirect_uri");
}

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return "";
}

function extractCodeFromURL() {
    let url = window.location.href;
    let code = url.split("code=")[1].split("&")[0];
    document.getElementById("auth-code").value = code;
}


populateFromCookies();
extractCodeFromURL();

document.getElementById("generate-post-request").addEventListener("click", generatePostRequest);
document.getElementById("execute-post-request").addEventListener("click", executePostRequest);
document.getElementById("download-token-file").addEventListener("click", downloadTokenFile);
document.getElementById("copy-curl-command").addEventListener("click", copyCurlCommand);