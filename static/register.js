const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const passwordConfirmInput = document.getElementById('password-confirm')
const loginButton = document.getElementById('Enter');
const BoxAnim = document.getElementById("transition")
var api_url = "https://scratch-coin-api.herasium.repl.co"


loginButton.addEventListener('click', async () => {
    const username = usernameInput.value;
    const password = passwordInput.value;
    const confirmpassword = passwordConfirmInput.value;
    
    if (confirmpassword == password && password != "") {
        const response = await fetch(api_url+"/api/v1/create", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({"Password":password,"Name":username})
        });
        if (response.clone().ok) {
            const responseData = await response.json();
    
            if (responseData && responseData.Token) {
                console.log(responseData);
                console.log(responseData.Token);
                sessionStorage.setItem("Temp-Token", responseData.Token);
                sessionStorage.setItem("Username", username);
                sessionStorage.setItem("Password", password);
                BoxAnim.style.animation = "slideFromRight 0.35s 1"
                setTimeout(() => {
                    BoxAnim.remove()
                    window.location.href = '/register?step=2';
                }, 360);
            } else {
                console.error("Invalid JSON response or missing 'Token' property.");
            }
        } else {
            // Failed login, show error message and play animation
            usernameInput.style.borderColor = 'red'
            usernameInput.style.animation = 'horizontal-shaking 0.35s 1'
            setTimeout(() => {
                usernameInput.style.borderColor = '#F8F8F8'
                usernameInput.style.animation = ''
                usernameInput.value = '';
            }, 350);
            
        }
    }else{
        if (password == "") {
            passwordInput.style.borderColor = 'red';
            passwordInput.style.animation = 'horizontal-shaking 0.35s 1'
            setTimeout(() => {
                passwordInput.style.borderColor = '#F8F8F8';
                passwordInput.style.animation = ''
                passwordInput.value = '';
            }, 350);
            }
         else {
        passwordConfirmInput.style.borderColor = 'red';
        passwordConfirmInput.style.animation = 'horizontal-shaking 0.35s 1'
        setTimeout(() => {
            passwordConfirmInput.style.borderColor = '#F8F8F8';
            passwordConfirmInput.style.animation = ''
            passwordConfirmInput.value = '';
        }, 350);
    }
}
})