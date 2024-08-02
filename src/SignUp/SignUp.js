import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'; // Import the CSS file

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
            const response = await fetch('http://localhost:8080/api/users/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                setShowMessage(true);
                setTimeout(() => {
                    setShowMessage(false);
                    navigate('/login'); // Redirect to login page after a short delay
                }, 2000); // Delay for 2 seconds to display the message
            } else {
                const data = await response.json();
                setErrors({ apiError: data.message });
            }
        } catch (error) {
            setErrors({ apiError: 'An error occurred. Please try again later.' });
        }
    };

    const handleClick = () => {
        navigate('/login');
    }

    return (
        <div className="main-container">
            <div className="image-container"></div>
            <div className="form-wrapper">
                <div className="signup-container">
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSubmit} className="signup-form">
                        <div className="form-group">
                            <label>Username:</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className={errors.username ? 'input-error' : ''}
                            />
                            {errors.username && <p className="error-text">{errors.username}</p>}
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={errors.email ? 'input-error' : ''}
                            />
                            {errors.email && <p className="error-text">{errors.email}</p>}
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={errors.password ? 'input-error' : ''}
                            />
                            {errors.password && <p className="error-text">{errors.password}</p>}
                        </div>
                        <div className="form-group">
                            <label>Confirm Password:</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={errors.confirmPassword ? 'input-error' : ''}
                            />
                            {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
                        </div>
                        <div className="form-group">
                            <label>Business Type:</label>
                            <textarea
                                name="businessType"
                                value={formData.businessType}
                                onChange={handleChange}
                                className={errors.businessType ? 'input-error' : ''}
                            />
                            {errors.businessType && <p className="error-text">{errors.businessType}</p>}
                        </div>
                        <div className="form-group">
                            <label>Target Group:</label>
                            <select
                                name="targetGroup"
                                value={formData.targetGroup}
                                onChange={handleChange}
                                className={errors.targetGroup ? 'input-error' : ''}
                            >
                                <option value="">Select target group</option>
                                <option value="12-17">12-17</option>
                                <option value="18-24">18-24</option>
                                <option value="25-34">25-34</option>
                                <option value="35-44">35-44</option>
                                <option value="45-54">45-54</option>
                                <option value="55+">55+</option>
                            </select>
                            {errors.targetGroup && <p className="error-text">{errors.targetGroup}</p>}
                        </div>
                        <button type="submit" className="submit-button">Sign Up</button>
                        {errors.apiError && <p className="error-text">{errors.apiError}</p>}
                        {showMessage && <div className="pop-up-message active">Registered successfully!</div>}
                    </form>
                    <div className="login-link">
                        <p>Already have an account?</p>
                        <button onClick={handleClick}>Log In</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
