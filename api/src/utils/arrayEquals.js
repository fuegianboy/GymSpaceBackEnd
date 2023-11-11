const arrayEquals = (arr1, arr2) =>{
    if( arr1.length !== arr2.length){
        return false
    }

    const arr1Sorted = arr1.slice().sort();
    const arr2Sorted = arr2.slice().sort();

    for(let index = 0; index<arr1Sorted; index++){
        if(arr1Sorted[index]!==arr2Sorted[index]){
            return false
        }
    }
    
    return true
}

module.exports = {arrayEquals}