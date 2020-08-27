import { filtrar, ordemNomes, buscarNome, chocarOvo } from "./data.js";
import data from "./data/pokemon/pokemon.js";

const arrayPokemon = data["pokemon"];
card(arrayPokemon);

let modal = document.getElementById("myModal");
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

let campoBusca = document.querySelector("#campo-busca");
campoBusca.addEventListener("input", function Buscado() {
  let campoBuscado = document.querySelector("#campo-busca").value;
  campoBuscado = campoBuscado
    .substring(0, 1)
    .toUpperCase()
    .concat(campoBuscado.substring(1));
  card(buscarNome(campoBuscado, arrayPokemon));
});

let campoFiltro = document.querySelector(".filtrar-pokemon");
campoFiltro.addEventListener("input", function filtrados() {
  card(filtrar(campoFiltro.value, arrayPokemon));
});

let campoOrdem = document.querySelector("#campo-ordenacao-pokemon");
campoOrdem.addEventListener("input", function () {
  card(ordemNomes(campoOrdem.value, arrayPokemon));
});

let botaoLimparFiltro = document.querySelector("#botao-limpar");
botaoLimparFiltro.addEventListener("click", function () {
  limpaCampo(".filtrar-pokemon");
});

let botaoLimparOrdem = document.querySelector("#limpar-ordem-pokemon");
botaoLimparOrdem.addEventListener("click", function () {
  limpaCampo("#campo-ordenacao-pokemon");
});

function card(array) {
  const ul = document.querySelector("#lista-pokemon");
  ul.innerHTML = " ";

  for (let i = 0; i < array.length; i++) {
    let dadoImagem = array[i].img;
    let dadoNome = array[i].name;
    let dadoTipo = array[i].type;
    let dadoNum = array[i].num;

    let li = document.createElement("li");
    li.id = "pokemon." + dadoNum;
    li.classList.add("lista-pokedex-link");
    li.innerHTML += "<h4>" + dadoNome + "</h4>";
    ul.appendChild(li);

    let num = document.createElement("p");
    num.classList.add("lista-num");
    num.textContent += dadoNum;
    li.appendChild(num);

    let img = document.createElement("img");
    img.classList.add("lista-img");
    img.src += dadoImagem;
    li.appendChild(img);

    let tipo = document.createElement("tipo");
    tipo.classList.add("lista-tipo");
    li.appendChild(tipo);

    dadoTipo.forEach((tipoPokemon) => {
      const infoTipo = document.createElement("tipo");
      infoTipo.classList = tipoPokemon;
      infoTipo.textContent = tipoPokemon;
      tipo.appendChild(infoTipo);
    });
    li.addEventListener("click", () => modalCard(array[i]));
  }
}

function modalCard(element) {
  let divPai = document.querySelector(".modal-content");
  divPai.innerHTML = "";

  let div = document.createElement("div");
  div.classList.add("lista-info");
  divPai.appendChild(div);

  let divImg = document.createElement("div");
  divImg.classList.add("divImg");
  divPai.appendChild(divImg);

  let botaoFechar = document.createElement("span");
  botaoFechar.textContent = "X";
  botaoFechar.classList.add("close");
  div.appendChild(botaoFechar);

  let img = document.createElement("img");
  img.classList.add("lista-info-img");
  img.src = element.img;
  divImg.appendChild(img);

  let num = document.createElement("p");
  num.innerHTML = "<h4>" + element.num + "</h4>";
  num.classList.add("lista-info-num");
  divImg.appendChild(num);

  let nome = document.createElement("p");
  nome.innerHTML = "<h4>" + element.name + "</h4>";
  nome.classList.add("lista-info-nome");
  divImg.appendChild(nome);

  let height = document.createElement("p");
  height.innerHTML = "<h4>" + "Height: " + "</h4>" + element.height;
  height.classList.add("lista-info-height");
  div.appendChild(height);

  let weight = document.createElement("p");
  weight.innerHTML = "<h4>" + "Weight: " + "</h4>" + element.weight;
  weight.classList.add("lista-info-weight");
  div.appendChild(weight);

  if (!element.candy_count == 0) {
    let candy = document.createElement("p");
    candy.innerHTML = "<h4>" + "Candy count: " + "</h4>" + element.candy_count;
    candy.classList.add("lista-info-candy");
    div.appendChild(candy);
  }

  if (element.egg == "Not in Eggs") {
    let egg = document.createElement("p");
    egg.innerHTML = "<h4>" + "Não há ovos para serem chocados" + "</h4>";
    egg.classList.add("lista-info-egg");
    div.appendChild(egg);
  } else {
    let egg = document.createElement("p");
    let eggKm = element.egg.replace("km", "");
    egg.innerHTML =
      "<h4>" +
      "Uma pessoa andando 5km/h vai demorar:  " +
      "</h4>" +
      chocarOvo(eggKm) +
      " min para chocar o ovo";
    egg.classList.add("lista-info-egg");
    div.appendChild(egg);
  }

  let pFraqueza = document.createElement("p");
  pFraqueza.classList.add("lista-info-fraqueza");
  pFraqueza.innerHTML = "<h4>" + "Fraqueza" + "</h4>";
  div.appendChild(pFraqueza);

  element.weaknesses.forEach((fraqueza) => {
    const infoFraqueza = document.createElement("tipo");
    infoFraqueza.classList = fraqueza;
    infoFraqueza.textContent = fraqueza;
    pFraqueza.appendChild(infoFraqueza);
  });

  let pEvolution = document.createElement("p");
  pEvolution.innerHTML = "<h4>" + "Próxima evolução:" + "</h4>";
  pEvolution.classList.add("lista-info-evolution");
  div.appendChild(pEvolution);

  let divEvolution = document.createElement("div");
  divEvolution.classList.add("lista-evolution");
  pEvolution.appendChild(divEvolution);

  if (!element.next_evolution == 0) {
    const arrayNextEvolution = element.next_evolution.map((next) => next.name);
    arrayNextEvolution.forEach((item) => {
      let buscarImg = buscarNome(item, arrayPokemon);
      let buscarImgArray = buscarImg.find((itemArray) => itemArray.img);
      let evolutionImg = document.createElement("img");
      let evolution = document.createElement("p");
      evolutionImg.classList.add("lista-evolution-img");
      evolutionImg.src = buscarImgArray.img;
      evolution.innerHTML = "<h4>" + item + "</h4>";
      evolution.classList.add("lista-evolution-nome");
      evolution.appendChild(evolutionImg);
      divEvolution.appendChild(evolution);
    });
  } else {
    const evolution = document.createElement("p");
    evolution.innerHTML = "Este Pokémon não evolui";
    evolution.classList.add("lista-info-evolution");
    div.appendChild(evolution);
  }
  botaoFechar = document.querySelector(".close");
  botaoFechar.onclick = function () {
    modal.style.display = "none";
  };
  modal.style.display = "block";
}

function limpaCampo(selector) {
  const campo = document.querySelector(selector);
  campo.value = "";
  card(arrayPokemon);
}
