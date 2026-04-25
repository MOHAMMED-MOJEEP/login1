document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const toast = document.getElementById('toast');

    // 1. Toggle Password Visibility
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            togglePassword.classList.toggle('fa-eye');
            togglePassword.classList.toggle('fa-eye-slash');
        });
    }

    // 2. Password Strength Checker (Signup Page)
    if (signupForm) {
        const strengthBar = document.getElementById('strengthBar');
        passwordInput.addEventListener('input', (e) => {
            const val = e.target.value;
            strengthBar.className = 'strength-bar';
            if (val.length > 0) {
                if (val.length < 6) {
                    strengthBar.classList.add('strength-weak');
                } else if (val.length < 10 || !/[A-Z]/.test(val) || !/[0-9]/.test(val)) {
                    strengthBar.classList.add('strength-medium');
                } else {
                    strengthBar.classList.add('strength-strong');
                }
            }
        });
    }

    // 3. Form Validation Logic
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    };

    const showToast = (message, type = 'success') => {
        toast.textContent = message;
        toast.className = `toast ${type}`;
        toast.style.display = 'block';
        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);
    };

    // 4. Handle Login Submission
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            let isValid = true;

            // Reset errors
            document.getElementById('emailError').textContent = '';
            document.getElementById('passwordError').textContent = '';

            if (!validateEmail(email)) {
                document.getElementById('emailError').textContent = 'يرجى إدخال بريد إلكتروني صحيح';
                isValid = false;
            }

            if (password.length < 6) {
                document.getElementById('passwordError').textContent = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
                isValid = false;
            }

            if (isValid) {
                showToast('جاري تسجيل الدخول بنجاح...', 'success');
                // Here you would typically send data to server
            }
        });
    }

    // 5. Handle Signup Submission
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            let isValid = true;

            // Reset errors
            document.getElementById('nameError').textContent = '';
            document.getElementById('emailError').textContent = '';
            document.getElementById('passwordError').textContent = '';
            document.getElementById('confirmError').textContent = '';

            if (fullname.trim().length < 3) {
                document.getElementById('nameError').textContent = 'الاسم الكامل قصير جداً';
                isValid = false;
            }

            if (!validateEmail(email)) {
                document.getElementById('emailError').textContent = 'يرجى إدخال بريد إلكتروني صحيح';
                isValid = false;
            }

            if (password.length < 6) {
                document.getElementById('passwordError').textContent = 'كلمة المرور ضعيفة جداً';
                isValid = false;
            }

            if (password !== confirmPassword) {
                document.getElementById('confirmError').textContent = 'كلمات المرور غير متطابقة';
                isValid = false;
            }

            if (isValid) {
                showToast('تم إنشاء الحساب بنجاح! مرحباً بك.', 'success');
                // Here you would typically send data to server
            }
        });
    }
});
