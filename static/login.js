const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('Enter');
var api_url = "https://scratch-coin-api.herasium.repl.co"

window.addEventListener("load", (async () => {
    if (checkCookie("token") && checkCookie("username")) {
        try {
            const response = await fetch(api_url+"/api/v1/token/"+getCookie("username")+"/"+getCookie("token"), {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':false
                },
            });

            if (response.ok) {
                // Already loged in with token and username.
                window.location.href = '/dashboard';
            }
        } catch {}
    }
})());
loginButton.addEventListener('click', async () => {
  const username = usernameInput.value;
  const password = passwordInput.value;

  // Make API request here to check credentials
    const response = await fetch(api_url+"/api/v1/login/"+username, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({"Password":password})
    });

    if (response.ok) {
        const responseData = await response.json();

        if (responseData && responseData.token) {
            setCookie("token", responseData.token);
            setCookie("username", username);
            window.location.href = '/dashboard';
        } else {
            console.error("Invalid JSON response or missing 'token' property.");
        }
    } else {
        // Failed login, show error message and play animation
        usernameInput.style.borderColor = 'red';
        passwordInput.style.borderColor = 'red';
        usernameInput.style.animation = 'horizontal-shaking 0.35s 1'
        passwordInput.style.animation = 'horizontal-shaking 0.35s 1'
        setTimeout(() => {
            usernameInput.style.borderColor = '#F8F8F8';
            passwordInput.style.borderColor = '#F8F8F8';
            usernameInput.style.animation = ''
            passwordInput.style.animation = ''
            usernameInput.value = '';
            passwordInput.value = '';
        }, 350);
        
    }

});