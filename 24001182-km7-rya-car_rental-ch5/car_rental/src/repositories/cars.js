const JSONBigInt = require("json-bigint");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Dapatkan semua data cars
exports.getAllCars = async (driveType, transmission, availableAt, capacity) => {
  let query = {
    include: {
      models: {
        include: {
          manufactures: true,
          transmissions: true,
        },
      },
      types: true,
    },
  };

  let arrQuery = [];
  if (driveType) {
    arrQuery.push({
      models: {
        transmissions: {
          driveType: { contains: driveType, mode: "insensitive" },
        },
      },
    });
  }

  if (transmission) {
    arrQuery.push({
      models: {
        transmissions: {
          name: { contains: transmission, mode: "insensitive" },
        },
      },
    });
  }

  if (availableAt) {
    arrQuery.push({
      availableAt: { gte: availableAt },
    });
  }

  if (capacity) {
    arrQuery.push({
      types: {
        capacity: { gte: parseInt(capacity, 10) },
      },
    });
  }

  if (arrQuery.length > 0) {
    query.where = {
      ...query.where,
      OR: arrQuery,
    };
  }

  const searchedCars = await prisma.cars.findMany(query);

  // Konversi field BigInt ke string supaya serialization-nya aman
  const serializedCars = JSONBigInt.stringify(searchedCars);
  return JSONBigInt.parse(serializedCars);
};

// Dapatkan data car dari id
exports.getCarById = async (id) => {
  const car = await prisma.cars.findFirst({
    where: {
      id: id,
    },
    include: {
      models: {
        include: {
          manufactures: true,
          transmissions: true,
        },
      },
      types: true,
    },
  });

  // Konversi field BigInt ke string supaya serialization-nya aman
  const serializedCar = JSONBigInt.stringify(car);
  return JSONBigInt.parse(serializedCar);
};

exports.addNewCar = async (data) => {
  const newCar = await prisma.cars.create({
    data,
    include: {
      models: true,
      types: true,
    },
  });

  // Convert BigInt fields to strings for safe serialization
  const serializedNewCar = JSONBigInt.stringify(newCar);
  return JSONBigInt.parse(serializedNewCar);
};

exports.updateCar = async (id, data) => {
  const updatedCar = await prisma.cars.update({
    where: { id },
    include: {
      models: true,
      types: true,
    },
    data,
  });

  // Konversi field BigInt ke string supaya serialization-nya aman
  const serializedCar = JSONBigInt.stringify(updatedCar);
  return JSONBigInt.parse(serializedCar);
};

exports.deleteCarById = async (id) => {
  const deletedCar = await prisma.cars.delete({
    where: { id },
    include: {
      models: true,
      types: true,
    },
  });

  // Konversi field BigInt ke string supaya serialization-nya aman
  const serializedCar = JSONBigInt.stringify(deletedCar);
  return JSONBigInt.parse(serializedCar);
};
