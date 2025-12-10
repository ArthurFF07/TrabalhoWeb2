-- Tabela de carros cadastrados
CREATE TABLE cars (
  id INTEGER PRIMARY KEY,
  name TEXT,
  price DECIMAL(8,2),
  contact TEXT,
  photos TEXT, -- armazenar JSON com URLs das fotos
  specs TEXT,
  comment TEXT
);

-- Tabela de aluguéis realizados
CREATE TABLE rentals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  car_id INTEGER REFERENCES cars(id),
  user_contact TEXT,
  date_reserved DATETIME DEFAULT CURRENT_TIMESTAMP,
  from_date DATE,
  from_time TIME,
  status TEXT
);
