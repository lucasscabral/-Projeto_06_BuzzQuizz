let quizzesDaApi;

quizzesApi ();
function quizzesApi (){
    promiseQuizzes = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes");
    promiseQuizzes.then(retornoApiQuizz);
}

function retornoApiQuizz(resposta){
    quizzesDaApi = resposta.data;

  let todasQuizzes = document.querySelector(".todos-quizzes-api");
  todasQuizzes.innerHTML = "";

    for(let i = 0; i < quizzesDaApi.length; i ++){
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
  if (perguntas.parseInt() < 3) {
    alert("Digite os campos corretamente");
  }
  if (niveis.parseInt() < 2) {
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
    basicInfor()
    window.location.replace("desktop8.html");
  }
  
function entarQuizzApi(elemento){
    console.log(elemento);

    const conteudoQuizzes = document.querySelector(".box-quizzes").classList.add("escondido");
    const aparecerTelaQuizz = document.querySelector(".box-questoes").classList.remove("escondido");

    const scrollarProTopo = document.querySelector("body");
    scrollarProTopo.scrollIntoView(true);

    const buscarUmQuizz = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${elemento.id}`);
    console.log(buscarUmQuizz);
    buscarUmQuizz.then(buscarIdQuizz);
}



function buscarIdQuizz(resposta){
    let quizzEscolhido = resposta.data;
    let objetoQuizz = {
        id: quizzEscolhido.id,
        title: quizzEscolhido.title,
        image: quizzEscolhido.image,
        questions:quizzEscolhido.questions,
        levels:quizzEscolhido.levels
    }
    //console.log(objetoQuizz.questions[0].title);
    console.log(objetoQuizz.questions[0].answers[1]);

    let questoesQuizzes = document.querySelector(".box-questoes");
    console.log(questoesQuizzes);
    questoesQuizzes.innerHTML = `  <div class="titulo-quizz">
                                        <img src="${objetoQuizz.image}" alt="">
                                        <span>${objetoQuizz.title}</span>
                                   </div>
                                `

    for(let i = 0; i < objetoQuizz.questions.length; i++){
        console.log(objetoQuizz.questions[i]);
        questoesQuizzes.innerHTML += `<div class="box-quetoes-quizzes">
                                            <div class="box-perguntas-respostas">
                                                <div class="titulo-pergunta">
                                                    <span>${objetoQuizz.questions[i].title}</span>
                                                </div>
                                            </div>  
                                    </div> `
    }
      
    for(let i = 0; i < objetoQuizz.questions.length; i++){
        questoesQuizzes.innerHTML += `<div class="box-quetoes-quizzes">
                                              <div class="box-perguntas-respostas">  
                                                    <div class="box-respostas">
                                                            <img src="${objetoQuizz.questions[i].answers[i].image}" alt="">
                                                            <span>${objetoQuizz.questions[i].answers[i].text}</span>
                                                    </div>                             
                                              </div>
                                      </div>`
                                      // console.log(objetoQuizz.questions[i].answers.length);                               
     }
}
  
