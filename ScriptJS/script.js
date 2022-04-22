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
                                    </div>`
    }
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
  
function buttomCriar(){
    window.location.replace("desktop8.html")
} 
function prosseguir(){
    window.location.replace("desktop8.html")
}
