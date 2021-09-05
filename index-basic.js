document.addEventListener('DOMContentLoaded', () => {
    let id = 1;

    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const table = document.getElementById('table');
    const alert = document.getElementById('alert');
    const addBtn = document.getElementById('add');

    const deleteTodo = (id) => document.getElementById(id).remove();

    const addToDo = () => {
        if(title.value === '' || description.value === ''){
            alert.classList.remove('d-none');
            alert.innerText = 'Title and description are required.';
            return;
        }

        alert.classList.add('d-none');
        const row = table.insertRow();
        row.setAttribute('id', id++);
        row.innerHTML = /*html*/ `
            <td>${title.value}</td>
            <td>${title.value}</td>
            <td class="text-center">
                <input type="checkbox">
            </td>
            <td class="text-right">
                <button class="btn btn-primary mb-1">
                    <i class="fa fa-pencil"></i>
                </button>
            </td>
        `;

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
        deleteBtn.innerHTML = '<i class="fa fa-trash"></i>';
        deleteBtn.onclick = () => {
            deleteTodo(row.getAttribute('id'));
        }
        row.children[3].appendChild(deleteBtn);
    }

    addBtn.onclick = addToDo;
});


