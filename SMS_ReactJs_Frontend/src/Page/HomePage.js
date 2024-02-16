import "./HomePage.css";
import main from "./main.jpg"
import { useNavigate } from 'react-router-dom';

function HomePage() {
    
    const navigate = useNavigate();
    
    const handleButtonAdminClick = () => {
    navigate('/AdminLogin');
    };

    const handleButtonEmpClick = () => {
        navigate('/EmployeeLogin');
    };

    return(

        <div>
            <div className="topnav">
                <a href="#home">Home</a>
                <a href="#contact">Contact</a>
                <a href="#about">About</a>
            </div>

            <div className="container p-5">
            <div className="row">
                <div className="col-8">
                    <img
                        src={main}
                        class="img-fluid rounded-top"
                        alt=""
                        id="mainimg"
                    />
                </div>
                <div className="col-4" id="main">
                
                <div className="box">
                    <div>
                        <button
                            type="button"
                            class="btn btn-light m-4"
                            style={{width :300}}
                        >
                            System
                        </button>
                    </div>
                    
                    <div>
                        <button
                            type="button"
                            class="btn btn-light m-4"
                            style={{width :300}}
                            onClick={handleButtonAdminClick}
                        >
                            Admin
                        </button>
                    </div>

                    <div>
                        <button
                            type="button"
                            class="btn btn-light m-4"
                            style={{width :300}}
                            onClick={handleButtonEmpClick}
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