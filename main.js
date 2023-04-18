const userName = document.querySelector('#name');
const userEmail = document.querySelector('#email');
const userPhone = document.querySelector('#phone');
const btn = document.querySelector('.btn');
const list = document.querySelector('.items');

btn.addEventListener('click', addAppointment);
window.addEventListener('DOMContentLoaded', getAppointsments);
list.addEventListener('click', deleteAppointment);

function getAppointsments() {
    axios
        .get('https://crudcrud.com/api/bbf764bcba4c4345b7c4c9ad3e9d0ed4/appointments')
        .then(response => {
            response.data.forEach(element => {
                let output = `<li class="list-group-item d-flex justify-content-between align-items-center" id="${element._id}">
                                <span>${element.name} - ${element.email} - ${element.phone}</span>
                                <div>
                                    <button type="submit" class="btn btn-info edit">Edit</button>
                                    <button type="submit" class="btn btn-danger delete">Delete</button>
                                </div>
                            </li>`;
                list.innerHTML += output;
            });
        })
        .catch(err => console.error(err));
}

function addAppointment(e) {
    e.preventDefault();
    const name = userName.value;
    const email = userEmail.value;
    const phone = userPhone.value;
    if (name && email && phone) {
        let user = {
            "name": name,
            "email": email,
            "phone": phone,
        };
        axios
            .post('https://crudcrud.com/api/bbf764bcba4c4345b7c4c9ad3e9d0ed4/appointments', user)
            .then(response => {
                let output = `<li class="list-group-item d-flex justify-content-between align-items-center" id="${response.data._id}">
                                <span>${response.data.name} - ${response.data.email} - ${response.data.phone}</span>
                                <div>
                                    <button type="submit" class="btn btn-info edit">Edit</button>
                                    <button type="submit" class="btn btn-danger delete">Delete</button>
                                </div>
                            </li>`;

                list.innerHTML = output;
            })
            .catch(err => console.error(err));
        userName.value = '';
        userEmail.value = '';
        userPhone.value = '';
    }
}

function deleteAppointment(e) {
    const item = e.target.parentElement.parentElement;
    const id = item.getAttribute('id');
    axios
        .delete(`https://crudcrud.com/api/bbf764bcba4c4345b7c4c9ad3e9d0ed4/appointments/${id}`)
        .then(response => {
            item.remove();
        })
        .catch(err => console.error(err));
}