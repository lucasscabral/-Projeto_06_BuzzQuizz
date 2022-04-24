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
  quizzEscolhido = resposta.data;
  console.log(quizzEscolhido);

  /*for(let y = 0; y = quizzEscolhido.questions[y].answers.length;y++){
    console.log(quizzEscolhido.questions[y].answers[y]);
  }*/


  let questoesQuizzes = document.querySelector(".box-questoes");
  let questoesMontadas = "";

  questoesQuizzes.innerHTML = "";
  console.log(questoesQuizzes);
  questoesMontadas = ` 
                                  <div class="titulo-quizz">
                                        <img src="${quizzEscolhido.image}" alt="">
                                        <span>${quizzEscolhido.title}</span>
                                  </div>
                                  <div class="box-questoes-quizzes">
                                `;

  for (let i = 0; i < quizzEscolhido.questions.length; i++) {
    
    console.log(quizzEscolhido.questions[i].answers);
    questoesMontadas += `
                                      
                                              <div class="box-perguntas-respostas">
                                                  <div class="titulo-pergunta">
                                                      <span style="color : ${quizzEscolhido.questions[i].color}">
                                                         ${quizzEscolhido.questions[i].title}
                                                      </span>
                                                  </div>
                                                  <div class="todas-respostas">
                                           `;

        for (let x = 0; x < quizzEscolhido.questions[i].answers.length; x++) {
          quizzEscolhido.questions[i].answers.sort(embaralharRespostas);
          console.log(quizzEscolhido.questions[i].answers[x]);
          questoesMontadas += `
                                            <div class="box-respostas" onclick="selecionarResposta(this)">
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



function selecionarResposta(elemento){
    console.log("OLAAAAA!"); 
  /*let respostas = document.querySelector(".box-respostas")*/
  let respostaSelecionada = elemento.classList.add("box-respostas-esbranquicado");
  /*respostaSelecionada = elemento.classList*/
 /* if(respostas){

  }*/


}
 


























 /* 
 
       questoesQuizzes.innerHTML += `<div class="todas-respostas">
                                            <div class="box-respostas">
                                                <img src="${objetoQuizz.questions[i].answers[x].image}" alt="">
                                                <span>${objetoQuizz.questions[i].answers[x].text}</span>
                                            </div>
                                        </div>        
                                            `;
        }
        questoesQuizzes.innerHTML += `
                                     
                                   </div>
                                </div> 
                                   `;
 
 
 
 
 for (let i = 0; i < objetoQuizz.questions.answers[i].length; i++) {
    boxQuestao.innerHTML += `  <div class="box-respostas">
                                    <img src="${objetoQuizz.questions.answers[i].image}" alt="">
                                    <span>${objetoQuizz.questions.answers[i].text}</span>
                                </div>    `;
    console.log(objetoQuizz.questions.answers[i]);
    // console.log(objetoQuizz.questions[i].answers.length);
  }*/



/*`<div class="box-quetoes-quizzes">
                                              <div class="box-perguntas-respostas">  
                                                    <div class="box-respostas">
                                                            <img src="${objetoQuizz.questions[i].answers[i].image}" alt="">
                                                            <span>${objetoQuizz.questions[i].answers[i].text}</span>
                                                    </div>                             
                                              </div>
                                      </div>`; */