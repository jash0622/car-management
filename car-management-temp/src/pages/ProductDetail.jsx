import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);

    useEffect(() => {
        const cars = JSON.parse(localStorage.getItem('cars')) || [];
        const selectedCar = cars.find(car => car.id.toString() === id);
        setCar(selectedCar);
    }, [id]);

    if (!car) return <p>Loading...</p>;

    return (
        <div className="product-detail-container">
            <h2>{car.title}</h2>
            <p>{car.description}</p>
            <div className="tags">
                {car.tags.map((tag, index) => (
                    <span key={index} className="tag">
                        {tag}
                    </span>
                ))}
            </div>
            <div className="images">
                {car.images.map((img, index) => (
                    <img key={index} src={img} alt={`Car ${index}`} />
                ))}
            </div>
            <button onClick={() => navigate('/products')}>Back</button>
        </div>
    );
};

export default ProductDetail;
