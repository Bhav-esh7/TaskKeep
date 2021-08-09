import React , {useRef, useState} from 'react';
import { Form , Card , Button ,Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext';
import { Container } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";

const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error,setError] = useState('')
    const [loading,setLoading] = useState(false);
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()


        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/basecomp")
        } catch {
            setError("Failed to log in")
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
                    <h2 className = "text-center mb-4">Log In to My Keep</h2>
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
                        <br />
                        <Button disabled={ loading } className="w-100" type="submit">Log In</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to = "/forgot-password">Forgot Password ? </Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
            <span style = {{color : 'white'}}>Need an account ? </span><Link to = "/signup">Sign Up</Link>
            </div>
            </div>
            </Container>
            </div>
        </>
    )
}

export default Login