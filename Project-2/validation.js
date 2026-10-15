document.addEventListener('DOMContentLoaded', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    const showError = (inputEl, errorEl, message) => {
        if (inputEl) inputEl.classList.add('error-border');
        if (errorEl) {
            errorEl.innerText = message;
            errorEl.classList.add('active');
        }
    };

    const clearError = (inputEl, errorEl) => {
        if (inputEl) inputEl.classList.remove('error-border');
        if (errorEl) {
            errorEl.innerText = '';
            errorEl.classList.remove('active');
        }
    };

    const showSuccessToast = (message) => {
        const toast = document.getElementById('successToast');
        const toastMsg = document.getElementById('toastMessage');
        if (toast && toastMsg) {
            toastMsg.innerText = message;
            toast.classList.add('active');
            setTimeout(() => {
                toast.classList.remove('active');
            }, 4000);
        } else {
            alert(message);
        }
    };

    const setupPasswordVisibility = () => {
        const toggles = document.querySelectorAll('.password-toggle');
        toggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const targetId = toggle.getAttribute('data-target');
                const passwordInput = document.getElementById(targetId);
                
                if (passwordInput) {
                    if (passwordInput.type === 'password') {
                        passwordInput.type = 'text';
                        toggle.classList.remove('fa-eye-slash');
                        toggle.classList.add('fa-eye');
                    } else {
                        passwordInput.type = 'password';
                        toggle.classList.remove('fa-eye');
                        toggle.classList.add('fa-eye-slash');
                    }
                }
            });
        });
    };

    setupPasswordVisibility();

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const nameInput = document.getElementById('contactName');
            const nameError = document.getElementById('contactNameError');
            const emailInput = document.getElementById('contactEmail');
            const emailError = document.getElementById('contactEmailError');
            const phoneInput = document.getElementById('contactPhone');
            const phoneError = document.getElementById('contactPhoneError');
            const subjectInput = document.getElementById('contactSubject');
            const subjectError = document.getElementById('contactSubjectError');
            const messageInput = document.getElementById('contactMessage');
            const messageError = document.getElementById('contactMessageError');

            if (!nameInput.value.trim()) {
                showError(nameInput, nameError, 'Full Name is required');
                isValid = false;
            } else if (nameInput.value.trim().length < 3) {
                showError(nameInput, nameError, 'Name must be at least 3 characters');
                isValid = false;
            } else {
                clearError(nameInput, nameError);
            }

            if (!emailInput.value.trim()) {
                showError(emailInput, emailError, 'Email address is required');
                isValid = false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                showError(emailInput, emailError, 'Enter a valid email address');
                isValid = false;
            } else {
                clearError(emailInput, emailError);
            }

            if (!phoneInput.value.trim()) {
                showError(phoneInput, phoneError, 'Phone number is required');
                isValid = false;
            } else if (!phoneRegex.test(phoneInput.value.trim())) {
                showError(phoneInput, phoneError, 'Enter a valid 10-digit phone number');
                isValid = false;
            } else {
                clearError(phoneInput, phoneError);
            }

            if (!subjectInput.value.trim()) {
                showError(subjectInput, subjectError, 'Subject is required');
                isValid = false;
            } else {
                clearError(subjectInput, subjectError);
            }

            if (!messageInput.value.trim()) {
                showError(messageInput, messageError, 'Message text is required');
                isValid = false;
            } else if (messageInput.value.trim().length < 10) {
                showError(messageInput, messageError, 'Message must be at least 10 characters long');
                isValid = false;
            } else {
                clearError(messageInput, messageError);
            }

            if (isValid) {
                showSuccessToast('Thank you! Your message has been sent successfully. We will get back to you shortly.');
                contactForm.reset();
            }
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const emailInput = document.getElementById('loginEmail');
            const emailError = document.getElementById('loginEmailError');
            const passwordInput = document.getElementById('loginPassword');
            const passwordError = document.getElementById('loginPasswordError');

            if (!emailInput.value.trim()) {
                showError(emailInput, emailError, 'Email address is required');
                isValid = false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                showError(emailInput, emailError, 'Enter a valid email address');
                isValid = false;
            } else {
                clearError(emailInput, emailError);
            }

            if (!passwordInput.value) {
                showError(passwordInput, passwordError, 'Password is required');
                isValid = false;
            } else if (passwordInput.value.length < 6) {
                showError(passwordInput, passwordError, 'Password must be at least 6 characters');
                isValid = false;
            } else {
                clearError(passwordInput, passwordError);
            }

            if (isValid) {
                showSuccessToast('Login Successful! Redirecting to home...');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            }
        });
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const nameInput = document.getElementById('signupName');
            const nameError = document.getElementById('signupNameError');
            const emailInput = document.getElementById('signupEmail');
            const emailError = document.getElementById('signupEmailError');
            const phoneInput = document.getElementById('signupPhone');
            const phoneError = document.getElementById('signupPhoneError');
            const passwordInput = document.getElementById('signupPassword');
            const passwordError = document.getElementById('signupPasswordError');
            const confirmInput = document.getElementById('signupConfirmPassword');
            const confirmError = document.getElementById('signupConfirmPasswordError');

            if (!nameInput.value.trim()) {
                showError(nameInput, nameError, 'Full Name is required');
                isValid = false;
            } else {
                clearError(nameInput, nameError);
            }

            if (!emailInput.value.trim()) {
                showError(emailInput, emailError, 'Email Address is required');
                isValid = false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                showError(emailInput, emailError, 'Enter a valid email address');
                isValid = false;
            } else {
                clearError(emailInput, emailError);
            }

            if (!phoneInput.value.trim()) {
                showError(phoneInput, phoneError, 'Phone Number is required');
                isValid = false;
            } else if (!phoneRegex.test(phoneInput.value.trim())) {
                showError(phoneInput, phoneError, 'Enter a valid 10-digit phone number');
                isValid = false;
            } else {
                clearError(phoneInput, phoneError);
            }

            if (!passwordInput.value) {
                showError(passwordInput, passwordError, 'Password is required');
                isValid = false;
            } else if (passwordInput.value.length < 8) {
                showError(passwordInput, passwordError, 'Password must be at least 8 characters');
                isValid = false;
            } else {
                clearError(passwordInput, passwordError);
            }

            if (!confirmInput.value) {
                showError(confirmInput, confirmError, 'Please confirm your password');
                isValid = false;
            } else if (confirmInput.value !== passwordInput.value) {
                showError(confirmInput, confirmError, 'Passwords do not match');
                isValid = false;
            } else {
                clearError(confirmInput, confirmError);
            }

            if (isValid) {
                showSuccessToast('Registration Successful! Redirecting to login page...');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            }
        });
    }

    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const nameInput = document.getElementById('enquiryName');
            const nameError = document.getElementById('enquiryNameError');
            const phoneInput = document.getElementById('enquiryPhone');
            const phoneError = document.getElementById('enquiryPhoneError');
            const deptSelect = document.getElementById('enquiryDept');
            const deptError = document.getElementById('enquiryDeptError');
            const messageInput = document.getElementById('enquiryMessage');
            const messageError = document.getElementById('enquiryMessageError');

            if (!nameInput.value.trim()) {
                showError(nameInput, nameError, 'Name is required');
                isValid = false;
            } else {
                clearError(nameInput, nameError);
            }

            if (!phoneInput.value.trim()) {
                showError(phoneInput, phoneError, 'Phone number is required');
                isValid = false;
            } else if (!phoneRegex.test(phoneInput.value.trim())) {
                showError(phoneInput, phoneError, 'Enter a 10-digit number');
                isValid = false;
            } else {
                clearError(phoneInput, phoneError);
            }

            if (!deptSelect.value) {
                showError(deptSelect, deptError, 'Select a department');
                isValid = false;
            } else {
                clearError(deptSelect, deptError);
            }

            if (!messageInput.value.trim()) {
                showError(messageInput, messageError, 'Message is required');
                isValid = false;
            } else {
                clearError(messageInput, messageError);
            }

            if (isValid) {
                const modalOverlay = document.querySelector('.modal-overlay');
                if (modalOverlay) {
                    modalOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
                showSuccessToast('Enquiry Submitted Successfully! We will call you back.');
                enquiryForm.reset();
            }
        });
    }
});
