import React , {useRef, useState} from 'react';
import ap from '../firebase';
import { Form , Card , Button ,Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext';
import { Container } from 'react-bootstrap';
import { Link , useHistory} from "react-router-dom";

const Signup = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordconfirmRef = useRef()
    const usernameRef = useRef()
    const { signup } = useAuth()
    const [error,setError] = useState('')
    const [loading,setLoading] = useState(false);
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        if(passwordRef.current.value !== passwordconfirmRef.current.value){
            return setError('Passwords do not match')
        }

        const db = ap.firestore();
        db.collection("users").add({
            email : emailRef.current.value,
            username : usernameRef.current.value
        })

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push("/basecomp")
        } catch {
            setError('Failed to create an account')
        }
        
        setLoading(false)
    }
    return (
        <>
        <div style={{height:"100%", width:"100%", backgroundColor:"#0e1111"}}>
        <Container className = "d-flex align-items-center justify-content-center" style = {{minHeight: "100vh"}}>
            <div className="w-100" style={{maxWidth: "400px"}}>
            <Card>
                <Card.Body>
                    <h2 className = "text-center mb-4">Sign Up </h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit = {handleSubmit}>
                        <Form.Group id = "email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type = "email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id = "password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type = "password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id = "password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type = "password" ref={passwordconfirmRef} required />
                        </Form.Group>
                        <Form.Group id = "username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type = "text" ref={usernameRef} required />
                        </Form.Group>
                        <br />
                        <Button disabled={ loading } className="w-100" type="submit">Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
                <div className="w-100 text-center mt-2">
                   <span style = {{color : 'white'}}>Already have an account ?</span>  <Link to = "/">Log In</Link>
                </div>
            </div>
        </Container>
        </div>
        </>
    )
}

export default Signup
