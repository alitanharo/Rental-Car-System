import { Modal } from 'react-bootstrap';




const PriceModal = ({price,resultModal,setResultModal}) => {
    return ( <>
    
        <Modal
            show={resultModal}
            onHide={() => setResultModal(false)}
            centered
            size="lg"
        >
            <Modal.Body
                style={{
                    border: "4px solid #f9d71c",
                    borderRadius: "10px",
                    animation: "glow 1s ease-in-out infinite alternate",
                    textAlign: "center",
                    fontSize: "2rem",
                    fontWeight: "bold",
                    padding: "20px",
                    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.5)",
                }}
            >
                <span style={{ fontSize: "3rem" }}>The Final Price is:</span>
                <br />
                <span style={{ fontSize: "4rem", color: "#f9d71c" }}>{price}$</span>
            </Modal.Body>
            <style>
                {`
        @keyframes glow {
            from {
                box-shadow: 0 0 10px #f9d71c;
            }
            to {
                box-shadow: 0 0 20px #f9d71c;
            }
        }
    `}
            </style>
        </Modal>

    </> );
}
 
export default PriceModal;