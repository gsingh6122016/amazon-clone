export default function validate(values) {
    let errors = {};

    // if (!values.email) {
    //   errors.email = '*Email address is required';
    // } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    //   errors.email = 'Email address is invalid';
    // }

    // if (!values.password) {
    //   errors.password = '*Password is required';
    // } else if (values.password.length < 8) {
    //   errors.password = 'Password must be 8 or more characters';
    // }

    if (!values.text) {
        errors.text = '*Field must be filled';
      }

    if (!values.text2) {
    errors.text2 = '*Field must be filled';
    }

    if (!values.pincode) {
    errors.pincode = '*Pincode is required';
    } else if (values.pincode.length < 6) {
    errors.pincode = 'Pincode must be 6 or more characters';
    }
    
    return errors;
  };