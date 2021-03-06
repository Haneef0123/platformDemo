import { useState, useRef } from "react";
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login() {
  const [loginState, setLoginState] = useState(fieldsState);
  const [signupState, setSignupState] = useState(fieldsState);
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();

  const setRef = (field) => {
    switch (field.id) {
      case "email-address":
        return emailRef;
      case "password":
        return passwordRef;
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
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Failed to Sign in");
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

      <FormExtra label={true} text="Forgot your password?" link="forgot-password" />
      <FormAction handleSubmit={handleSubmit} text="Login" />
    </form>
  );
}
