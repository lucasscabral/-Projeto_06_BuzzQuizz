let quizzesDoApi;

quizzesApi();
function quizzesApi() {
  promiseQuizzes = axios.get(
    "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes"
  );
  promiseQuizzes.then(retornoApiQuizz);
}

function retornoApiQuizz(resposta) {
  quizzesDoApi = resposta.data;

  let todasQuizzes = document.querySelector(".todos-quizzes-api");
  todasQuizzes.innerHTML = "";

  for (let i = 0; i < quizzesDoApi.length; i++) {
    todasQuizzes.innerHTML += ` <div class="quizzes">
                                        <div class="imagem-quizz">
                                            <img src="${quizzesDoApi[i].image}" alt="Quizzes">
                                            <span>${quizzesDoApi[i].title}</span>
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
  