import {makeAutoObservable} from 'mobx';

export default class ProductStore {
    constructor() {
        this._types = [
            {id: 1, name: 'Tire'},
            {id: 2, name: 'Shock absorbers'},
            {id: 3, name: 'ASFASDF'},
            {id: 4, name: 'GASGAGASGAG'},
        ]
        this._brands = [
            {id: 1, name: 'KAMA'},
            {id: 2, name: 'BMW'},
        ]
        this._products = [
            {id: 1, name: 'one', price: 1220, rating: 5, img: 'greg'},
            {id: 2, name: 'two', price: 1220, rating: 5, img: 'greg'},
            {id: 3, name: 'three', price: 1220, rating: 5, img: 'greg'},
            {id: 4, name: 'four', price: 1220, rating: 5, img: 'greg'}
        ]
        this._selectedType = {}
        this._selectedBrand = {}

        makeAutoObservable(this);
    }

    setTypes(types) {
        this._types = types;
    }

    setBrands(brands) {
        this._brands = brands;
    }

    setProducts(products) {
        this._products = products;
    }

    setSelectedType(type){
        this._selectedType = type;
    }

    setSelectedBrand(brand){
        this._selectedBrand = brand;
    }

    get types() {
        return this._types;
    }

    get brands() {
        return this._brands;
    }

    get products() {
        return this._products;
    }

    get selectedType() {
        return this._selectedType;
    }

    get selectedBrand() {
        return this._selectedBrand;
    }
}