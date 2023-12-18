import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import './BrandBar.css';
import { Context } from '../index';

const BrandBar = observer(() => {
    const {products} = useContext(Context);
    return (
        <div className="brand-bar">
            {products.brands.map((brand) => (
            <div
              key={brand.id}
              className={`brand-card ${brand.id === products.selectedBrand.id ? 'active' : ''}`}
              onClick={() => products.setSelectedBrand(brand)}>
              {brand.name}
            </div>
            ))}
        </div>
    );
});

export default BrandBar;