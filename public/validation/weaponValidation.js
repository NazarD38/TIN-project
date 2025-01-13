document.getElementById("weaponForm").addEventListener("submit", function (e) {
    let isValid = true;


    document.getElementById("nameError").innerText = "";
    document.getElementById("typeError").innerText = "";
    document.getElementById("damageError").innerText = "";
    document.getElementById("descriptionError").innerText = "";
    document.getElementById("assassinNameError").innerText = "";


    const name = document.getElementById("name").value.trim();
    if (!name) {
        document.getElementById("nameError").innerText = "Weapon name is required.";
        isValid = false;
    }


    const type = document.getElementById("type").value.trim();
    if (!type || !/^[A-Za-z\s]+$/.test(type)) {
        document.getElementById("typeError").innerText = "Type is required and must contain only letters.";
        isValid = false;
    }


    const damage = document.getElementById("damage").value.trim();
    if (!damage || isNaN(damage) || damage <= 0) {
        document.getElementById("damageError").innerText = "Damage must be a positive number.";
        isValid = false;
    }


    const description = document.getElementById("description").value.trim();
    if (description && description.length < 10) {
        document.getElementById("descriptionError").innerText = "Description must be at least 10 characters long.";
        isValid = false;
    }


    const assassinName = document.getElementById("assassinName").value.trim();
    if (!assassinName) {
        document.getElementById("assassinNameError").innerText = "Assassin name is required.";
        isValid = false;
    }


    if (!isValid) {
        e.preventDefault();
    }
});
