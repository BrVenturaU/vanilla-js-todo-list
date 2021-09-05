const STORAGE_KEY = 'todos';
export default class Model{
    constructor(){
        this.view = null;
        this.todos = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if(!this.todos || this.todos.length < 1){
            this.todos = [{
                id: 0,
                title: 'Test',
                description: 'First todo test', 
                completed: false
            }];

            this.currentId = 1;
        }else{
            this.currentId = this.todos[this.todos.length - 1].id +1;
        }
    }

    setView(view){
        this.view = view;
    }

    save(){
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos));
    }

    getTodos(){
        return this.todos.map(todo => ({...todo}));
    }

    getTodoById(id){
        return this.todos.findIndex(todo => todo.id === id);
    }

    toggleCompleted(id){
        const index = this.getTodoById(id);
        const todo = this.todos[index];
        todo.completed = !todo.completed;
        this.save();
    }

    addTodo(title, description){
        const todo = {id: this.currentId++, title, description, completed:false};
        this.todos.push(todo);
        console.log(this.todos);
        this.save();
        return {...todo};
    }

    editTodo(id, values){
        const index = this.getTodoById(id);
        const todo = Object.assign(this.todos[index], values)

        this.save();
        return {...todo};
    }

    deleteTodo(id){
        const index = this.getTodoById(id);
        this.todos.splice(index, 1);
        this.save();
    }
}

