import React from 'react';



function ContactPage()
{
    return (

        <div className="container contact-container">
            <div className="topnav">
                <a href="/HomePage">Home</a>
                <a href="#Contact">Contact</a>
                <a href="/About">About</a>
            </div>
            <h1>Contact Us</h1>
            <p>If you have any questions or inquiries, please feel free to contact us using the form below:</p>

            <form>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input type="text" className="form-control" id="name" name="name" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" className="form-control" id="email" name="email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message:</label>
                    <textarea className="form-control" id="message" name="message" rows="4" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            <p className="mt-4">Alternatively, you can reach us via email at <a href="mailto:contact@example.com">contact@example.com</a>.</p>
        </div>
    );
}

export default ContactPage;
