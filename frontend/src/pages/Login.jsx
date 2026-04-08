import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        city: '',
        email: '',
        phone: '',
        whatsapp: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Redirect to Home Page as requested
        navigate('/');
    };

    return (
        <div className="login-page-wrapper">
            <div className="login-fade-in">
                <div className="login-card-vibe">
                    <div className="login-header-vibe">
                        <h2 className="text-gradient">Start Your Adventure</h2>
                        <p className="text-muted">Fill in your details to get started with WanderWorld</p>
                    </div>

                    <form className="login-form-vibe" onSubmit={handleSubmit}>
                        <div className="form-group-vibe">
                            <label>Name *</label>
                            <input 
                                type="text" 
                                name="name" 
                                className="form-control-vibe" 
                                placeholder="Your full name" 
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group-vibe">
                            <label>City of Residence *</label>
                            <input 
                                type="text" 
                                name="city" 
                                className="form-control-vibe" 
                                placeholder="Where are you from?" 
                                value={formData.city}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        
                        <div className="form-group-vibe">
                            <label>Email Address *</label>
                            <input 
                                type="email" 
                                name="email" 
                                className="form-control-vibe" 
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group-vibe">
                            <label>Phone Number *</label>
                            <input 
                                type="tel" 
                                name="phone" 
                                className="form-control-vibe" 
                                placeholder="+91 XXXXX XXXXX"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group-vibe">
                            <label>WhatsApp (Optional)</label>
                            <input 
                                type="tel" 
                                name="whatsapp" 
                                className="form-control-vibe" 
                                placeholder="+91 XXXXX XXXXX"
                                value={formData.whatsapp}
                                onChange={handleInputChange}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-full mt-16">
                            Login / Submit
                        </button>
                    </form>
                </div>
            </div>
            
            <div className="login-background-overlay"></div>
        </div>
    );
};

export default Login;
