import fs from 'fs';
import path from 'path';
import url from 'url';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundError } from '../utils/request.js';

// Referensi path folder public
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, "../../public");

// Referensi path file json
const jsonFile = path.join(PUBLIC_DIR, "./data/cars.json");

// Read isi data cars.json dan parse menjadi object JavaScript
const jsonData = fs.readFileSync(jsonFile, "utf-8");
const cars = JSON.parse(jsonData);

// Dapatkan semua data cars
export const getAllCars = (rentPerDay, capacity, availableAt, year) => {
  const searchedCar = cars.filter(car => {
    // Filter data
    let result = true;
    if (rentPerDay) {
      const isFoundRentPerDay = Number(car.rentPerDay) <= Number(rentPerDay);
      result = result && isFoundRentPerDay;
    }

    if (capacity) {
      const isFoundCapacity = Number(car.capacity) <= Number(capacity);
      result = result && isFoundCapacity;
    }

    if (availableAt) {
      const queryAvailableAt = new Date(availableAt)
      const carAvailableDate = new Date(car.availableAt);
      const isFoundAvailableAt = carAvailableDate >= queryAvailableAt;
      result = result && isFoundAvailableAt;
    }
    
    if (year) {
      const isFoundYear = Number(car.year) <= Number(year);
      result = result && isFoundYear;
    }
    return result;
  });

  return searchedCar;
};

// Dapatkan data car dari id
export const getCarById = (id) => {
  const carData = cars.find((car) => car.id === id);
  return carData;
};

export const addNewCar = (data) => {
  const newCar = {
    id: uuidv4(),
    ...data,
  };

  // Push data body baru ke dalam data json
  cars.push(newCar);

  const formatJson = JSON.stringify(cars, null, 4);
  
  // Write json file dengan data JSON baru
  /*
  fs.writeFile(jsonFile, formatJson, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Data car gagal ditambahkan" })
    } else {
      res.status(201).json({ message: "Data car berhasil ditambahkan" })
    }
  });
  */

  // Save the latest data to json
  fs.writeFileSync(
    jsonFile,
    formatJson,
    "utf-8"
  );

  return newCar;
};

export const updateCar = (id, data) => {
  // Kirim perubahan data body ke dalam data json
  const carIndex = cars.find((car) => car.id === id);
  if (!carIndex) {
    throw new NotFoundError("Car Index Data Not Found!");
  };

  Object.assign(carIndex, data);

  const formatJson = JSON.stringify(cars, null, 4);

  // Save the latest data to json
  fs.writeFileSync(
    jsonFile,
    formatJson,
    "utf-8"
  );

  return carIndex;
};

export const deleteCarById = (id) => {
  // Cari data car dari index yg ingin dihapus
  const carIndex = cars.findIndex((car) => car.id === id);
  if (carIndex < 0) {
    return null;
  };

  const deletedCar = cars.splice(carIndex, 1);

  const formatJson = JSON.stringify(cars, null, 4);

  // Save the latest data to json
  fs.writeFileSync(
    jsonFile,
    formatJson,
    "utf-8"
  );

  return deletedCar;
};