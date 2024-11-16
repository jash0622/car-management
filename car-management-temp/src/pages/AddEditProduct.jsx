import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './AddEditProduct.css';

const AddEditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (id) {
            const cars = JSON.parse(localStorage.getItem('cars')) || [];
            const selectedCar = cars.find(car => car.id.toString() === id);
            if (selectedCar) {
                setTitle(selectedCar.title);
                setDescription(selectedCar.description);
                setTags(selectedCar.tags.join(', '));
                setImages(selectedCar.images);
            }
        }
    }, [id]);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const encodedImages = files.map(file => URL.createObjectURL(file));
        setImages([...images, ...encodedImages].slice(0, 10)); // Limit to 10 images
    };

    const handleSave = () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const cars = JSON.parse(localStorage.getItem('cars')) || [];
        const carData = {
            id: id ? parseInt(id) : Date.now(),
            user: currentUser.username,
            title,
            description,
            tags: tags.split(',').map(tag => tag.trim()),
            images,
        };

        if (id) {
            // Update car
            const updatedCars = cars.map(car => (car.id.toString() === id ? carData : car));
            localStorage.setItem('cars', JSON.stringify(updatedCars));
        } else {
            // Add new car
            cars.push(carData);
            localStorage.setItem('cars', JSON.stringify(cars));
        }

        navigate('/products');
    };

    return (
        <div className="add-edit-container">
            <h2>{id ? 'Edit Car' : 'Add Car'}</h2>
            <form onSubmit={e => e.preventDefault()}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                ></textarea>
                <input
                    type="text"
                    placeholder="Tags (comma-separated)"
                    value={tags}
                    onChange={e => setTags(e.target.value)}
                />
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                />
                <div className="preview-images">
                    {images.map((img, index) => (
                        <img key={index} src={img} alt={`Preview ${index}`} />
                    ))}
                </div>
                <button onClick={handleSave}>{id ? 'Update' : 'Save'}</button>
            </form>
        </div>
    );
};

export default AddEditProduct;
