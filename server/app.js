const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const SECRET_KEY = "secret_key";
const users = [];

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Middleware для проверки токена
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Access denied" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
};

// Регистрация пользователя
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });

  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "4h" });
  res.status(201).json({ token });
});

// Вход пользователя
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "4h" });
  res.json({ token });
});

const ItemTypes = {
  REAL_ESTATE: "Недвижимость",
  AUTO: "Авто",
  SERVICES: "Услуги",
};

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
    propertyType: "Квартиры",
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
    serviceType: "Ремонт и отделка",
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
    propertyType: "Дома, дачи, коттеджи",
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
    serviceType: "Уборка",
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
    propertyType: "Квартиры",
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
    serviceType: "Грузоперевозки",
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
app.post("/items", authenticateToken, (req, res) => {
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
  let filteredItems = items;

  // Фильтрация по категории
  if (req.query.type) {
    filteredItems = filteredItems.filter(
      (item) => item.type === req.query.type
    );
  }

  // Поиск по названию
  if (req.query.name) {
    const searchName = req.query.name.toLowerCase();
    filteredItems = filteredItems.filter((item) =>
      item.name.toLowerCase().includes(searchName)
    );
  }

  // Дополнительная фильтрация для категорий
  if (req.query.type === "Недвижимость") {
    if (req.query.propertyType) {
      filteredItems = filteredItems.filter(
        (item) => item.propertyType === req.query.propertyType
      );
    }
    if (req.query.areaFrom) {
      filteredItems = filteredItems.filter(
        (item) => item.area >= parseFloat(req.query.areaFrom)
      );
    }
    if (req.query.areaTo) {
      filteredItems = filteredItems.filter(
        (item) => item.area <= parseFloat(req.query.areaTo)
      );
    }
    if (req.query.rooms) {
      filteredItems = filteredItems.filter(
        (item) => item.rooms === parseInt(req.query.rooms)
      );
    }
    if (req.query.priceFrom) {
      filteredItems = filteredItems.filter(
        (item) => item.price >= parseFloat(req.query.priceFrom)
      );
    }
    if (req.query.priceTo) {
      filteredItems = filteredItems.filter(
        (item) => item.price <= parseFloat(req.query.priceTo)
      );
    }
  } else if (req.query.type === "Авто") {
    if (req.query.brand) {
      filteredItems = filteredItems.filter(
        (item) => item.brand === req.query.brand
      );
    }
    if (req.query.model) {
      filteredItems = filteredItems.filter(
        (item) => item.model === req.query.model
      );
    }
    if (req.query.yearFrom) {
      filteredItems = filteredItems.filter(
        (item) => item.year >= parseInt(req.query.yearFrom)
      );
    }
    if (req.query.yearTo) {
      filteredItems = filteredItems.filter(
        (item) => item.year <= parseInt(req.query.yearTo)
      );
    }
  } else if (req.query.type === "Услуги") {
    if (req.query.serviceType) {
      filteredItems = filteredItems.filter(
        (item) => item.serviceType === req.query.serviceType
      );
    }
    if (req.query.experienceFrom) {
      filteredItems = filteredItems.filter(
        (item) => item.experience >= parseInt(req.query.experienceFrom)
      );
    }
    if (req.query.costFrom) {
      filteredItems = filteredItems.filter(
        (item) => item.cost >= parseFloat(req.query.costFrom)
      );
    }
    if (req.query.costTo) {
      filteredItems = filteredItems.filter(
        (item) => item.cost <= parseFloat(req.query.costTo)
      );
    }
  }

  // Пагинация
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const advertisements = filteredItems.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredItems.length / limit);

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
app.put("/items/:id", authenticateToken, (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id, 10));
  if (item) {
    Object.assign(item, req.body);
    res.json(item);
  } else {
    res.status(404).send("Item not found");
  }
});

// Удаление объявления по его id
app.delete("/items/:id", authenticateToken, (req, res) => {
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
