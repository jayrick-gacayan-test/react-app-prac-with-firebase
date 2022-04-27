import React, { useEffect, useState }from 'react';
import './form.style.css';
const UserSignUp = () => {
    const initialState = {
        data: {
            email: '',
            pswd: '',
            cfpswd: '' },
        isRegister: false
    }

    const [user, setUser] = useState(initialState);

    const handleInputChange = (event) => {
        const { name , value } = event.target;

        setUser({
            ...user, data : { ...user.data, [name] : value }
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!user.data.email.trim() ||
            !user.data.pswd.trim() ||
            !user.data.cfpswd.trim()){
                alert("Must input email, password and confirm password");
                return;
            }
        
        alert("Successful Register");
        setUser({
            ...user, isRegister : !user.isRegister
        });
    }

    useEffect(() => {
            console.log("user ---- ", user);
        },[user]
    );
    return (
        <div className="container-fluid margin-big-top">
            <div className="container pt-5">
                <div className="card m-auto w-50 text-center shadow">
                    <h1 className="p-3 text-white rounded shadow form-header-1">Sign-up</h1>
                    <div className="card-body mt-5 p-0">
                        <form className="form-style-1"
                            onSubmit={ handleSubmit }>
                            <div className="px-5">
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
                                        id="pswd" 
                                        placeholder="Enter password" 
                                        name="pswd" 
                                        onChange={ handleInputChange } />
                                    <label htmlFor="pswd">Password</label>
                                </div>
                                <div className="form-floating mt-3 mb-4">
                                    <input type="text" 
                                        className="form-control shadow" 
                                        id="cfpswd" 
                                        placeholder="Confirm password" 
                                        name="cfpswd"
                                        onChange={ handleInputChange }/>
                                    <label htmlFor="cfpswd">Confirm Password</label>
                                </div>
                            </div>
                            
                            <button type="submit" className="btn btn-info w-100 p-3">Sign up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserSignUp;