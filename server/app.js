const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const ItemTypes = {
  REAL_ESTATE: "Недвижимость",
  AUTO: "Авто",
  SERVICES: "Услуги",
};

const app = express();
app.use(bodyParser.json());
app.use(cors());

// In-memory хранилище для объявлений
let items = [
  {
    id: 1000,
    name: "Квартира в центре",
    description: "Просторная квартира в центре города",
    location: "Москва",
    image:
      "https://i.pinimg.com/736x/af/31/98/af3198982663913e77d621ebe515342f.jpg",
    type: "Недвижимость",
    propertyType: "Квартира",
    area: 100,
    rooms: 3,
    price: 15000000,
  },
  {
    id: 2000,
    name: "Toyota Camry",
    description: "Надежный автомобиль",
    location: "Москва",
    image: "https://fili-auto.ru/static/imgCar/118/5623foto-camry-2019_01.jpg",
    type: "Авто",
    brand: "Toyota",
    model: "Camry",
    year: 2020,
    mileage: 15000,
  },
  {
    id: 3000,
    name: "Ремонт квартир",
    description: "Качественный ремонт квартир",
    location: "Москва",
    image: "https://www.ixbt.com/img/n1/news/2022/5/2/3-1_large.png",
    type: "Услуги",
    serviceType: "Ремонт",
    experience: 5,
    cost: 50000,
    workSchedule: "Пн-Пт, 9:00-18:00",
  },
  {
    id: 4000,
    name: "Дом в Подмосковье",
    description: "Уютный дом с участком в Подмосковье",
    location: "Подмосковье",
    type: "Недвижимость",
    propertyType: "Дом",
    area: 150,
    rooms: 4,
    price: 25000000,
  },
  {
    id: 5000,
    name: "BMW X5",
    description: "Люксовый внедорожник BMW X5",
    location: "Санкт-Петербург",
    type: "Авто",
    brand: "BMW",
    model: "X5",
    year: 2022,
    mileage: 5000,
  },
  {
    id: 6000,
    name: "Клининговые услуги",
    description: "Профессиональный клининговый сервис",
    location: "Москва",
    type: "Услуги",
    serviceType: "Клининг",
    experience: 7,
    cost: 30000,
    workSchedule: "Пн-Вс, 8:00-20:00",
  },
  {
    id: 7000,
    name: "Квартира на Неве",
    description: "Квартира с видом на Неву",
    location: "Санкт-Петербург",
    type: "Недвижимость",
    propertyType: "Квартира",
    area: 80,
    rooms: 2,
    price: 12000000,
  },
  {
    id: 8000,
    name: "Mercedes-Benz S-Class",
    description: "Люксовый седан Mercedes-Benz S-Class",
    location: "Москва",
    type: "Авто",
    brand: "Mercedes-Benz",
    model: "S-Class",
    year: 2021,
    mileage: 10000,
  },
  {
    id: 9000,
    name: "Курьерские услуги",
    description: "Быстрые и надежные курьерские услуги",
    location: "Москва",
    type: "Услуги",
    serviceType: "Курьерские услуги",
    experience: 3,
    cost: 15000,
    workSchedule: "Пн-Вс, 9:00-18:00",
  },
];

const makeCounter = () => {
  let count = 0;
  return () => count++;
};

const itemsIdCounter = makeCounter();

// Создание нового объявления
app.post("/items", (req, res) => {
  const { name, description, location, type, ...rest } = req.body;

  // Validate common required fields
  if (!name || !description || !location || !type) {
    return res.status(400).json({ error: "Missing required common fields" });
  }

  switch (type) {
    case ItemTypes.REAL_ESTATE:
      if (!rest.propertyType || !rest.area || !rest.rooms || !rest.price) {
        return res
          .status(400)
          .json({ error: "Missing required fields for Real estate" });
      }
      break;
    case ItemTypes.AUTO:
      if (!rest.brand || !rest.model || !rest.year || !rest.mileage) {
        return res
          .status(400)
          .json({ error: "Missing required fields for Auto" });
      }
      break;
    case ItemTypes.SERVICES:
      if (!rest.serviceType || !rest.experience || !rest.cost) {
        return res
          .status(400)
          .json({ error: "Missing required fields for Services" });
      }
      break;
    default:
      return res.status(400).json({ error: "Invalid type" });
  }

  const item = {
    id: itemsIdCounter(),
    name,
    description,
    location,
    type,
    ...rest,
  };

  items.push(item);
  res.status(201).json(item);
});

// Получение всех объявлений
app.get("/items", (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const advertisements = items.slice(startIndex, endIndex);

  const totalPages = Math.ceil(items.length / limit);

  res.json({
    advertisements,
    currentPage: page,
    totalPages: totalPages,
  });
});

// Получение объявления по его id
app.get("/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id, 10));
  if (item) {
    res.json(item);
  } else {
    res.status(404).send("Item not found");
  }
});

// Обновление объявления по его id
app.put("/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id, 10));
  if (item) {
    Object.assign(item, req.body);
    res.json(item);
  } else {
    res.status(404).send("Item not found");
  }
});

// Удаление объявления по его id
app.delete("/items/:id", (req, res) => {
  const itemIndex = items.findIndex(
    (i) => i.id === parseInt(req.params.id, 10)
  );
  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send("Item not found");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
