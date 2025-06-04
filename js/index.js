const inputTask = document.querySelector("#input-tarefa");
const btnAddTask = document.querySelector("#btn-adicionar-tarefa");
const tasksList = document.querySelector("#lista-tarefas");
const tasksArray = [];
let id = 1;

function completeTask(elemento, index) {
    const li = elemento.closest(".item-tarefa");
    li.classList.add("bounce");
    tasksArray[index].complete = true;

    if (index !== -1) {
        setTimeout(() => {
            li.classList.remove("bounce")
            renderList();
        }, 600)
    } else {
        renderList();
    }

}

function cancelTask(elemento, index) {
    const li =elemento.closest(".item-tarefa");
    li.classList.add("task-exit");

    if (index !== -1) {
        setTimeout(() => {
            tasksArray.splice(index, 1);
            renderList();
        }, 400)
    }
}

function renderList() {
    if(tasksArray.length) {
        tasksList.innerHTML = tasksArray.map((task, index) => `
        <li class="item-tarefa task-item">
            ${task.complete ? "" : `<p class="incompleta" onClick="completeTask(this, ${index})">Completar!</p>` }
            <p class="conteudo-tarefa">
                <strong class="id-tarefa">
                    ${task.complete ? '<i class="fa-solid fa-circle-check"></i>' : String(task.id).padStart(2, "0")}
                </strong>
                ${task.task}
            </p>
            <button class="cancelar-tarefa" onClick="cancelTask(this, ${index})"><i class="icone fa-solid fa-trash"></i></button>
        </li>
        `).join("");
    } else {
        tasksList.innerHTML = "<p class='mensagem-automatica'>Adicione uma tarefa...</p>"
    }
}

function addTask() {
    tasksArray.unshift({
        id: id,
        task: inputTask.value.trim(),
        complete: false
    });

    inputTask.value = "";
    renderList();
    id++;
}

btnAddTask.addEventListener('click', (e) => {
    e.preventDefault();

    if (inputTask.value.trim()) {
        addTask();
    } else {
        alert("Você precisa adicionar uma tarefa primeiro!");
    }
});

renderList();