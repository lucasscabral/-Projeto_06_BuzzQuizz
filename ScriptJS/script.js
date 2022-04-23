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

function basicInfor() {
  let titulo = document.getElementById("titulo").value;
  let url = document.getElementById("Url").value;
  let perguntas = document.getElementById("perguntas").value;
  let niveis = document.getElementById("niveis").value;

  if (titulo.length < 20 || titulo.length > 65) {
    alert("Digite os campos corretamente");
  }
  console.log(perguntas);
  if (parseInt(perguntas) < 3) {
    alert("Digite os campos corretamente");
  }
  if (parseInt(niveis) < 2) {
    alert("Digite os campos corretamente");
  }
  if (!validURL(url)) {
    alert("Digite os campos corretamente");
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
  console.log("barulho");
  basicInfor();
  window.location.replace("desktop9.html");
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


function buscarIdQuizz(resposta) {
  quizzEscolhido = resposta.data;
  console.log(quizzEscolhido.questions);

  let questoesQuizzes = document.querySelector(".box-questoes");
  //let respostaQuizz = document.querySelector(".box-perguntas-respostas");
  let questoesMontadas = "";

  questoesQuizzes.innerHTML = "";
  console.log(questoesQuizzes);
  questoesMontadas = ` <!-- <div class="box-questoes">-->
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
                                                      <span>${quizzEscolhido.questions[i].title}</span>
                                                  </div>
                                                  <div class="todas-respostas">
                                           `;
        
        for (let x = 0; x < quizzEscolhido.questions[i].answers.length; x++) {
          console.log( quizzEscolhido.questions[i].answers.length);
          questoesMontadas += `
                                            <div class="box-respostas">
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
  <!--  </div>-->
                              </div> 
                                  `;
   questoesQuizzes.innerHTML = questoesMontadas;                                
}



function renderizarRespostas(){

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