import { createAuthUserwithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import { useState } from "react";

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
        if(password === confirmPassword) {
            const { user } = await createAuthUserwithEmailAndPassword(email, password);
            const userDocRef = await createUserDocumentFromAuth(user);
        }
    }

    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

 
    return (
        <div>
            <h1>Sign up with your e-mail and password</h1>
            <form 
            onSubmit={ (event) => {handleSubmit(event)}} >
                <label> Display name</label>
                <input type="text" required onChange={handleChange} name="displayName" value={displayName} />
                <label> e-mail</label>
                <input type="e-mail" required onChange={handleChange} name="email" value={email}/>
                <label> Password</label>
                <input type="password" required onChange={handleChange} name="password" value={password}/>
                <label>Confirm Password</label>
                <input type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default SignUpForm;