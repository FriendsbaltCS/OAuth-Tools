function generatePostRequest() {
    // Get the form data
    let tokenEndpoint = document.getElementById("token-endpoint").value;
    let clientSecret = document.getElementById("client-secret").value;
    let clientId = document.getElementById("client-id").value;
    let authorizationCode = extractCodeFromURL();
    let code = encodeURIComponent(document.getElementById("auth-code").value);
    let redirectUri = getCookie("redirect_uri");

    // Generate the cURL request
    let curlCommand =  "curl -X POST " + tokenEndpoint + " \\"
    + "\n -d grant_type=authorization_code \\"
    + "\n -d redirect_uri=" + redirectUri + " \\"
    + "\n -d client_id=" + clientId + " \\"
    + "\n -d client_secret=" + clientSecret + " \\"
    + "\n -d code=" + authorizationCode;

    document.getElementById("curl-command").value = curlCommand;
}

function populateFromCookies() {
    let token_ep = getCookie("token_ep");
    let client_secret = getCookie("client_secret");
    let client_id = getCookie("client_id");

    document.getElementById("token-endpoint").value = token_ep;
    document.getElementById("client-secret").value = client_secret;
    document.getElementById("client-id").value = client_id;
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