// your code here!
console.log("🥧");
let bakesUl = document.querySelector("#bakes-container");
let detImg = document.querySelector("#detail > img");
let newBakeForm = document.querySelector("#new-bake-form")

fetch("http://localhost:3000/bakes")
  .then((resp) => resp.json())
  .then((bakesArr) => {
    bakesArr.forEach((bakeObj, index, bakesArr) =>
      putOnBakeList(bakeObj, index)
    );
    firstShow(bakesArr);
  });

function firstShow(bakesArr) {
  detImg.src = bakesArr[0].image_url;
  detImg.alt = bakesArr[0].name;

  let detH1 = document.querySelector("#detail > h1");
  detH1.textContent = bakesArr[0].name;

  let detDesc = document.querySelector("#detail > p");
  detDesc.textContent = bakesArr[0].description;
}

function putOnBakeList(bakeObj, index) {
  let bakeLi = document.createElement("li");
  bakeLi.dataset.id = (index + 1);

  let detailH2 = document.createElement("h2");
  detailH2.textContent = bakeObj.name;
  detailH2.dataset.id = (index + 1);

  bakeLi.append(detailH2);
  bakesUl.append(bakeLi);
}

bakesUl.addEventListener("click", (event) => {
  if (event.target.matches("h2")) showDet(event.target);
});


function showDet(e){
    fetch(`http://localhost:3000/bakes/${e.dataset.id}`)
        .then(resp => resp.json())
        .then(bakeObj => {

            detImg.src = bakeObj.image_url
            detImg.alt = bakeObj.name

            let detH1 = document.querySelector("#detail > h1");
            detH1.textContent = bakeObj.name;

            let detDesc = document.querySelector("#detail > p");
            detDesc.textContent = bakeObj.description;
        })
}

// When this form is submitted, a new bake should be created 
//in the backend and added to the list of bakes displayed in the sidebar.

newBakeForm.addEventListener('submit', event => {
    event.preventDefault()
    
    let newBakeObj = {
        name: event.target.name.value,
        image_url: event.target.image_url.value,
        description: event.target.description.value,
        score: 0
    }


    fetch('http://localhost:3000/bakes', {
        method: "POST",
        headers: 
        {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newBakeObj)
    })
    .then(resp => resp.json())
    .then(bakeObj => putOnBakeList(bakeObj))
    
    newBakeForm.reset()
})