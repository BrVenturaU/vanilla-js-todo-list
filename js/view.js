import AddTodo from "./components/add-todo.js";
import Modal from "./components/modal.js";
import Filters from "./components/filters.js";
export default class View{
    constructor(){
        this.model = null;
        this.table = document.getElementById('table');
        this.addTodoForm = new AddTodo();
        this.modal = new Modal();
        this.addTodoForm.onClick((title, description) => this.addTodo(title, description));
        this.modal.onClick((id, values) => this.editTodo(id, values));
        this.filters = new Filters();

        this.filters.onClick((filters) => this.filter(filters))
    }

    setModel(model){
        this.model = model;
    }

    render(){
        const todos = this.model.getTodos();
        todos.forEach(todo => this.createRow(todo));
    }

    filter(filters){
        const {type, words} = filters;
        const [, ...rows] = this.table.getElementsByTagName('tr');
        for (const row of rows) {
           const [title, description, completed] = row.children;
           let shouldHide = false;
           
           if(words){
               shouldHide = !title.textContent.includes(words) && !description.textContent.includes(words);
           }

           const shouldBeCompleted = type === 'completed';
           const isCompleted = completed.children[0].checked;

           if(type !== 'all' && shouldBeCompleted !== isCompleted){
               shouldHide = true;
           }

            if(shouldHide)
                row.classList.add('d-none');
            else
                row.classList.remove('d-none');
        }
    }

    addTodo(title, description){
        const todo = this.model.addTodo(title, description);
        this.createRow(todo);
    }

    editTodo(id, values){
        // TODO: Go to model
      const todo = this.model.editTodo(id, values);
      const row = document.getElementById(id);
      row.children[0].textContent = todo.title;
      row.children[1].textContent = todo.description;
      row.children[2].children[0].checked = todo.completed;
    }

    toggleCompleted(id){
        this.model.toggleCompleted(id);
    }

    deleteTodo(id){
        this.model.deleteTodo(id);
        document.getElementById(id).remove(); 
    }

    createRow(todo){
        const row = table.insertRow();
        row.setAttribute('id', todo.id);
        row.innerHTML = /*html*/ `
            <td>${todo.title}</td>
            <td>${todo.description}</td>
            <td class="text-center"></td>
            <td class="text-right"></td>
        `;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.onclick = () => this.toggleCompleted(todo.id);
        row.children[2].appendChild(checkbox);

        const editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-primary', 'mb-1', 'ml-1');
        editBtn.innerHTML = '<i class="fa fa-pencil"></i>';
        editBtn.setAttribute('data-toggle', 'modal');
        editBtn.setAttribute('data-target', '#modal');
        editBtn.onclick = () => this.modal.setValues({
            id: todo.id,
            title: row.children[0].textContent,
            description: row.children[1].textContent,
            completed: row.children[2].children[0].checked
        });
        row.children[3].appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
        deleteBtn.innerHTML = '<i class="fa fa-trash"></i>';
        deleteBtn.onclick = () => {
            this.deleteTodo(todo.id);
        }
        row.children[3].appendChild(deleteBtn);
    }
}