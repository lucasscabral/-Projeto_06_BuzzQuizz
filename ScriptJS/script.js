let quizzesDoApi;


quizzesApi ();
function quizzesApi (){
    promiseQuizzes = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes");
    promiseQuizzes.then(retornoApiQuizz);
}

function retornoApiQuizz(resposta){
    quizzesDoApi = resposta.data;

    let todasQuizzes = document.querySelector(".todos-quizzes-api");
    todasQuizzes.innerHTML = "";

    for(let i = 0; i < quizzesDoApi.length; i ++){
        todasQuizzes.innerHTML += ` <div class="quizzes">
                                        <div class="imagem-quizz">
                                            <img src="${quizzesDoApi[i].image}" alt="Quizzes">
                                            <span>${quizzesDoApi[i].title}</span>
                                        </div>   
                                    </div>`
    }
}

