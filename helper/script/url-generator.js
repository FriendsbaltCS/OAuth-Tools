let url = window.location.href;

function generateAuthURL() {
    let auth_ep = document.getElementById("auth-endpoint").value;
    let client_id = document.getElementById("client-id").value;
    let redirect_uri = document.getElementById("redirect-uri").value;
    let scope = document.getElementById("scope").value;
    let state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    let response_type = "code";
    url = `${auth_ep}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&state=${state}&response_type=${response_type}`;
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
}

function visitAuthURL() {
    window.open(url, "_blank");
}

document.getElementById("generate-auth-url").addEventListener("click", generateAuthURL);
document.getElementById("visit-auth-url").addEventListener("click", visitAuthURL);
