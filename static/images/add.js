var username = getCookie("username")
const projectSubmitElement = document.getElementById("Enter")
const projectIdElement = document.getElementById("project")
const projectNameElement = document.getElementById("name")
const projectErrorElement = document.getElementById("Error")
const projectBoxElement = document.getElementById("box")
var api_url = "https://scratch-coin-api.herasium.repl.co"

projectErrorElement.style.display = "none"

projectSubmitElement.addEventListener('click', async () => { 
    var ProjectId = projectIdElement.value
    var Name = projectNameElement.value
    try {
      const response = await fetch(api_url+'/api/v1/projects/'+username, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({"Project":ProjectId,"Token":getCookie("token"),"Name":Name})
    }); // Replace with your API endpoint
    if (response.ok) {
      const data = await response.json();
      console.log(data)
    } else {
        projectBoxElement.style.height = "550px"
        projectIdElement.style.borderColor = 'red';
        projectIdElement.style.animation = 'horizontal-shaking 0.35s 1'
        text = await response.text()
        setTimeout(() => {
            projectIdElement.style.borderColor = '#F8F8F8';
            projectIdElement.style.animation = ''
            projectIdElement.value = '';
            projectErrorElement.style.display = "block"
            projectErrorElement.innerHTML = text
            setTimeout(() => {
                projectBoxElement.style.height = "450px"
                projectErrorElement.style.display = "none"
            }, 3000)
        }, 350);

    }
      }catch (error) {
      console.error('Error fetching data:', error);
    }
})
  