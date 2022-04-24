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
  console.log("barulho");
  let alerta = basicInfor();
  if (alerta != "entrou") {
    informacoes.titulo = document.getElementById("titulo").value;
    informacoes.url = document.getElementById("Url").value;
    informacoes.perguntas = document.getElementById("perguntas").value;
    informacoes.niveis = document.getElementById("niveis").value;
    console.log(informacoes.perguntas);
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
    <div class="none informacoes">
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
        class="caixinha resposta"
        type="text"
        placeholder="Resposta correta"
      />
      <input class="caixinha url" type="text" placeholder="URL da imagem" />
      <div class="tituloInput">Resposta incorreta</div>
      <input
        class="caixinha resposta"
        type="text"
        placeholder="Resposta incorreta 1"
      />
      <input class="caixinha url" type="text" placeholder="URL da imagem 1" />
      <input
        class="caixinha resposta"
        type="text"
        placeholder="Resposta incorreta 2"
      />
      <input class="caixinha url" type="text" placeholder="URL da imagem 2" />
      <input
        class="caixinha resposta"
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
    let textoPergunta = document.querySelectorAll(".textoPergunta")
    let alerts= "entrou"
    for (let i = 0; i<textoPergunta.length; i++){
       let text = textoPergunta[i].value
        if(text.length < 20){
            alert("Preencha os campos corretamente")
            return alerts
        } 
        
    }
    let corFundo = document.querySelectorAll(".cor")
    for(let i = 0; i<corFundo.length; i++){
        let cor = corFundo[i].value
        if(cor[0]!="#" || verificarHexadecimal(cor) == "invalido" || cor.length!=7){
          alert("Preencha os campos corretamente")
          return alerts
        }
    }
    let textoResposta = document.querySelectorAll(".resposta")
    for(let i = 0; i < textoResposta.length; i++){
      let resposta = textoResposta[i].value
      if(resposta == ""){
        alert("Preencha os campos corretamente")
        return alerts 
      }
    }
    let url = document.querySelectorAll(".url")
    for(let i = 0; i < url.length; i++){
      let validurl = url[i].value
      if(!validURL(validurl)){
        alert("Preencha os campos corretamente")
        return alerts
      }
    }

}
function verificarHexadecimal(cor){
  var re = /[0-9A-Fa-f]{6}/g;
  
  if(re.test(cor)) {
      return "valido"
  } else {
      return "invalido"
  }
  
}

function prosseguirNiveis(){
    console.log("birinbau")
    requisitoPerguntas()
}