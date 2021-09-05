import Alert from "./alert.js";
export default class Modal{
    constructor(){
        this.titleEl = document.getElementById('modal-title');
        this.descriptionEl = document.getElementById('modal-description');
        this.checkboxEl = document.getElementById('modal-completed');
        this.editBtnEl = document.getElementById('modal-btn');
        this.alert = new Alert('modal-alert');
        this.todo = null;
    }

    onClick(callback){
        this.editBtnEl.onclick = () => {
            if(!this.titleEl.value || !this.descriptionEl.value){
                this.alert.show('Title and description are required.');
                return;
            } 

            $('#modal').modal('toggle');
            callback(this.todo.id, {
                title: this.titleEl.value,
                description: this.descriptionEl.value,
                completed: this.checkboxEl.checked
            });
        }
    }

    setValues(todo){
        this.todo = todo;
        this.titleEl.value = todo.title;
        this.descriptionEl.value = todo.description;
        this.checkboxEl.checked = todo.completed;
    }
}