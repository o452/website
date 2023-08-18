const parentContainer = document.getElementById('parent');
const dataDiv = document.getElementById('card');
const loadElement = document.getElementById("load")
var api_url = "https://scratch-coin-api.herasium.repl.co"
dataDiv.style.display = "none"

async function fetchDataAndManipulateDiv() {
    try {
      const response = await fetch(api_url+'/api/v1/projects?limit=10'); 
      const data = await response.json();
      console.log(data)
      console.log(Object.keys(data).length)
      if (data && typeof data === 'object' && Object.keys(data.Projects).length > 0) {
 
        const dictLength = Object.keys(data.Projects).length;

        for (const i in data.Projects) {
          console.log(i)
          dataDiv.style.display = "block"
          const projectTitleElement = dataDiv.querySelector('.name');
          const projectCreatorElement = dataDiv.querySelector('.author');
          const projectImageElement = dataDiv.querySelector('.image');
          projectTitleElement.innerHTML = data.Projects[i]["Name"]
          projectCreatorElement.innerHTML = data.Projects[i]["Author"]
          projectImageElement.src = "https://uploads.scratch.mit.edu/projects/thumbnails/"+i+".png"
          dataDiv.href = "https://scratch.mit.edu/projects/"+i
          const clonedDiv = dataDiv.cloneNode(true);
          parentContainer.insertBefore(clonedDiv, parentContainer.firstChild);
        }
    dataDiv.style.display = 'none';
    }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
 
fetchDataAndManipulateDiv();

loadElement.addEventListener('click', async () => { 
    fetchDataAndManipulateDiv()
})