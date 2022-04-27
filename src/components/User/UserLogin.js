import React, { useState } from 'react';
import './form.style.css';

const UserLogin = () => {

    const initialState = {
        data: {
            email: '',
            pswd: ''
        },
        isLoggedIn: false,
        isLoggedOut: false
    }

    const [user, setUser] = useState(initialState);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        
        setUser({
            ...user, data: { ...user.data, [name] :value }
        });

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if( !user.data.email.trim() || !user.data.pswd.trim() ){
            alert("Must input email and password"); return;
        }

        alert("Successful login");
        setUser({
            ...user, isLoggedIn : !user.isLoggedIn
        });
    }

    console.log("User: ", user);
    return (
        <div className="container-fluid margin-big-top">
            <div className="container pt-5">
                <div className="card m-auto w-50 text-center shadow">
                    <h1 className="p-3 text-white rounded shadow form-header-1">Log-in</h1>
                    <div className="card-body px-5 mt-5">
                        <form className="form-style-1"
                            onSubmit={ handleSubmit }>
                            <div className="form-floating mb-3 mt-3">
                                <input type="text" 
                                    className="form-control shadow" 
                                    id="email" 
                                    placeholder="Enter email" 
                                    name="email" 
                                    onChange={ handleInputChange }/>
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="form-floating mt-3 mb-3">
                                <input type="text" 
                                    className="form-control shadow" 
                                    id="pwd" 
                                    placeholder="Enter password" 
                                    name="pswd"
                                    onChange={ handleInputChange } />
                                <label htmlFor="pwd">Password</label>
                            </div>
                            <button type="submit" className="btn btn-primary w-25">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserLogin;