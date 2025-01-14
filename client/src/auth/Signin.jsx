import React, { useState } from 'react';
import axios from "axios"
const Signin = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/auth/signup', { name, password });
            alert(response.data.message);
        } catch (error) {
            console.error('Error:', error.response.data);
            alert('Login failed: ' + error.response.data.message);
        }
    };
    return (
        <div className='signin'>
        <form onSubmit={handleSubmit} >
        <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        <button type="submit">Login</button>
    </form>
    </div>
    );
}

export default Signin;
