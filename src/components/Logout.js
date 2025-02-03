import React from 'react'
import { useNavigate } from 'react-router';

function Logout() {
    const nav = useNavigate();
    const onClick = () => {
        localStorage.removeItem('token');
        nav('/');
    }
    return (
        <div>
            <div className="container" style={{margin:100}}>
                <div class="card">
                    <div class="card-header">
                        ALERT!
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Log out confirmation!</h5>
                        <p class="card-text">Are you sure to log out?</p>
                        <button type="button" class="btn btn-primary align-center" onClick={onClick}>Log out</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Logout