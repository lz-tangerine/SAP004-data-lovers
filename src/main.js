import { filtrar, ordemNomes, buscarNome, imc } from "./data.js";
import data from "./data/pokemon/pokemon.js";

const arrayPokemon = data["pokemon"];

card(arrayPokemon);

let modal = document.getElementById("myModal");
let botaoFechar = document.getElementsByClassName("close");

botaoFechar.onclick = function () {
  modal.style.display = "none";
}
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

let campoFiltro = document.querySelector(".filtrar-pokemon");
campoFiltro.addEventListener("input", function filtrados() {
  card(filtrar(campoFiltro.value, arrayPokemon));
});

let botaoLimparFiltro = document.querySelector("#botao-limpar");
botaoLimparFiltro.addEventListener("click", function limparFiltro() {
  let campoFiltro = document.querySelector(".filtrar-pokemon");
  campoFiltro.value = "";
  card(arrayPokemon);
});

let campoOrdem = document.querySelector("#campo-ordenacao-pokemon");
campoOrdem.addEventListener("input", function () {
  card(ordemNomes(campoOrdem.value, arrayPokemon));
});

let botaoLimparOrdem = document.querySelector("#limpar-ordem-pokemon");
botaoLimparOrdem.addEventListener("click", function limparOrdem() {
  let campoOrdem = document.querySelector("#campo-ordenacao-pokemon");
  campoOrdem.value = "";
  card(arrayPokemon);
});

let campoBusca = document.querySelector("#campo-busca");
campoBusca.addEventListener("input", function Buscado() {
  let campoBuscado = document.querySelector("#campo-busca").value;
  campoBuscado = campoBuscado
    .substring(0, 1)
    .toUpperCase()
    .concat(campoBuscado.substring(1));
  card(buscarNome(campoBuscado, arrayPokemon));
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
    li.id = "pokemon."+dadoNum;
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

    let tipoZero = document.createElement("tipo");
    tipoZero.classList.add(dadoTipo[0]);
    tipoZero.textContent = dadoTipo[0];
    tipo.appendChild(tipoZero);

    if (!dadoTipo[1] == 0) {
      let tipoUm = document.createElement("tipo");
      tipoUm.classList.add(dadoTipo[1]);
      tipoUm.textContent = dadoTipo[1];
      tipo.appendChild(tipoUm);
    }
    li.addEventListener("click",() => modalCard(array[i]));
  }
}

function modalCard(element) {

  let divPai = document.querySelector(".modal-content");
  divPai.innerHTML="";

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
  num.textContent = element.num;
  num.classList.add("lista-info-num");
  divImg.appendChild(num);

  let nome = document.createElement("p");
  nome.textContent = element.name;
  nome.classList.add("lista-info-nome");
  divImg.appendChild(nome);

  let height = document.createElement("p");
  height.textContent = "Height: " + element.height;
  height.classList.add("lista-info-height");
  div.appendChild(height);

  let weight = document.createElement("p");
  weight.textContent = "Weight: " + element.weight;
  weight.classList.add("lista-info-weight");
  div.appendChild(weight);

  let candy = document.createElement("p");
  candy.textContent = "Candy: " + element.candy_count;
  candy.classList.add("lista-info-candy");
  div.appendChild(candy);

  let imcPokemon = document.createElement("p");
  let peso = element.weight.replace("kg", "");
  let altura = element.height.replace("m", "");
  imcPokemon.textContent = "Curiosidade IMC -> " + imc(peso, altura);
  imcPokemon.classList.add("lista-info-imc");
  div.appendChild(imcPokemon);

  let weakness = document.createElement("p");
  weakness.textContent = "Fraqueza: " + element.weaknesses.join(" ");
  weakness.classList.add("lista-info-fraqueza");
  div.appendChild(weakness);

  let evolution = document.createElement("p");
  evolution.textContent = "Próxima evolução: " + element.next_evolution.map(next => next.name).join(" ");
  evolution.classList.add("lista-info-evolution");
  div.appendChild(evolution);

  modal.style.display = "block";
}

