const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)/;


export const validateFields = (email, password) => {
  let errors = {
    emailError: '',
    passwordError: ''
  };

  let valid = true;

  
  if (!email) {
    errors.emailError = 'Email is required';
    valid = false;
  } else if (!emailRegex.test(email)) {
    errors.emailError = 'Please enter a valid email';
    valid = false;
  }

  if (!password) {
    errors.passwordError = 'Password is required';
    valid = false;
  } else if (!passwordRegex.test(password)) {
    errors.passwordError = 'Password must contain at least one uppercase letter and one digit';
    valid = false;
  }

  return { valid, errors };
};

  