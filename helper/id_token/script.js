function handle_response(response) {
    console.log(response);
    document.getElementById('token-text').innerHTML = response.credential;
}