export default class Filters{
    constructor(){
        this.formEl = document.getElementById('filters');
        this.btnEl = document.getElementById('search');
    }

    onClick(callback){
        this.btnEl.onclick = (e) => {
            e.preventDefault();
            const data = new FormData(this.formEl);
            callback({
                type: data.get('type'),
                words: data.get('words')
            });
        }
    }
}