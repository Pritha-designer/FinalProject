import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CrackerForm({ addOrEdit, currentCracker }) {
  const [form, setForm] = useState({
    name: '',
    type: '',
    quantity: '',
    price: '',
    image:'null',
 // for storing the uploaded image file
  });
const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); // image preview


  useEffect(() => {
    if (currentCracker) {
      setForm({
        name: currentCracker.name || '',
        type: currentCracker.type || '',
        quantity: currentCracker.quantity || '',
        price: currentCracker.price || '',
   
      });
 
       setPreview(`http://localhost:5000/uploads/${currentCracker.image}`);
    }
  }, [currentCracker]);

 const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // creates preview URL
    }
  };

 useEffect(() => {
    if (form.image) {
      setPreview(form.image);
    } else {
      setPreview(null);
    }
  }, [form.image]);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.name || !form.type || !form.quantity || !form.price || !image) {
    alert('All fields are required');
    return;
  }
  console.log('Image ready for upload:', image);

const formData = new FormData();
    formData.append('name', form.name);
    formData.append('type', form.type);
    formData.append('quantity', form.quantity);
    formData.append('price', form.price);
    formData.append('image', image); // actual file
 try {
    await axios.post('http://localhost:5000/api/crackers', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
 alert("Cracker added successfully!");

//  addOrEdit(formData);

  setForm({ name: '', type: '', quantity: '', price: '', image: null });
   setImage(null);
  setPreview(null);
  }catch (err) {
    console.error('Upload failed:', err);
    alert('Something went wrong while uploading.');
  
}};

return (
  <div className="container mt-4">
    <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
      <h4 className="mb-4 text-primary text-center">
        {currentCracker ? 'Update Cracker' : 'Add New Cracker'}
      </h4>

      <div className="mb-3">
        <label className="form-label">Cracker Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="e.g. Flowerpot"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Type / Category</label>
        <input
          type="text"
          className="form-control"
          placeholder="e.g. Rocket, Sparkler"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Quantity</label>
        <input
          type="number"
          className="form-control"
          placeholder="Enter quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Price (₹)</label>
        <input
          type="number"
          className="form-control"
          placeholder="Enter price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
      </div>
      {/* 
        <div className="mb-3">
          <label className="form-label">Product Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div> */}

      {/* // edited */}
      <div className="mb-3">
          <label htmlFor="formFile" className="form-label">Upload Image</label>
          <input
            className="form-control"
            type="file"
            id="formFile"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {preview && (
          <div className="card" style={{ width: '18rem' }}>
            <img src={preview} className="card-img-top" alt="Preview" />
            <div className="card-body">
              <h5 className="card-title">Image Preview</h5>
              <p className="card-text">This is the image you've selected.</p>
            </div>
          </div>
        )}

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          {currentCracker ? 'Update Cracker' : 'Add Cracker'}
        </button>
      </div>
    </form>
  </div>
);
}
