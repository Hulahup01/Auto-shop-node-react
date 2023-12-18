import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../index';
import './TypeBar.css';

const TypeBar = observer(() => {
    const {products} = useContext(Context)
    return (
        <ul className="type-bar">
            
            {products.types.map(type => 
                <li className={`type-bar-item ${type.id === products.selectedType.id ? 'active' : ''}`}
                    onClick={() => products.setSelectedType(type)}
                    key={type.id}>
                    {type.name}
                </li>
            )}
            
      </ul>
    );
});

export default TypeBar;