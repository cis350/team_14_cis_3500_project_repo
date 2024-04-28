import React, { useState } from "react";
import { createNewUser } from '../api/users';

/**
 * Adds a new user to the system
 * @param {*} props  the function to update the user list
 */
function RegisterUser(props) {
    const [newUser, setNewUser] = useState({ name: '', email: '', major: '' });

    const handleOnChange = (e) => {
        // Update the new user object based on input changes
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault(); // Prevent form submission

        try {
            // Send the new user data to the backend
            const response = await createNewUser(newUser);
            console.log('New user:', response);

            // Update the user list in the parent component
            props.addNewUser([...props.users, newUser]);

            // Reset the form
            setNewUser({ name: '', email: '', major: '' });
        } catch (error) {
            console.error('Error creating new user:', error);
        }
    }

    return (
        <div>
            <h2>Register User</h2>
            <form id="registerForm" onSubmit={handleOnSubmit}>
                <input 
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name ..."
                    value={newUser.name}
                    onChange={handleOnChange}
                />
                <input 
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email ..."
                    value={newUser.email}
                    onChange={handleOnChange}
                />
                <input 
                    type="text"
                    name="major"
                    id="major"
                    placeholder="Major ..."
                    value={newUser.major}
                    onChange={handleOnChange}
                />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default RegisterUser;
