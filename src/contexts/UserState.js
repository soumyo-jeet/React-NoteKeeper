import React, { useState } from 'react'
import UserContext from './UserContext'
import { useNavigate } from 'react-router'

function UserState(props) {
    const host = 'http://localhost:5000';
    const nav = useNavigate();
    const [user, setuser] = useState("");

    // new user sign in
    const signNew = async (nname, nemail, npassword) =>{
        try {
            // Api call
            const url = `${host}/api/auth/newuserauth`
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: nname, email: nemail, password: npassword })
            })
            const json = await response.json();
            if(response.status === 200){
                console.log(json)
                alert("Successfully signed in with new credintials.")
                // redirect
                nav("/Login")
            }
            else if(response.status=== 404){
                alert(json.error)
            }
            else if(response.status === 400){
                alert(json.errors[0].msg)
            }
            else{
                alert("Server down... Please try again later.")
                // console.log(response)
            }
            
        } catch (error) {
            alert("Internal potential issues... Try again later.")
            console.log(error)
        }

    }
    
    // logIn Funtionality
    const loginVerification = async (email, password) => {
        try {
            // Api call
            const url = `${host}/api/auth/verify`
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, password: password })
            })
            const json = await response.json();
            if(response.status === 200){
                // redirect to home
                console.log(json)
                localStorage.setItem('token', json.token)
                nav("/")
            }
            else if(response.status === 400){
                alert(json.errors[0].msg);
            }
            else if(response.status === 404){
                alert(json.error);
            }
            else{
                alert("Server down... Please try again later.")
            }
        } catch (error) {
            alert("Internal potential issues... Try again later.")
            console.log(error)
        }
    }

    // User details fetching
    const fetchUser = async () => {
            try {
                // Api call
                const url = `${host}/api/auth/datafetch`
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token' : localStorage.getItem('token')
                    },
                })
                const json = await response.json();
                console.log(json.name);
                setuser(json.name);
            }  catch(error){
                console.log(error);
            }
    }

    return (
        <UserContext.Provider value={{ loginVerification, signNew, fetchUser, user }}>
            {props.children};
        </UserContext.Provider>
    )
}

export default UserState;