import React , {useState }from 'react'
import {useNavigate} from 'react-router-dom' 
  
const Login = (props) => { 
    const [cred, setcred] = useState({email : '', password : ''});
    let Navigate = useNavigate(); 
    const handle = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`,{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            }, 
            body : JSON.stringify({email : cred.email,password : cred.password})
        })
        const json = await response.json();
        console.log(json);
        if(json.success){
            localStorage.setItem('token',json.authtoken);
            Navigate("/");
            props.showAlert("Login Successful", "success");
        }else{
            props.showAlert("Invalid Credentials", "danger");
        }
    }

    const onChange = (e) => {
        setcred({...cred, [e.target.name] : e.target.value})
    }
    return (
        <div className='container'>
            <form onSubmit={handle}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={cred.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={cred.password} onChange={onChange} id="password"  name='password'/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
