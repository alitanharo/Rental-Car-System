import React from 'react';
import { Carousel } from 'react-bootstrap';
import car1 from '../images/1.jpg';
import car2 from '../images/2.jpg';
import car3 from '../images/3.jpg';

const Home = () => {
    return (
        <div className="container">
            <Carousel style={{ height: '50%', width: '50%', margin: 'auto' }}>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={car1}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={car2}
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={car3}
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>

            <div className="article-section">
                <div className="article-box">
                    <h2>Rent a Car Today</h2>
                    <p>Our car rental system is quick and easy to use. Simply browse our selection of vehicles and choose the one that's right for you. We offer a range of cars to suit all budgets and needs, from compact city cars to luxury SUVs.</p>
                    <a href="/pickup">See Available Cars</a>
                </div>
            </div>

            
        </div>
    );
};

export default Home;
