import { Link } from "react-router-dom";
import React, { useState } from 'react';
import axios from 'axios';

export default function RegisterPage() 
{
    const [fName, setfName] = useState('');
    const [lName, setlName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function registerUser(ev) 
    {
        // to avoid reloading the page
        ev.preventDefault();
        try 
        {
            await axios.post('/register', { 
                fName, 
                lName, 
                email,
                password,
            });
            alert('Registration Complete');
        } 
        catch (err) 
        {
            alert('Registration Failed. Please try again');
            console.error(err);
        }
    }

    return (
        <div className="mt-4 grow"> 
            <div className="mb-16 flex flex-col justify-center">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="form-center mx-auto max-w-lg" onSubmit={registerUser}>
                    <input type="text" placeholder="First (Given) Name" value={fName} onChange={ev => setfName(ev.target.value)}/>
                    <input type="text" placeholder="Last (Family) Name" value={lName} onChange={ev => setlName(ev.target.value)}/>
                    <input type="email" placeholder="Email" value={email} onChange={ev => setEmail(ev.target.value)}/>
                    <input type="password" placeholder="Password" value = {password} onChange={ev => setPassword(ev.target.value)}/>
                    <button type="submit" className="primary">Register</button>
                    <div className="text-gray-500 text-center py-2">
                        Already a member? <Link to={"/login"} className="text-black underline">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}