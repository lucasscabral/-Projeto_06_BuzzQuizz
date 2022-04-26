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
