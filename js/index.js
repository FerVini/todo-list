const textarea = document.querySelector("#input-tarefa");
const btnAdicionarTarefa =  document.querySelector("#btn-adicionar-tarefa");
const listTarefas = document.querySelector("#lista-tarefas");
const arrayTarefas = [];
let id = 1;

const cancelarTarefa = (botao, id) => {
    const li =botao.closest(".task-item");
    li.classList.add("task-exit");

    const index = arrayTarefas.findIndex(t => t.id === id);
    if (index !== -1) {
        setTimeout(() => {
            arrayTarefas.splice(index, 1);
            renderList(arrayTarefas);
        },400)
    }
}

const renderList = (tarefas) => {
    listTarefas.innerHTML = tarefas.map(tarefa =>`
        <li class="item-tarefa task-item">
            <p class="id-tarefa">${String(tarefa.id).padStart(2, "0")}</p>
            <p class="conteudo-tarefa">${tarefa.tarefa}</p>
            <button class="cancelar-tarefa" onClick="cancelarTarefa(this, ${tarefa.id})"><i class="icone fa-solid fa-trash"></i></button>
        </li>`).join("");
}

const addToDo = (tarefa) => {
    if(tarefa.length === 0) {
        alert("Adicione uma tarefa!");
        return;
    }
    textarea.value = "";

    tarefa = tarefa.charAt(0).toUpperCase() + tarefa.slice(1).toLowerCase();
    arrayTarefas.unshift({id: id, tarefa: tarefa});
    id++;

    renderList(arrayTarefas);
}

btnAdicionarTarefa.addEventListener("click", (event) => {
    event.preventDefault();

    addToDo(textarea.value);
})