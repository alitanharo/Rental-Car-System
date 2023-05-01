import { useContext, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { UserContext } from '../../contexts/userContext';

const Logout = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const { logout } = useContext(UserContext)

    const handleLogout = () => {
        logout()
        navigate('/');
        handleCloseModal()

    };

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    return (
        <>
            <Button variant="outline-danger" onClick={handleShowModal}>Logout</Button>
            <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to log out?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
                    <Button variant="danger" onClick={handleLogout}>Logout</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Logout;
