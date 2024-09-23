function sortCarByYearDescendingly(cars) {
  // Sangat dianjurkan untuk console.log semua hal hehe
  // console.log(cars);

  // Clone array untuk menghindari side-effect
  // Apa itu side effect?
  const result = [...cars];

  // Tulis code-mu disini
  // Bubble Sort
  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < (result.length - i - 1); j++) {
      leftYear = result[j].year; // tahun yang ingin di-compare (kiri)
      rightYear = result[j + 1].year; // tahun yang ingin di-compare (kanan)
      // console.log(`year now ${leftYear} and next year ${rightYear}`)

      if (leftYear < rightYear) {
        // Swap left Index and right Index
        leftIndex = result[j];
        rightIndex = result[j + 1];

        // Destructuring swap
        [rightIndex, leftIndex] = [leftIndex, rightIndex];

        // Alternative
        // const temp = result[j + 1];
        // result[j + 1] = result[j];
        // result[j] = temp;
      }
    }
  }

  // -----------Merge Sort-------------
  /*
  function merge(left, right) {
    let resultArray = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex].year > right[rightIndex].year) {
        resultArray.push(left[leftIndex]);
        leftIndex++;
      } else {
        resultArray.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return resultArray.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
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

  // Sort function
  // result.sort((a, b) => b.year - a.year);

  // Rubah code ini dengan array hasil sorting secara descending
  // return result;

  console.log(result);
}
