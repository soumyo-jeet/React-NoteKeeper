import React, { useState, useContext } from 'react'
import UserContext from '../contexts/UserContext'

function Signin() {
  const context = useContext(UserContext)
  const { signNew } = context
  const [newCred, setnewCred] = useState({ nname: "", nemail: "", npassword: "" })

  function onChange(e) {
    setnewCred({ ...newCred, [e.target.name]: e.target.value })
    console.log(newCred)
  }

  function onClick(e){
    e.preventDefault();
    console.log(newCred)
    signNew(newCred.nname, newCred.nemail, newCred.npassword);
    setnewCred({ nname: "", nemail: "", npassword: "" })

  }
  return (
    <div>
      <div className="container" style={{ marginTop: 100, padding: 50 }}>
        <form>
          <div className="row mb-3">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Name</label>
            <div className="col-sm-10">
              <input type="text"
                className="form-control"
                id="inputName3"
                name="nname"
                value={newCred.nname}
                onChange={onChange} />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input type="email"
                className="form-control"
                id="inputEmail3"
                name="nemail"
                value={newCred.nemail}
                onChange={onChange} />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
              <input type="password"
                className="form-control"
                id="inputPassword3"
                name='npassword'
                value={newCred.npassword}
                onChange={onChange} />
            </div>
          </div>

          <button type="button" className="btn btn-primary" onClick={onClick}>Sign in</button>
        </form>

      </div>
    </div>
  )
}

export default Signin