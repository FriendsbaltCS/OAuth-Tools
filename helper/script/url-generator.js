let url = window.location.href;

function generateAuthURL() {
    let auth_ep = document.getElementById("auth-endpoint").value;
    let client_id = document.getElementById("client-id").value;
    let redirect_uri = document.getElementById("redirect-uri").value;
    let scope = document.getElementById("scope").value;
    let state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    let response_type = "code";
    let refreshTokens = document.getElementById("refresh-token").checked ? "&access_type=offline&prompt=consent" : "";
    url = `${auth_ep}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&state=${state}&response_type=${response_type}${refreshTokens}`;
    let displayUrl = url.replace(/&/g, "&\n");

    document.getElementById("auth-url").value = displayUrl;
    document.getElementById("visit-auth-url").disabled = false;

    let client_secret = document.getElementById("client-secret").value;
    let token_ep = document.getElementById("token-endpoint").value;

    // Save client_secret and token_ep in cookies
    document.cookie = `client_id=${client_id}`;
    document.cookie = `client_secret=${client_secret}`;
    document.cookie = `token_ep=${token_ep}`;
    document.cookie = `state=${state}`;
    document.cookie = `scope=${scope}`;
    document.cookie = `redirect_uri=${redirect_uri}`;
    document.cookie = `auth_ep=${auth_ep}`;
}

function visitAuthURL() {
    window.open(url, "_blank");
}

function loadFromCookiesIfAvailable() {
    let client_id = getCookie("client_id");
    let client_secret = getCookie("client_secret");
    let token_ep = getCookie("token_ep");
    let state = getCookie("state");
    let scope = getCookie("scope");
    let redirect_uri = getCookie("redirect_uri");
    let auth_ep = getCookie("auth_ep");

    if (client_id && client_secret && token_ep && state && scope && redirect_uri) {
        document.getElementById("client-id").value = client_id;
        document.getElementById("client-secret").value = client_secret;
        document.getElementById("token-endpoint").value = token_ep;
        document.getElementById("scope").value = scope;
        document.getElementById("redirect-uri").value = redirect_uri;
        document.getElementById("auth-endpoint").value = auth_ep;
    }
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

loadFromCookiesIfAvailable();
document.getElementById("generate-auth-url").addEventListener("click", generateAuthURL);
document.getElementById("visit-auth-url").addEventListener("click", visitAuthURL);
