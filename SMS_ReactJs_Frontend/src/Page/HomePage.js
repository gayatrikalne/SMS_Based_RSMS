import React from 'react';
import { useNavigate } from 'react-router-dom';
import main from "./main.jpg";
import "./HomePage.css";
import  { useState } from 'react';


function HomePage() {
    
    const navigate = useNavigate();
    
    const handleButtonOrgClick = () => {
        navigate('/AdminLogin');
    };
    
        const [isHovered, setIsHovered] = useState(false);
      
        const stopMarquee = () => {
          setIsHovered(true);
        };
      
        const startMarquee = () => {
          setIsHovered(false);
        };


    return(
        <div>
            <div className="topnav">
                <a href="#HomePage">Home</a>
                <a href="/Contact">Contact</a>
                <a href="/About">About</a>
            </div>
            <div
      onMouseOver={stopMarquee}
      onMouseOut={startMarquee}
      style={{ backgroundColor: isHovered ? '#bcbcbc' : '#ccc' }}
    >
      <marquee direction="left" scrollamount="5">
        WELCOME TO SMS BASED REMOTE SERVER MONITORING SYSTEM
      </marquee>
    </div>

            <div className="container p-5">
                <div className="row">
                    <div className="col-8">
                        <img
                            src={main}
                            className="img-fluid rounded-top"
                            alt=""
                            id="mainimg"
                        />
                    </div>
                    <div className="col-4" id="main">
                        <div className="box">
                            <div>
                                <button
                                    type="button"
                                    className="btn btn-light m-4"
                                    style={{width: 300}}
                                >
                                    System
                                </button>
                            </div>
                            
                            <div>
                                <button
                                    type="button"
                                    className="btn btn-light m-4"
                                    style={{width: 300}}
                                    onClick={handleButtonOrgClick}
                                >
                                    Admin
                                </button>
                            </div>

                            <div>
                                <button
                                    type="button"
                                    className="btn btn-light m-4"
                                    style={{width: 300}}
                                >
                                    Employee
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default HomePage;
