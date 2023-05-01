import React, { useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { UserContext } from '../../contexts/userContext';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';



const Login = ({ showModal, setShowModal }) => {
    const navigate = useNavigate()
    const [socialSecurityNumber, setSocialSecurityNumber] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [isSignup, setIsSignup] = useState(false);
    const [loading, setLoading] = useState(false);
    const { isAuthenticated, login, signup, user, token } = useContext(UserContext) || {};

    const onCancel = () => {
        setShowModal(false);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(socialSecurityNumber, password);
            if (token && user?.role === "admin") {

                navigate('/');

            } else {
                setShowModal(false)

            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);

        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await signup(socialSecurityNumber, password, role);
            if (isAuthenticated && user?.role === "admin") {
                navigate('/');
            } else {
                setShowModal(false)
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);

        }
    };
    const handleSubmit = isSignup ? handleSignup : handleLogin;


    return (
        <div>
            <Modal show={showModal} onHide={onCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>{isSignup ? 'Sign Up' : 'Log In'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="socialSecurityNumber">
                            <Form.Label>Personal number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your personal number"
                                value={socialSecurityNumber}
                                onChange={(event) => setSocialSecurityNumber(event.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </Form.Group>

                        {isSignup && (
                            <Form.Group controlId="role">
                                <Form.Label>Role</Form.Label>
                                <div>
                                    <Form.Check
                                        type="radio"
                                        label="Customer"
                                        name="role"
                                        value="customer"
                                        checked={role === 'customer'}
                                        onChange={(event) => setRole(event.target.value)}
                                        required
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Admin"
                                        name="role"
                                        value="admin"
                                        checked={role === 'admin'}
                                        onChange={(event) => setRole(event.target.value)}
                                        required
                                    />
                                </div>
                            </Form.Group>
                        )}

                        <Button variant="primary" type="submit">
                            {isSignup ? 'Sign Up' : 'Log In'}
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {!isSignup && (
                        <p>
                            Don't have an account?{' '}
                            <Button variant="link" onClick={() => setIsSignup(true)}>
                                Sign up
                            </Button>
                        </p>
                    )}
                </Modal.Footer>
            </Modal>

        </div>

    )
}
export default Login