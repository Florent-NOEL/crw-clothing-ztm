const SignUpForm = () => {
    return (
        <div>
            <h1>Sign up with your e-mail and password</h1>
            <form onSubmit={() => { }}>
                <label> Display name</label>
                <input type="text" required />
                <label> Email</label>
                <input type="e-mail" required />
                <label> Password</label>
                <input type="password" required />
                <label>Confirm Password</label>
                <input type="password" required />
                <button type="submit" />
            </form>
        </div>
    )
}

export default SignUpForm;