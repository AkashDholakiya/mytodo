import React,{useState} from 'react'
import { useNavigate } from 'react-router';

const Signup = (props) => {
    const [cred, setcred] = useState({name : '',email : '',password : '',cpassword: ''})
    let Navigate = useNavigate(); 
    const handle = async (e) => {
        e.preventDefault();
        const {name,email,password} = cred;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`,{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            }, 
            body : JSON.stringify({name,email,password})
        })  
        const json = await response.json();
        console.log(json);  
        if(json.success){
            localStorage.setItem('token',json.authtoken);
            Navigate("/");
            props.showAlert("Account Created Successfully","success");
        }else{
            props.showAlert("Invalid Credentials","danger");
        }
    }
    const onChange = (e) => {
        setcred({...cred, [e.target.name] : e.target.value})
    }
    return (
        <div className='container'>
            <form onSubmit={handle}> 
                <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control"  value={cred.name} onChange={onChange} id="name" name="name" aria-describedby="emailHelp" />
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={cred.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={cred.password} onChange={onChange} id="password" name='password' minLength={5} required />
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" value={cred.cpassword} onChange={onChange} id="cpassword" name='cpassword' minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup