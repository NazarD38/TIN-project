document.getElementById('assassinForm').addEventListener('submit', function (e) {
    let isValid = true;


    document.getElementById('nameError').innerText = '';
    document.getElementById('specializationError').innerText = '';
    document.getElementById('descriptionError').innerText = '';
    document.getElementById('priceError').innerText = '';


    const name = document.getElementById('name').value.trim();
    if (!name) {
        document.getElementById('nameError').innerText = 'Name is required.';
        isValid = false;
    }


    const specialization = document.getElementById('specialization').value.trim();
    if (!/^[A-Za-z\s]+$/.test(specialization)) {
        document.getElementById('specializationError').innerText = 'Specialization must contain only letters.';
        isValid = false;
    }


    const description = document.getElementById('description').value.trim();
    if (description.length < 10) {
        document.getElementById('descriptionError').innerText = 'Description must be at least 10 characters long.';
        isValid = false;
    }


    const price = document.getElementById('price').value;
    if (!price || isNaN(price) || parseInt(price) < 100) {
        document.getElementById('priceError').innerText = 'Price must be at least 100.';
        isValid = false;
    }

    if (!isValid) {
        e.preventDefault();
    }
});


