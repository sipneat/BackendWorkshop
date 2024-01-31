const form = document.getElementById('apiForm');
const list = document.getElementById('list');

// Make GET call and populate list
get_data()
.then(data => {
    data.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.Name} - ${item.Email} `;
        listItem.setAttribute('data-id', item.UsersId);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            delete_data(listItem.getAttribute('data-id'));
            listItem.remove();
            const message = document.createElement('p');
            message.textContent = 'Deleted';
            list.appendChild(message);
        });

        listItem.appendChild(deleteButton);
        list.appendChild(listItem);
    })});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    insert_data(name, email);

    const listItem = document.createElement('li');
    listItem.textContent = `${name} - ${email} `;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        delete_data(listItem.getAttribute('data-id'));
        listItem.remove();
        const message = document.createElement('p');
        message.textContent = 'Deleted';
        list.appendChild(message);
    });

    listItem.appendChild(deleteButton);
    list.appendChild(listItem);

    form.reset();
});

// get_data
async function get_data() {
    try {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        const response = await fetch("http://localhost:5000/get_data", requestOptions);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// insert_data
async function insert_data(name, email) {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify([
            {
                "Name": `${name}`,
                "Email": `${email}`
            }
        ]);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch("http://localhost:5000/insert_data", requestOptions);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// delete_data
async function delete_data(id) {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify([
            {
                "UsersId": id,
            }
        ]);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch("http://localhost:5000/delete_data", requestOptions);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}