import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router'
import { UserContext } from '../contexts/userContext';

const SignIn = () => {
    const navigate = useNavigate()
    const [socialSecurityNumber, setSocialSecurityNumber] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const { isAuthenticated, login, signup, user, token } = useContext(UserContext) || {};
    const [isSignup, setIsSignup] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(socialSecurityNumber, password);
            if (token && user?.role === "admin") {

                navigate('/');

            } else {
                navigate('/pickup')
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
                navigate('/pickup')
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);

        }
    };

    const handleSubmit = isSignup ? handleSignup : handleLogin;

    return (
        <div className="container">
            <h2>{isSignup ? 'Sign Up' : 'Log In'}</h2>
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

            {!isSignup && (
                <p>
                    Don't have an account?{' '}
                    <Button variant="link" onClick={() => setIsSignup(true)}>
                        Sign up
                    </Button>
                </p>
            )}
        </div>
    );
};

export default SignIn;
