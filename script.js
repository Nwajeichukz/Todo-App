const form  = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos')

const todos = JSON.parse(localStorage.getItem('todos'));

// For The Data to remain after Page Refreshed 
if(todos){
    todos.forEach(todo => {
        addTodo(todo)
    })
}


form.addEventListener('submit', (e) => {
    e.preventDefault();

    addTodo();
});

function addTodo (todo) {
    // The Typed Text
    let todoText = input.value;

    //if there is a text before the reload
    if(todo) {
        todoText = todo.text
    }

    if(todoText) {
        // creating the List 
        const todoE1 = document.createElement('li');

        //if there is a Done text before the reload
        if(todo && todo.completed) {
            todoE1.classList.add('completed');
        }
        // Adding The Typed Text too the List
        todoE1.innerText = todoText;

        // To Toggle The List(that is done)
        todoE1.addEventListener('click', () => {
            todoE1.classList.toggle('completed')
       
            // to Keeptrack
            updateLS()

        })

        // To Delete The List(that is done)
        todoE1.addEventListener('contextmenu', (e) => {
            e.preventDefault();

            todoE1.remove();
            
            // to Keeptrack 
            updateLS()
        });
        
        todosUL.appendChild(todoE1);

        // Empty The Typed Text
        input.value = '';

        // to Keeptrack
        updateLS()
    }
}

function updateLS() {
    // Selecting all List
    const todosE1 = document.querySelectorAll('li');

    const todos = [];

    todosE1.forEach((todoE1) => {
        // An Object of(List,Done List) to be saved/keeptrack in LS
        todos.push({
            text: todoE1.innerText,
            completed: todoE1.classList.contains('completed'),
        })

        localStorage.setItem('todos', JSON.stringify(todos));
    })
}