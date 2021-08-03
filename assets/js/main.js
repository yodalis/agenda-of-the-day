const inputTask = document.querySelector('.input-new-task');
const btnTask = document.querySelector('.btn-add-task');
const tasks = document.querySelector('.tasks');

function createLi() {
    const li = document.createElement('li');
    return li;
};

function clearTask() {
    inputTask.value = "";
    inputTask.focus();
}

function createRemoveButton(li) {
    li.innerText+=" ";
    const buttonRemove = document.createElement('button');
    buttonRemove.innerText = 'Apagar';
    // Duas formas de criar um elemento button com certas informações (como classes) pelo JS
    // buttonRemove.classList.add('apagar');
    buttonRemove.setAttribute('class', 'apagar');
    li.appendChild(buttonRemove);
}

function createTask(task) {
    const li = createLi();
    li.innerText = task;
    tasks.appendChild(li);
    clearTask();
    createRemoveButton(li);
    saveTasks();
};

function saveTasks() {
    const liTasks = tasks.querySelectorAll('li');
    const listOfTasks = [];

    for(let task of liTasks){
        let taskText = task.innerText;
        taskText = taskText.replace('Apagar', '').trim();
        console.log(taskText);
        listOfTasks.push();
    }
    const tasksJSON = JSON.stringify(listOfTasks);
    localStorage.setItem("task", tasksJSON);
}

btnTask.addEventListener('click', function () {
    if(!inputTask.value) return;
    createTask(inputTask.value);
});

// Not working
inputTask.addEventListener("keypress", (e) => {
    if(e.keycode === 13) {
        if(!inputTask.value) return;
        createTask(inputTask.value);
    }
});

document.addEventListener('click', e =>{
    const el = e.target;
    // Se esse elemento contém a classe "apagar" faça tal coisa
    if(el.classList.contains('apagar')){
        // O parentElement faz manipulações no pai desse elemento, nesse exemplo seria o li 
        // Aqui estamos removendo o pai desse botão quando clicado, ou seja removendo o li
        el.parentElement.remove();
        saveTasks();
    }
});

function addSaveTasks() {
    const tasks = localStorage.getItem("task");
    const listsOfTasks = JSON.parse(tasks);

    console.log(listsOfTasks);

    for(let task of listsOfTasks){
        createTask(task);
    }
};

addSaveTasks();