import { useState } from "react";

import FormInput from "../form-input/form-input.component";

import "./sign-up-form.styles.scss";

import Button from "../button/button.component";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const defaultInputFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultInputFields);
  const { displayName, email, password, confirmPassword } = formFields;
  console.log(formFields);

  const resetFormFields = () => {
    setFormFields(defaultInputFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords doesn't match");
      console.log("not matched");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(user);

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h1>Don't have an account?</h1>
      <span>Sign Up with your emial and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          value={displayName}
          onChange={handleChange}
          name="displayName"
          type="text"
          required
        ></FormInput>
        <FormInput
          label="Email"
          value={email}
          onChange={handleChange}
          name="email"
          type="email"
          required
        ></FormInput>
        <FormInput
          label="Password"
          value={password}
          onChange={handleChange}
          name="password"
          type="password"
          required
        ></FormInput>
        <FormInput
          label="Confirm Password"
          value={confirmPassword}
          onChange={handleChange}
          name="confirmPassword"
          type="password"
          required
        ></FormInput>
        <Button  type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
