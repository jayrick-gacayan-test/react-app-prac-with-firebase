import React from 'react';

const UserLogin = () => {
    return (
        <div className="container-fluid margin-big-top">
            <form action="/action_page.php">
                <div className="form-floating mb-3 mt-3">
                    <input type="text" 
                        className="form-control" 
                        id="email" 
                        placeholder="Enter email" 
                        name="email" />
                    <label for="email">Email</label>
                </div>
                <div className="form-floating mt-3 mb-3">
                    <input type="text" 
                        className="form-control" 
                        id="pwd" 
                        placeholder="Enter password" 
                        name="pswd" />
                    <label for="pwd">Password</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default UserLogin;