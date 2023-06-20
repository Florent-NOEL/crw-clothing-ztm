import Button from "../button.component/button.component";
import { useState } from "react";
import { signInWithGooglePopup, createUserDocumentFromAuth, signInUsingEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;


    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
       const userDocRef = await createUserDocumentFromAuth(user);
    }

    const handleSubmit = async () => {
        const { user } = await signInUsingEmailAndPassword(email, password);
       const userDocRef = await createUserDocumentFromAuth(user);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
        console.log(formFields.email);
    }
    
    /* 
    const resetFormFields = () => {
    setFormFields(defaultFormFields);
    }
     */
    
    return (
        <div>
            <h1>
                Sign In
            </h1>
            <form 
            onSubmit={handleSubmit} >
                <FormInput label='e-mail' type="e-mail" required onChange={handleChange} name="email" value={email} />
                <FormInput label='Password' type="password" required onChange={handleChange} name="password" value={password} />
                <Button type="submit">
            Sign In
            </Button>
            </form>
            <Button buttonType='google' onClick={logGoogleUser}>
                Sign in with Google
            </Button>
        </div>
    )
}

export default SignInForm;
