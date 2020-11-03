export default function validate(values) {
    let errors = {};

    if (!values.email) {
      errors.email = '*Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }

    if (!values.password) {
      errors.password = '*Password is required';
    } else if (values.password.length < 8) {
      errors.password = 'Password must be 8 or more characters';
    }

    if (!values.name) {
        errors.name = '*Field must be filled';
      }

    if (!values.phoneno) {
    errors.phoneno = '*Field must be filled';
    } else if (values.phoneno.length !== 10) {
        errors.phoneno = 'Phone Number must contain 10 integers';
    } else if (!/^\d+$/.test(values.phoneno)) {
        errors.phoneno = 'Phone Number is invalid';
      } 

    
    return errors;
  };