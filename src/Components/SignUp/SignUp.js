import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'; // Import the CSS file
import addServices from '../../Services/addServices';

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        businessType: '',
        targetGroup: ''
    });
    const [errors, setErrors] = useState({});
    const [showMessage, setShowMessage] = useState(false);
    const navigate = useNavigate(); // Hook to navigate programmatically

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        if (!formData.email.includes('@business.com')) newErrors.email = 'Only business emails are allowed';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            const response = await addServices.createUser(formData); // Use the service class to create user
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
                navigate('/login'); // Redirect to login page after a short delay
            }, 2000); // Delay for 2 seconds to display the message
        } catch (error) {
            setErrors({ apiError: 'An error occurred while creating user. Please try again later.' });
        }
    };

    const handleClick = () => {
        navigate('/login');
    }

    return (
        <div className="cosmic-background">
            <div className="form-container">
                <div className="signup-box">
                    <h2>Join Us</h2>
                    <form onSubmit={handleSubmit} className="signup-form">
                        <div className="input-field">
                            <label>Username:</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className={errors.username ? 'error-input' : ''}
                            />
                            {errors.username && <p className="error-message">{errors.username}</p>}
                        </div>
                        <div className="input-field">
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={errors.email ? 'error-input' : ''}
                            />
                            {errors.email && <p className="error-message">{errors.email}</p>}
                        </div>
                        <div className="input-field">
                            <label>Password:</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={errors.password ? 'error-input' : ''}
                            />
                            {errors.password && <p className="error-message">{errors.password}</p>}
                        </div>
                        <div className="input-field">
                            <label>Confirm Password:</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={errors.confirmPassword ? 'error-input' : ''}
                            />
                            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
                        </div>
                        <div className="input-field">
                            <label>Business Type:</label>
                            <textarea
                                name="businessType"
                                value={formData.businessType}
                                onChange={handleChange}
                                className={errors.businessType ? 'error-input' : ''}
                            />
                            {errors.businessType && <p className="error-message">{errors.businessType}</p>}
                        </div>
                        <div className="input-field">
                            <label>Target Group:</label>
                            <select
                                name="targetGroup"
                                value={formData.targetGroup}
                                onChange={handleChange}
                                className={errors.targetGroup ? 'error-input' : ''}
                            >
                                <option value="">Select target group</option>
                                <option value="12-17">12-17</option>
                                <option value="18-24">18-24</option>
                                <option value="25-34">25-34</option>
                                <option value="35-44">35-44</option>
                                <option value="45-54">45-54</option>
                                <option value="55+">55+</option>
                            </select>
                            {errors.targetGroup && <p className="error-message">{errors.targetGroup}</p>}
                        </div>
                        <button type="submit" className="submit-btn">Sign Up</button>
                        {errors.apiError && <p className="error-message">{errors.apiError}</p>}
                        {showMessage && <div className="success-message">Registration Successful!</div>}
                    </form>
                    <div className="login-redirect">
                        <p>Already a member?</p>
                        <button onClick={handleClick} className="login-btn">Log In</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
