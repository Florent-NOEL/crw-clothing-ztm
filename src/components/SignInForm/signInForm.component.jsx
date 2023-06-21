import Button from "../button.component/button.component";
import { useState } from "react";
import { signInWithGooglePopup, createUserDocumentFromAuth, signInUsingEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './signInForm.styles.scss';

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
        const response = await signInUsingEmailAndPassword(email, password);
        } catch (error){
            switch(error.code)  {
                case 'auth/user-not-found':
                alert('incorrect password and email');
                        break
                case 'case auth/wrong-password':
                    alert("incorrect password")
                        break
                case "auth/invalid-email":
                    alert("wrong email")
                        break;
                default:
                    console.log(error);
            }
        }
        
    
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
        <div className="sign-up-container">
            <h1>
                Alredy have an account?
            </h1>
            <span>Sign in with your email and password</span>
            <form
                onSubmit={handleSubmit} >
                <FormInput label='e-mail' type="e-mail" required onChange={handleChange} name="email" value={email} />
                <FormInput label='Password' type="password" required onChange={handleChange} name="password" value={password} />
                <div className="buttons-container">
                    <Button type="submit">
                        Sign In
                    </Button>
                    <Button buttonType='google' tupe='button' onClick={logGoogleUser}>
                        Sign in with Google
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;
