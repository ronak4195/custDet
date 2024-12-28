import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';

const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        vehicleModel: '',
    });
    const [loading, setLoading] = useState(false); // State for loader

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loader when submitting
        try {
            await axios.post('https://custdet.onrender.com/api/records', formData);
            // alert(response.data.message);
            setFormData({ name: '', phone: '', vehicleModel: '' });
        } catch (error) {
            alert('Failed to save record.');
        } finally {
            setLoading(false); // Hide loader after process completion
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Phone:</label>
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Vehicle Model:</label>
                <input
                    type="text"
                    name="vehicleModel"
                    value={formData.vehicleModel}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
            </button>
            {loading && <p>Loading...</p>} {/* Optional loader message */}
        </form>
    );
};

export default Form;
