class Car {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
  }) {
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
  }

  render() {
    return `
      <div class="card p-2">
        <img src="${this.image}" class="card-img-top w-100 h-100 object-fit-cover" alt="Card Image">
        <div class="card-body">
          <h4 class="card-title fs-6">${this.manufacture}/${this.model}</h4>
          <h3 class="card-title fs-5 fw-bold">Rp ${this.rentPerDay}/hari</h3>
          <p class="">${this.description}</p>
          <div class="row mb-2">
            <div class="col-1">
              <img src="images/rent/users.png" alt="Users Logo" width="20px">
            </div>
            <div class="col-lg">
              ${this.capacity} Orang
            </div>
          </div>

          <div class="row mb-2">
            <div class="col-1">
              <img src="images/rent/gear.png" alt="Gear Logo" width="20px">
            </div>
            <div class="col-lg">
              ${this.transmission}
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-1">
              <img src="images/rent/calendar.png" alt="Calendar Logo" width="20px">
            </div>
            <div class="col-lg">Tahun ${this.year}</div>
          </div>
          <a href="#" class="btn btn-button py-2 px-4">Rent Car</a>
        </div>
      </div>
    `;
  }
}
