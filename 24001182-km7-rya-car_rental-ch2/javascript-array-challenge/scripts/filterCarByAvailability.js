function filterCarByAvailability(cars) {
  // Sangat dianjurkan untuk console.log semua hal hehe
  // console.log(cars);

  // Tempat penampungan hasil
  const result = [];

  // Tulis code-mu disini
  for (let i = 0; i < cars.length; i++) {
    const availableCars = cars[i].available;
    if (availableCars == true) {
      result.push(cars[i]);
    }
  }

  /*
  cars.forEach(avCar => {
    const availableCars = cars[i].available;
    if (availableCars) {
      result.push(cars[i]);
    }
  });
  */

  // Rubah code ini dengan array hasil filter berdasarkan availablity
  return result;
}
