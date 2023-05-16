CREATE TABLE users (
	id VARCHAR(100) NOT NULL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  sex ENUM('Male', 'Female'),
  relgion VARCHAR(20) NOT NULL,
  address VARCHAR(100) NOT NULL,
  birth_date DATE NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  created_at DATETIME NOT NULL
);