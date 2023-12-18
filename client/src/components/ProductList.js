import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../index';

const ProductList = observer(() => {
    const {device} = useContext(Context);
    
    return(
        <div>

        </div>
    );
});