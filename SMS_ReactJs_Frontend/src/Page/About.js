import React from 'react';
import './About.css'; // Import your CSS file for additional styling

function About() {

    return (
        <div className="container about-container">
            <div className="topnav">
                <a href="/HomePage">Home</a>
                <a href="/Contact">Contact</a>
                <a href="#About">About</a>
            </div>
            <main>
                <section className="intro-section mb-4">
                    <h2>Introduction</h2>
                    <p>Welcome to our SMS-based Remote Server Monitoring System! Our system provides a comprehensive solution for monitoring the health and performance of your servers remotely via SMS notifications.</p>
                </section>
                <section className="features-section mb-4">
                    <h2>Key Features</h2>
                    <ul>
                        <li>Real-time Monitoring</li>
                        <li>Customizable Alerts</li>
                        <li>SMS Notifications</li>
                        <li>Dashboard</li>
                        <li>Scalability</li>
                    </ul>
                </section>
                <section className="how-it-works-section mb-4">
                    <h2>How It Works</h2>
                    <p>Our SMS-based Remote Server Monitoring System works by continuously monitoring your server's vital statistics. When predefined thresholds are exceeded or critical issues arise, the system triggers an SMS notification to alert you in real-time. This allows you to take immediate action to resolve any issues and ensure the smooth operation of your servers.</p>
                </section>
                <section className="benefits-section mb-4">
                    <h2>Benefits</h2>
                    <ul>
                        <li>Enhanced Reliability</li>
                        <li>Time and Cost Savings</li>
                        <li>Accessibility</li>
                    </ul>
                </section>
                <section className="get-started-section">
                    <p>Ready to experience the benefits of our SMS-based Remote Server Monitoring System? Sign up now to get started and take control of your server's health today!</p>
                </section>
            </main>
        </div>
    );
}

export default About;
