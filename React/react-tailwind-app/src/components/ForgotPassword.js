import { useState, useRef } from "react";
import { forgotPasswordFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import { useAuth } from "../contexts/AuthContext";

const fields = forgotPasswordFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function ForgotPassword() {
  const [loginState, setLoginState] = useState(fieldsState);
  const [signupState, setSignupState] = useState(fieldsState);
  const emailRef = useRef();
  const [message, setMessage] = useState("")
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const setRef = (field) => {
    switch (field.id) {
      case "email-address":
        return emailRef;
    }
  };

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser();
  };

  //Handle Login API Integration here
  const authenticateUser = async () => {
    try {
        setMessage('')
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions.")
    } catch {
      setError("Failed to Reset Password");
    }

    setLoading(false);
    // let loginFields={
    //         email:loginState['email-address'],
    //         password:loginState['password']
    // };
    // const endpoint=`https://api.loginradius.com/identity/v2/auth/login?apikey=${apiKey}&apisecret=${apiSecret}`;
    //  fetch(endpoint,
    //      {
    //      method:'POST',
    //      headers: {
    //      'Content-Type': 'application/json'
    //      },
    //      body:JSON.stringify(loginFields)
    //      }).then(response=>response.json())
    //      .then(data=>{
    //         //API Success from LoginRadius Login API
    //      })
    //      .catch(error=>console.log(error))
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {error && <div>{error}</div>}

        {message && <div>{message}</div>}
      <div className="-space-y-px">
        {fields.map((field) => {
          const newRef = setRef(field);
          return (
            <Input
              key={field.id}
              handleChange={handleChange}
              value={loginState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
              innerRef={newRef}
            />
          );
        })}
      </div>
      <FormExtra label={false} text="Login" link="login" />
      <FormAction handleSubmit={handleSubmit} text="Reset Password" />
    </form>
  );
}
