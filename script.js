//let variaveis
const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');
const listaConcluida = [];
//criar lista
function criaLi(){
    const li = document.createElement('li');
    return li;
}
//criar lista apertando o ENTER
inputTarefa.addEventListener('keypress',function(e){
    if(e.keyCode===13){
        if(!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
});
//limpar input após adicionar a tarefa
function limpaImput(){
    inputTarefa.value = '';
    inputTarefa.focus();
}
//botão apagar e finalizar
function criaBotao(li){
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    const botaoFinalizar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    botaoFinalizar.innerText = 'Finalizar';
    botaoApagar.setAttribute('class','apagar');
    botaoApagar.setAttribute('title','Apagar Essa Tarefa');
    botaoFinalizar.setAttribute('class','finalizar');
    botaoFinalizar.setAttribute('title','Finalizar Essa Tarefa');
    li.appendChild(botaoApagar);
    li.appendChild(botaoFinalizar);   
}
//adicionar tarefa
function criaTarefa(textoInput){
    const li = criaLi();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    limpaImput();
    criaBotao(li);   
    salvarTarefa(); 
}
btnTarefa.addEventListener('click',function(){
    if(!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
});
//apagar item da lista
document.addEventListener('click',function(e){
    const el = e.target;
    if(el.classList.contains('apagar')){
        el.parentElement.remove();
        salvarTarefa();
    }
});
//finalizar intem da lista
document.addEventListener('click',function(e){
    const el = e.target;
    if(el.classList.contains('finalizar')){
        alert('Parabéns! Você concluiu uma tarefa. XD')
        const liConcluida = el.parentElement.innerText.replace('APAGAR','').replace('FINALIZAR','').trim();
        let tarefaTexto;
        tarefaTexto = liConcluida;
        listaConcluida.push(tarefaTexto);
        const tarefasJSON = JSON.stringify(listaConcluida);
        localStorage.setItem('concluida',tarefasJSON);
        el.parentElement.remove();
        salvarTarefa();
        console.log(tarefasJSON);
    }
});
//salvar lista na memoria do navegador
function salvarTarefa(){
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];
    for(let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('APAGAR','').replace('FINALIZAR','').trim();
        listaDeTarefas.push(tarefaTexto);
    }
    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas',tarefasJSON);
}
function adicionaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);
    for(let tarefa of listaDeTarefas){
        criaTarefa(tarefa);
    }
};
adicionaTarefasSalvas();
