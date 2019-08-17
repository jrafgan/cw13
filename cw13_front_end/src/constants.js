export const apiURL = 'http://localhost:8003';

export const arraySum = (array) => {
    let sum = 0;
    for(let i = 0; i < array.length; i++){
        sum += array[i];
    }
    return sum/array.length;
};