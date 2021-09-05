export default class Alert{
    constructor(alertId){
        this.alertEl = document.getElementById(alertId);
    }

    show(message){
        this.alertEl.classList.remove('d-none');
        this.alertEl.innerText = message;
        this.dispose();
    }

    hide(){
        this.alertEl.classList.add('d-none');
    }

    dispose(msTime=3000){
        setTimeout(() => this.hide(), msTime);
    }
}