var car = {
    set brand(brand) { throw new Error('cannot change brand') },
    get brand() { return 'Tesla' },

    set model(model) { throw new Error('cannot change model') },
    get model() { return 'model 3' }
}

console.log(car.brand, car.model)