import { Link, Navigate } from "react-router-dom";
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { userContext } from '../UserContext.jsx';

export default function LoginPage() 
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(userContext);
    async function loginSubmission(ev) 
    {
        ev.preventDefault();
        try 
        {
            const userInfo = await axios.post('/login', { 
                email,
                password,
            });
            setUser(userInfo);
            alert('Login Successful');
            setRedirect(true);
        } 
        catch (err) 
        {
            console.error(err);
            alert('Login Failed. Please try again');
        }
    }

    if (redirect) 
    {
        return <Navigate to={'/'} />
    }
    
    return (
        <div className="mt-4 grow flex justify-center items-center"> 
            <div className="mb-16">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="form-center mx-auto max-w-lg" onSubmit={loginSubmission}>
                    <input type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={ev => setEmail(ev.target.value)}/>
                    <input type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={ev => setPassword(ev.target.value)}/>
                    <button type="submit" className="primary">Login</button>
                    <div className="text-gray-500 text-center py-2">
                        Don't have an account yet? <Link to={"/register"} className="text-black underline">Register</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}