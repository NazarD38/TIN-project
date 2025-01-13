document.getElementById("skillForm").addEventListener('submit', function (e) {
    let isValid = true;

    document.getElementById('nameError').innerText = '';
    document.getElementById('descriptionError').innerText = '';

    const name = document.getElementById("name").value.trim();
    const description = document.getElementById("description").value.trim();


    if (!name || !/^[A-Za-z\s]+$/.test(name)) {
        document.getElementById("nameError").innerText = 'Name is required and must contain only letters.';
        isValid = false;
    }


    if (!description || !/^[A-Za-z\s]+$/.test(description)) {
        document.getElementById("descriptionError").innerText = 'Description is required and must contain only letters.';
        isValid = false;
    }

    if (description.length < 10) {
        document.getElementById("descriptionError").innerText = 'Description must be at least 10 characters long.';
        isValid = false;
    }

    if (!isValid) {
        e.preventDefault();
    }
});
