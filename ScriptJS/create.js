let informacoes = {
  titulo: "",
  url: "",
  perguntas: 1,
  niveis: 1,
};

function basicInfor() {
  let titulo = document.getElementById("titulo").value;
  let url = document.getElementById("Url").value;
  let perguntas = document.getElementById("perguntas").value;
  let niveis = document.getElementById("niveis").value;
  let alerts = "entrou";
  if (titulo.length < 20 || titulo.length > 65) {
    alert("Digite os campos corretamente");
    return alerts;
  } else if (parseInt(perguntas) < 3) {
    alert("Digite os campos corretamente");
    return alerts;
  } else if (parseInt(niveis) < 2) {
    alert("Digite os campos corretamente");
    return alerts;
  } else if (!validURL(url)) {
    alert("Digite os campos corretamente");
    return alerts;
  }
}
function validURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}
function prosseguir() {
  let alerta = basicInfor();
  if (alerta != "entrou") {
    informacoes.titulo = document.getElementById("titulo").value;
    informacoes.url = document.getElementById("Url").value;
    informacoes.perguntas = document.getElementById("perguntas").value;
    informacoes.niveis = document.getElementById("niveis").value;
    const container = document.querySelectorAll(".container");
    container[0].classList.add("none");
    container[1].classList.remove("none");
    criarPerguntas();
  }
}

function criarPerguntas() {
  let inputs = document.querySelector(".conteudo");
  for (let i = 1; i <= informacoes.perguntas; i++) {
    inputs.innerHTML += ` <div class="inputs">
    <div class="prgtIcone" onclick="mostrarPerguntas(this)">
      <div class="tituloInput">Pergunta ${i}</div>
      <ion-icon class="icone" name="create-outline"></ion-icon>
    </div>
    <div class="none informacoes perguntas">
      <input
        class="caixinha textoPergunta"
        type="text"
        placeholder="Texto da pergunta"
      />
      <input
        class="caixinha cor"
        type="text"
        placeholder="Cor de fundo da pergunta"
      />
      <div class="tituloInput">Resposta correta</div>
      <input
        class="caixinha resposta correta"
        type="text"
        placeholder="Resposta correta"
      />
      <input class="caixinha url" type="text" placeholder="URL da imagem" />
      <div class="tituloInput">Resposta incorreta</div>
      <input
        class="caixinha resposta incorreta"
        type="text"
        placeholder="Resposta incorreta 1"
      />
      <input class="caixinha url" type="text" placeholder="URL da imagem 1" />
      <input
        class="caixinha resposta incorreta"
        type="text"
        placeholder="Resposta incorreta 2"
      />
      <input class="caixinha url" type="text" placeholder="URL da imagem 2" />
      <input
        class="caixinha resposta incorreta"
        type="text"
        placeholder="Resposta incorreta 3"
      />
      <input class="caixinha url" type="text" placeholder="URL da imagem 3" />
    </div>
  </div> `;
  }
}
function mostrarPerguntas(elemento) {
  let pai = elemento.parentNode;
  let informacoes = pai.querySelector(".informacoes");
  let todasInformacoes = document.querySelectorAll(".informacoes");
  for (let i = 0; i < todasInformacoes.length; i++) {
    todasInformacoes[i].classList.add("none");
    informacoes.classList.remove("none");
  }
}
function requisitoPerguntas() {
  let textoPergunta = document.querySelectorAll(".textoPergunta");
  let alerts = "entrou";
  for (let i = 0; i < textoPergunta.length; i++) {
    let text = textoPergunta[i].value;
    if (text.length < 20) {
      alert("Preencha os campos corretamente");
      return alerts;
    }
  }
  let corFundo = document.querySelectorAll(".cor");
  for (let i = 0; i < corFundo.length; i++) {
    let cor = corFundo[i].value;
    if (
      cor[0] != "#" ||
      verificarHexadecimal(cor) == "invalido" ||
      cor.length != 7
    ) {
      alert("Preencha os campos corretamente");
      return alerts;
    }
  }
  let textoResposta = document.querySelectorAll(".resposta");
  for (let i = 0; i < textoResposta.length; i++) {
    let resposta = textoResposta[i].value;
    if (resposta == "") {
      alert("Preencha os campos corretamente");
      return alerts;
    }
  }
  let url = document.querySelectorAll(".url");
  for (let i = 0; i < url.length; i++) {
    let validurl = url[i].value;
    if (!validURL(validurl)) {
      alert("Preencha os campos corretamente");
      return alerts;
    }
  }
}
function verificarHexadecimal(cor) {
  var re = /[0-9A-Fa-f]{6}/g;

  if (re.test(cor)) {
    return "valido";
  } else {
    return "invalido";
  }
}

function prosseguirNiveis() {
  let alerta = requisitoPerguntas();
  const container = document.querySelectorAll(".container");
  if (alerta != "entrou") {
    mostrarNiveis();
    console.log("baracundÊ");
    container[1].classList.add("none");
    container[3].classList.remove("none");
  }
}
function mostrarNiveis() {
  let niveis = document.querySelector(".nivel");
  console.log(informacoes.niveis);
  for (let i = 1; i <= informacoes.niveis; i++) {
    niveis.innerHTML += `<div class="inputs">
    <div class="prgtIcone" onclick="niveis(this)">
      <div class="tituloInput">Nível ${i}</div>
      <ion-icon class="icone" name="create-outline"></ion-icon>
    </div>
    <div class="informacoes none levels">
      <input class="caixinha tituloNivel" type="text" placeholder="Título do nível" />
      <input
        class="caixinha porcentagem"
        type="text"
        placeholder="% de acerto mínima"
      />
      <input
        class="caixinha url"
        type="text"
        placeholder="URL da imagem do nível"
      />
      <input
        class="caixinha descricao"
        type="text"
        placeholder="Descrição do nível"
      />
  </div>`;
  }
}
function niveis(elemento) {
  let pai = elemento.parentNode;
  let informacoes = pai.querySelector(".informacoes");
  let todasInformacoes = document.querySelectorAll(".informacoes");
  for (let i = 0; i < todasInformacoes.length; i++) {
    todasInformacoes[i].classList.add("none");
    informacoes.classList.remove("none");
  }
}
function requisitosNiveis() {
  let titulo = document.querySelectorAll(".tituloNivel");
  let alerts = "entrou";
  for (let i = 0; i < titulo.length; i++) {
    let title = titulo[i].value;
    if (title.length < 10) {
      alert("Preencha os campos corretamente");
      return alerts;
    }
  }
  let porcentagem = document.querySelectorAll(".porcentagem");
  let deu0 = "0";
  for (let i = 0; i < porcentagem.length; i++) {
    let porcento = porcentagem[i].value;
    if (parseInt(porcento) < 0 || parseInt(porcento) > 100 || porcento == "") {
      alert("Preencha os campos corretamente");
      return alerts;
    }
    if (parseInt(porcento) == 0) {
      deu0 = "";
    }
  }
  if (deu0 == "0") {
    alert("Preencha os campos corretamente");
    return alerts;
  }
  let url = document.querySelectorAll(".url");
  for (let i = 0; i < url.length; i++) {
    let validurl = url[i].value;
    if (!validURL(validurl)) {
      alert("Preencha os campos corretamente");
      return alerts;
    }
  }
  let descricao = document.querySelectorAll(".descricao");
  for (let i = 0; i < descricao.length; i++) {
    let descricaoNivel = descricao[i].value;
    if (descricaoNivel.length < 30) {
      alert("Preencha os campos corretamente");
      return alerts;
    }
  }
}
function sucessoDoQuizz() {
  let alertaa = requisitosNiveis();
  if (alertaa != "entrou") {
    apiQuizz();
  }
  console.log("birinbau");
}
function apiQuizz() {
  let perguntas = document.querySelectorAll(".perguntas");
  let array = [];
  for (let i = 0; i < informacoes.perguntas; i++) {
    let cor = perguntas[i].querySelector(".cor");
    let respostaCorretas = perguntas[i].querySelector(".correta");
    let respostaIncorretas = perguntas[i].querySelectorAll(".incorreta");
    let url = perguntas[i].querySelectorAll(".url");
    let titulo = perguntas[i].querySelector(".textoPergunta");

    let objetoApi = {
      title: titulo.value,
      color: cor.value,
      answers: [
        {
          text: respostaCorretas.value,
          image: url[0].value,
          isCorrectAnswer: true,
        },
        {
          text: respostaIncorretas[0].value,
          image: url[1].value,
          isCorrectAnswer: false,
        },
        {
          text: respostaIncorretas[1].value,
          image: url[2].value,
          isCorrectAnswer: false,
        },
        {
          text: respostaIncorretas[2].value,
          image: url[3].value,
          isCorrectAnswer: false,
        },
      ],
    };
    array.push(objetoApi);
  }
  let levels = document.querySelectorAll(".levels");
  let arraay = [];
  for (let i = 0; i < informacoes.niveis; i++) {
    let tituloNivel = levels[i].querySelector(".tituloNivel");
    let porcentagem = levels[i].querySelector(".porcentagem");
    let url = levels[i].querySelector(".url");
    let descricao = levels[i].querySelector(".descricao");
    let niveisApi = {
      title: tituloNivel.value,
      image: url.value,
      text: descricao.value,
      minValue: porcentagem.value,
    };
    arraay.push(niveisApi);
  }

  let informacoesApi = {
    title: informacoes.titulo,
    image: informacoes.url,
    questions: array,
    levels: arraay,
  };
  console.log(informacoesApi);
  let promise = axios.post(
    "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes",
    informacoesApi
  );
  promise.then(telaSucesso);

}
function telaSucesso(resposta) {
  console.log(resposta);
  document.querySelector(".niveis").classList.add("none");
  document.querySelector(".sucesso").classList.remove("none");
  let imagemUrl = document.querySelector(".imagemTitulo");
  let titulo = document.querySelector(".tituloo");
  imagemUrl.style.backgroundImage = `url(${informacoes.url})`;
  titulo.innerHTML = informacoes.titulo;
  buscarIdQuizz(resposta);
}
function acessarQuizz() {
 document.querySelector(".sucesso").classList.add("none")
 document.querySelector(".box-questoes").classList.remove("none")
 
}
function acessarHome() {
  window.location.replace("index.html");
}




let quizzesDaApi;
let idQUizz;
let totalAcertos = 0;

quizzesApi();
function quizzesApi() {
  promiseQuizzes = axios.get(
    "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes"
  );
  promiseQuizzes.then(retornoApiQuizz);
}

function retornoApiQuizz(resposta) {
  quizzesDaApi = resposta.data;

  let todasQuizzes = document.querySelector(".todos-quizzes-api");
  todasQuizzes.innerHTML = "";

  for (let i = 0; i < quizzesDaApi.length; i++) {
    todasQuizzes.innerHTML += ` <div class="quizzes" onclick="entrarQuizzApi(this)" id="${quizzesDaApi[i].id}">
                                        <div class="imagem-quizz">
                                            <img src="${quizzesDaApi[i].image}" alt="Quizzes">
                                            <span>${quizzesDaApi[i].title}</span>
                                        </div>   
                                    </div>`;
  }
}

function buttomCriar() {
  window.location.replace("desktop8.html");
}

function entrarQuizzApi(elemento) {

  const conteudoQuizzes = document.querySelector(".box-quizzes").classList.add("escondido");
  const aparecerTelaQuizz = document.querySelector(".box-questoes").classList.remove("escondido");

  const scrollarProTopo = document.querySelector("body");
  scrollarProTopo.scrollIntoView(true);

  const buscarUmQuizz = axios.get(
    `https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${elemento.id}`
  );
  buscarUmQuizz.then(buscarIdQuizz);
}

let quizzEscolhido;

function embaralharRespostas() { 
  return Math.random() - 0.5; 
}

function buscarIdQuizz(resposta) {
  quizzEscolhido = resposta.data;

  let questoesQuizzes = document.querySelector(".box-questoes");
  let questoesMontadas = "";

  questoesQuizzes.innerHTML = "";
  questoesMontadas = ` 
                                  <div class="titulo-quizz">
                                        <img src="${quizzEscolhido.image}" alt="">
                                        <span>${quizzEscolhido.title}</span>
                                  </div>
                                  <div class="box-questoes-quizzes">
                                `;

  for (let i = 0; i < quizzEscolhido.questions.length; i++) {
    questoesMontadas += `
                                      
                                              <div id="pergunta-${i}" class="box-perguntas-respostas">
                                                  <div class="titulo-pergunta">
                                                      <span style="color: ${quizzEscolhido.questions[i].color}">
                                                         ${quizzEscolhido.questions[i].title}
                                                      </span>
                                                  </div>
                                                  <div class="todas-respostas">
                                           `;
          quizzEscolhido.questions[i].answers.sort(embaralharRespostas);

        for (let x = 0; x < quizzEscolhido.questions[i].answers.length; x++){
          questoesMontadas += `
                                            <div class="box-respostas" data-correct="${quizzEscolhido.questions[i].answers[x].isCorrectAnswer}" onclick="selecionarResposta(this)">
                                                <img src="${quizzEscolhido.questions[i].answers[x].image}" alt="">
                                                <span>${quizzEscolhido.questions[i].answers[x].text}</span>
                                            </div>
                                               
                                            `;
        }

        questoesMontadas += `
                                       </div> 
                                   </div>     
                                  `;
  }
  questoesMontadas += `
                              </div> 
                                  `;
  
   questoesQuizzes.innerHTML = questoesMontadas;                  
}

function selecionarResposta(escolhida){
  escolhida.classList.add("escolhido");

  let todasRespostas = escolhida.parentNode.querySelectorAll('.box-respostas');
  let respostaCorreta = escolhida.dataset.correct;

  if(respostaCorreta == 'true'){
    totalAcertos++;
  }

  for(let i = 0; i<todasRespostas.length; i++){
    todasRespostas[i].classList.add("box-respostas-desabilitadas");
    todasRespostas[i].removeAttribute("onclick");

    if(todasRespostas[i].dataset.correct == 'true'){
      todasRespostas[i].querySelector('span').classList.add("resposta-correta");
    }else{
      todasRespostas[i].querySelector('span').classList.add("resposta-errada");
    }
  }  
  
  escolhida.classList.remove("box-respostas-desabilitadas");
  
  proximaPergunta(escolhida);
}

function proximaPergunta(escolhida){
  let perguntaAtual = escolhida.closest(".box-perguntas-respostas");
  let proximaPergunta = perguntaAtual.nextElementSibling;
 
  if(proximaPergunta === null){
    setTimeout(mostrarResultado, 2000);
  }else{
    setTimeout(() => {
      proximaPergunta.scrollIntoView(
        {
          behavior: 'smooth'
        }
      );
    }, 2000);
  }
}

/**
 * funcao criada pois alguns levels de quizzes nao estavam cadastrados com o minValue na ordem crescente
 * e essa funcao ajuda a comparar o valor de forma mais precisa e mostrar o resultado correto
 */
function ordenarPorValorLevel(a, b){
  return a.minValue - b.minValue;
}

function mostrarResultado(){
  let porcentagemDeAcertos = Math.round((totalAcertos * 100) / quizzEscolhido.questions.length) ;
  let resultadoBox = document.querySelector(".box-questoes-quizzes");

  let resultado = {};
  let levels = [];

  for(let i = 0; i<quizzEscolhido.levels.length; i++){
    levels.push(quizzEscolhido.levels[i]);
  }

  levels.sort(ordenarPorValorLevel);
  
  for(let i = 0; i<levels.length; i++){
    if(porcentagemDeAcertos >= levels[i].minValue){
        resultado = {
          title: levels[i].title,
          image: levels[i].image,
          text: levels[i].text
        };
    }
  }

  resultadoBox.innerHTML +=`  <div class="box-resultado-quizz">
                                        <div class="titulo-resultado">
                                            <span>${porcentagemDeAcertos}% de acerto: ${resultado.title}</span>
                                        </div>
                                        <div class="conteudo-resultado">
                                            <div class="box-resultado-img">
                                                <img src="${resultado.image}" alt="">
                                            </div>
                                            <div class="box-descricao-resultado">
                                                <span>${resultado.text}</span>
                                            </div>
                                        </div>
                              </div>
                              <div class="bnt-reiniciar-quizz" onclick="reiniciarJogo()">
                                <span>Reiniciar Quizz</span>
                              </div>
                              <div class="bnt-voltar-home" onclick="voltarHome()">
                                <span>Voltar pra home</span>
                              </div>`;


  let tabelaResultado = document.querySelector(".box-resultado-quizz");
  tabelaResultado.scrollIntoView(
    {
      behavior: 'smooth'
    })
}

function reiniciarJogo(){
  totalAcertos = 0;
  entrarQuizzApi(quizzEscolhido);
}

function voltarHome(){
  window.location.reload();
}
