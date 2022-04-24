let quizzesDaApi;

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
    todasQuizzes.innerHTML += ` <div class="quizzes" onclick="entarQuizzApi(this)" id="${quizzesDaApi[i].id}">
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

function entarQuizzApi(elemento) {
  console.log(elemento);

  const conteudoQuizzes = document
    .querySelector(".box-quizzes")
    .classList.add("escondido");
  const aparecerTelaQuizz = document
    .querySelector(".box-questoes")
    .classList.remove("escondido");

  const scrollarProTopo = document.querySelector("body");
  scrollarProTopo.scrollIntoView(true);

  const buscarUmQuizz = axios.get(
    `https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${elemento.id}`
  );
  console.log(buscarUmQuizz);
  buscarUmQuizz.then(buscarIdQuizz);
}

let quizzEscolhido;



function embaralharRespostas() { 
  return Math.random() - 0.5; 
}


function buscarIdQuizz(resposta) {
  let numeroRespostas = [];
  quizzEscolhido = resposta.data;
  console.log(quizzEscolhido);

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
          numeroRespostas.push(quizzEscolhido.questions[i].answers[x]);
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
    alert("Mostrar resultado");
  }else{
    setTimeout(() => {
      proximaPergunta.scrollIntoView(true);
    }, 2000);
  
  }
  
}
