import React,{useState} from 'react'
import { useHistory } from 'react-router-dom';

const Signup = () => {

    const [text, setText] = useState({uname:"", email: "", password: ""});
    const history = useHistory();

    const progressText = async(e) =>{
        setText({...text, [e.target.name]: e.target.value})
      }

    const handleSubmit = (e) =>{
        e.preventDefault();
        signup(text.uname, text.email, text.password);

    }

    const signup = async(name, email, password) =>{
        const response = await fetch(`http://localhost:5000/api/user/createuser`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name, email, password}), // body data type must match "Content-Type" header
          });
          const json = await response.json();
          console.log(json);

          if(json.success){
            // save the token and redirect
            localStorage.setItem( 'token', json.authToken )
            history.push('/');
          }else{
            // pop-up
            alert("Invalid Credentials");
          }
    }

    return (
        <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="uname" className="form-label" >
          User Name
        </label>
        <input
          type="text"
          className="form-control"
          id="uname"
          aria-describedby="emailHelp"
          name="uname"
          onChange={progressText}
          value = {text.uname}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label" >
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="eamil"
          aria-describedby="emailHelp"
          name="email"
          onChange={progressText}
          value = {text.email}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label" >
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
            onChange={progressText}
            value = {text.password}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
    )
}

export default Signup
