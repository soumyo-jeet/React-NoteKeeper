import React, {useState, useContext} from 'react'
import UserContext from '../contexts/UserContext'

function Login() {
    const context = useContext(UserContext);
    const {loginVerification} = context;

    const [creds, setcreds] = useState({email: "", password: ""})

    function onChange(e) {
        setcreds({...creds, [e.target.name]: e.target.value})
        console.log(creds)
    }

    async function onClick(e) {
        e.preventDefault();
        console.log({ NBE: creds.email, NBP: creds.password });
        loginVerification(creds.email, creds.password);
        setcreds({email: "", password: ""});
    }

    return (
        <div>
            <div className="container" style={{marginTop: 100, padding: 50}}>
                <form>
                    <div className="row mb-3">
                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="inputEmail3" name="email" value={creds.email} onChange={onChange}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" id="inputPassword3" name='password' value={creds.password} onChange={onChange}/>
                        </div>
                    </div>

                    <button type="button" className="btn btn-primary" onClick={onClick}>Log in</button>
                </form>

            </div>

        </div>
    )
}

export default Login