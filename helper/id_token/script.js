function handle_response(response) {
    console.log(response);
    document.getElementById('token-text').innerHTML = response.credential;
}

function copy_to_clipboard() {
    var token = document.getElementById('token-text').innerHTML;
    navigator.clipboard.writeText(token);
}

document.getElementById('copy-button').addEventListener('click', copy_to_clipboard);