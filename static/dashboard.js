var username = getCookie("username")
const parentContainer = document.getElementById('parent');
const dataDiv = document.getElementById('card');
var api_url = "https://scratch-coin-api.herasium.repl.co"
dataDiv.style.display = "none"
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
                
            } else {
              window.location.href = '/login';
            }
        } catch {}
    } else {
      window.location.href = '/login';
    }
})());
async function fetchDataAndManipulateDiv() {
    try {
      const response = await fetch(api_url+'/api/v1/projects/'+username); 
      const data = await response.json();
      console.log(data)
      console.log(Object.keys(data).length)
      if (data && typeof data === 'object' && Object.keys(data.Projects).length > 0) {

        const dictLength = Object.keys(data.Projects).length;
  

        for (const i in data.Projects) {
          console.log(i)
          dataDiv.style.display = "block"
          const projectTitleElement = dataDiv.querySelector('.project-title');
          const projectServerElement = dataDiv.querySelector('.server');
          const projectImageElement = dataDiv.querySelector('.image');
          projectTitleElement.innerHTML = data.Projects[i][0]
          projectServerElement.innerHTML = "Server: "+ data.Projects[i][1]
          projectImageElement.src = "https://uploads.scratch.mit.edu/projects/thumbnails/"+i+".png"
          const clonedDiv = dataDiv.cloneNode(true);
          parentContainer.insertBefore(clonedDiv, parentContainer.firstChild);
          
          const projectDeleteElement = clonedDiv.querySelector('.delete')

          projectDeleteElement.addEventListener('click', async () => { 
            const response = await fetch(api_url+"/api/v1/projects/"+username, {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({"Project":i,"Token":getCookie("token")})
            });
            console.log(response.status)
          })

        }
      } 

    dataDiv.style.display = 'none';

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
fetchDataAndManipulateDiv();