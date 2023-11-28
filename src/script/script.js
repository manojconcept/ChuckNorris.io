console.log("linked");
let mainDev = document.createElement("div");
mainDev.classList.add("container");
document.body.append(mainDev);
secDiv = document.createElement("div");
secDiv.classList.add("second-div")
mainDev.append(secDiv);


let urlRandom = "https://api.chucknorris.io/jokes/random";
let urlCat = "https://api.chucknorris.io/jokes/categories";



let urlFetch = async () => {
  try {
    let res = await fetch(urlRandom);
    let data = await res.json(); // again should put await in it
    let res2 = await fetch(urlCat);
    let data2 = await res2.json();
    return { random: data, categories: data2 };

  } catch (error) {
    error => console.error(error);
    throw error; // resplit error;
  }

}

urlFetch().then(({ random, categories }) => { //Here we are using object destructing;
  workHtml(random, categories);
}).catch(error => console.log(error));

let workHtml = (random, categories) => {
  console.log(random);

  let getREgInnerHtml = `<div class="card text-center ">
<div class="card-header d-flex justify-content-center">
  <div class="dropdown">
    <button id="dropButton" class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        chuck Norris Random Joke categories
    </button>
    <ul class="dropdown-menu">
    </ul>
  </div>
</div>
<div class="card-body">
  <p id="headingCont" class="card-text">${random.value}</p>
  <a id="clickMe" href="#" class="btn btn-primary">Click for Random Jokes</a>
  <a id="refresh" href="#" class="btn btn-secondary">Rand<i class="bi bi-arrow-clockwise"></i>m</a>
</div>
<div id="updateTime" class="card-footer text-body-secondary">
  ${random.updated_at}
</div>
</div>`;

  secDiv.innerHTML = getREgInnerHtml
  let getREg = document.querySelector(".dropdown-menu");
  getREg.innerHTML = getREgInnerHtml
  getREgInnerHtml = categories.map((data) => {
    return ` <li><a class="dropdown-item" onClick="dropButton('${data}')" href="#">${data}</a></li>`
  }).join("");
  getREg.innerHTML = getREgInnerHtml

  let refresh = document.getElementById("refresh")
  refresh.addEventListener("click", (event) => {
    getREg.innerHTML = categories.map((data) => `<li><a class="dropdown-item" onClick="dropButton('${data}')" href="#">${data}</a></li>`).join("");
  })


  let selClicMe = document.getElementById("clickMe")
  selClicMe.addEventListener("click", () => {
    urlFetch().then(
      ({ random }) => {
        let updateTime = document.getElementById("updateTime");
        updateTime.innerText = random.updated_at;
        let seletHeadingCont = document.getElementById("headingCont")
        seletHeadingCont.innerText = random.value;
        console.log(random.value);
      }
    )
  })
};

let dropButton = (data) => {
  let btnSel = document.querySelector("#dropButton")
  let dropDnBtn = `chuck Norris Random ${data} Joke`;
  btnSel.innerText = dropDnBtn;
  console.log(headingCont)
  let genButton = document.getElementById("clickMe");
  genButton.setAttribute("onClick", `genButtonClickme('${data}')`)
  genButton.innerText = `Click for Random ${data} Jokes`
  console.log(genButton);
};

let genButtonClickme = async (data) => {
  console.log(data);
  let data3url = `https://api.chucknorris.io/jokes/random?category=${data}`
  try {
    let urlSelCat = await fetch(data3url)
    let data = await urlSelCat.json();
    let updateTime = document.getElementById("updateTime");
        updateTime.innerText = data.updated_at;
    let headingCont = document.getElementById("headingCont");
    headingCont.innerText = `${data.value}`;
    console.log(data.value);
  } catch (error) {
    (error) => console.error(error);
    throw error;
  }

}

