import React from 'react';
import '../styles/Shop.css'
import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';

const Shop = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="column" style={{ gridArea: 'first-column' }}>
                    <TypeBar/>
                </div>
                <div className="column" style={{ gridArea: 'second-column' }}>
                    <BrandBar/>
                </div>
            </div>
        </div>
    )
}

export default Shop;