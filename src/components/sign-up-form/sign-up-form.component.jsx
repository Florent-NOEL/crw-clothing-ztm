import { createAuthUserwithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss'
import Button from "../button.component/button.component";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(password !== confirmPassword) {
            alert( 'password do not match');
            return;
        }
        try {
            const { user } = await createAuthUserwithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch(error) {
            if(error.code === "auth/email-already-in-use") {
                alert('Cannot create user, email already in use');
            } else {
                console.log('user creation encoutered an error', error);
            }          
        }
        
    }

    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }
    
    const resetFormFields = () => {
    setFormFields(defaultFormFields);
    }

 
    return (
        <div className="sign-up-form-container">
        <h2>Don't have an account?</h2>
            <span>Sign up with your e-mail and password</span>
            <form 
            onSubmit={handleSubmit} >
            <FormInput label='Display name' type="text" required onChange={handleChange} name="displayName" value={displayName}/>
            <FormInput label='e-mail' type="e-mail" required onChange={handleChange} name="email" value={email}/>
            <FormInput label='Password' type="password" required onChange={handleChange} name="password" value={password}/>
            <FormInput label='Confirm Password' type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
            <Button type="submit">
            Sign Up
            </Button>
            </form>
        </div>
    )
}

export default SignUpForm;