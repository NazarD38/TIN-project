document.getElementById("organizationForm").addEventListener('submit', function (e) {
    let isValid = true;


    document.getElementById('nameError').innerText = '';
    document.getElementById('headquartersError').innerText = '';
    document.getElementById('founded_yearError').innerText = '';


    const name = document.getElementById("name").value.trim();
    if (!name || !/^[A-Za-z\s]+$/.test(name)) {
        document.getElementById("nameError").innerText = 'Name is required and must contain only letters.';
        isValid = false;
    }


    const headquarters = document.getElementById("headquarters").value.trim();
    if (!headquarters || !/^[A-Za-z\s]+$/.test(headquarters)) {
        document.getElementById("headquartersError").innerText = 'Headquarters is required and must contain only letters.';
        isValid = false;
    }


    const founded_year = document.getElementById("founded_year").value.trim();
    if (!founded_year || !/^[0-9]+$/.test(founded_year) || parseInt(founded_year) < 1901) {
        document.getElementById("founded_yearError").innerText = 'Founded year is required, must be a number, and greater than 1600.';
        isValid = false;
    }


    if (!isValid) {
        e.preventDefault();
    }
});
