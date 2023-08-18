const TokenText = document.getElementById("token")
const BoxAnim = document.getElementById("transition")
const Button = document.getElementById("Enter")

BoxAnim.style.animation = "slideToLeft 0.35s 1"
TokenText.innerHTML=sessionStorage.getItem("Temp-Token")
var api_url = "https://scratch-coin-api.herasium.repl.co"

Button.addEventListener('click', async () => {
    const username = sessionStorage.getItem("Username");
    const password = sessionStorage.getItem("Password");
  
    // Make API request here to check credentials
      const response = await fetch(api_url+"/api/v1/login/"+username, {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({"Password":password})
      });
  
      if (response.clone().ok) {
          const responseData = await response.json();
  
          if (responseData && responseData.token) {
              setCookie("token", responseData.token);
              setCookie("username", username)
              window.location.href = '/dashboard';
          } else {
              console.error("Invalid JSON response or missing 'token' property.");
          }
      } else {
          // Failed login, show error message and play animation
          Button.style.borderColor = 'red';
          Button.style.animation = 'horizontal-shaking 0.35s 1'
          setTimeout(() => {
            Button.style.borderColor = '#F8F8F8';
            Button.style.animation = ''
            Button.style.fontSize = '0.75vw'
            Button.innerHTML = 'Failed to create account. Please retry later.';
          }, 350);
          
      }
  
  });