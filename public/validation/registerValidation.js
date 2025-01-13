document.querySelector('form').addEventListener('submit', function (e) {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    let isValid = true;
    let errors = [];


    if (!username) {
        errors.push('Username is required.');
        isValid = false;
    } else if (username.length < 3 || username.length > 20) {
        errors.push('Username must be between 3 and 20 characters.');
        isValid = false;
    }


    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Za-z]).{8,}$/;
    if (!password) {
        errors.push('Password is required.');
        isValid = false;
    } else if (!passwordRegex.test(password)) {
        errors.push('Password must be at least 8 characters long, include at least one letter, one number, and one special character.');
        isValid = false;
    }


    const errorContainer = document.getElementById('errorContainer');
    errorContainer.innerHTML = '';

    if (!isValid) {
        e.preventDefault();
        errors.forEach(error => {
            const errorElement = document.createElement('p');
            errorElement.textContent = error;
            errorElement.classList.add('error-message');
            errorContainer.appendChild(errorElement);
        });
    }
});
