function sortCarByYearAscendingly(cars) {
  // Sangat dianjurkan untuk console.log semua hal hehe
  // console.log(cars);

  // Clone array untuk menghindari side-effect
  // Apa itu side effect?
  const result = [...cars];

  // Tulis code-mu disini

  // Bubble Sort
  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < (result.length - i - 1); j++) {
      currYear = result[j].year;
      nextYear = result[j + 1].year;
      // console.log(`year now ${currYear} and next year ${nextYear}`)
      if (currYear > nextYear) {
        // Swap current Index and next Index
        currIndex = result[j];
        nextIndex = result[j + 1];

        // Destructuring swap
        [currIndex, nextIndex] = [nextIndex, currIndex]

        // Alternative
        const temp = result[j];
        result[j] = result[j + 1];
        result[j + 1] = temp;
      }
    }
  }

  /* 
  ---------------------Merge Sort---------------------
  function merge(left, right) {
    let resultArray = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex].year < right[rightIndex].year) {
        resultArray.push(left[leftIndex]);
        leftIndex++;
      } else {
        resultArray.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return resultArray
      .concat(left.slice(leftIndex))
      .concat(right.slice(rightIndex));
  }

  function mergeSort(array) {
    if (array.length === 1) {
      return array;
    }

    const middle = Math.floor(array.length / 2); // Cari index tengah
    const left = array.slice(0, middle); // bagi array sebagian di kiri
    const right = array.slice(middle); // bagi array sebagian di kanan

    return merge(mergeSort(left), mergeSort(right));
  }

  console.log(mergeSort(result));
  
  */

  /*
  Sort function
  result.sort((a, b) => a.year - b.year);
  */
 
 // Rubah code ini dengan array hasil sorting secara ascending
 // return result;
  console.log(result)
}

