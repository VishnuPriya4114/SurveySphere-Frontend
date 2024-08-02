// src/components/Modal.js
import {React,useState} from 'react';
import './Catagory.css';

const categories = [
    'Education', 
    'Social Media', 
    'Healthcare', 
    'Technology', 
    'Sports', 
    'Entertainment', 
    'Government'
  ];
  
  function Modal({ isOpen, onClose, onSelect }) {
    const [selectedCategory, setSelectedCategory] = useState('');
  
    if (!isOpen) {
      return null;
    }
  
    const handleSelectChange = (e) => {
      setSelectedCategory(e.target.value);
    };
  
    const handleSubmit = () => {
      if (selectedCategory) {
        onSelect(selectedCategory);
        onClose();
      } else {
        alert('Please select a category.');
      }
    };
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Your poll is under:</h2>
          <select value={selectedCategory} onChange={handleSelectChange}>
            <option value="" disabled>Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
          <button className="submit-button" onClick={handleSubmit}>Submit</button>
          <button className="close-button" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }
  
  export default Modal;