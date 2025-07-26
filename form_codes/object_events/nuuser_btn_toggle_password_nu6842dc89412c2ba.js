function togglePassword() {
    const input = document.getElementById('check_password');
    const input2 = document.getElementById('new_password');
    const icon = document.querySelector('#btn_toggle_password i');


    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    input2.type = isPassword ? 'text' : 'password';

    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
}

togglePassword();