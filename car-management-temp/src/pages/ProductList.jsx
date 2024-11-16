import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductList.css';

export const ProductList = () => {
    const [cars, setCars] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const allCars = JSON.parse(localStorage.getItem('cars')) || [];
        setCars(allCars.filter(car => car.user === currentUser.username));
    }, []);

    const handleDelete = id => {
        const updatedCars = cars.filter(car => car.id !== id);
        setCars(updatedCars);
        localStorage.setItem('cars', JSON.stringify(updatedCars));
    };

    const filteredCars = cars.filter(car =>
        car.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="product-list">
            <h2>Your Cars</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search your cars..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <button onClick={() => navigate('/add')}>Add Car</button>
            </div>
            <div className="cars">
                {filteredCars.map(car => (
                    <div key={car.id} className="card">
                        <img src={car.images[0]} alt={car.title} />
                        <div className="card-content">
                            <h3>{car.title}</h3>
                            <p>{car.description}</p>
                            <button className="edit" onClick={() => navigate(`/products/${car.id}`)}>Edit</button>
                            <button className="delete" onClick={() => handleDelete(car.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
