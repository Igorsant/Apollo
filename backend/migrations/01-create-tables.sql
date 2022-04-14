CREATE TABLE Phone (
	id SERIAL NOT NULL,
	phone VARCHAR(32) NOT NULL,
	is_phone_whatsapp BOOLEAN,

	PRIMARY KEY (id)
);

CREATE TABLE Workplace (
	id SERIAL NOT NULL,
	phone1_id INTEGER NOT NULL,
	phone2_id INTEGER,
	street VARCHAR(256) NOT NULL,
	street_number INTEGER NOT NULL,
	complement VARCHAR(256) NOT NULL,

	PRIMARY KEY (id),
	FOREIGN KEY (phone1_id) REFERENCES Phone(id),
	FOREIGN KEY (phone2_id) REFERENCES Phone(id)
);

CREATE TABLE Customer (
	id SERIAL NOT NULL,
	phone_id INTEGER NOT NULL,
	full_name VARCHAR(256) NOT NULL,
	nickname VARCHAR(64) NOT NULL,
	picture_path VARCHAR(128) NOT NULL,
	email VARCHAR(256) NOT NULL,
	cpf CHAR(12) NOT NULL,
	password_hash VARCHAR(256) NOT NULL,

	PRIMARY KEY (id),
	FOREIGN KEY (phone_id) REFERENCES Phone(id)
);

CREATE TABLE Professional (
	id SERIAL NOT NULL,
	phone_id INTEGER NOT NULL,
	workplace_id INTEGER NOT NULL,
	full_name VARCHAR(256) NOT NULL,
	nickname VARCHAR(64) NOT NULL,
	picture_path VARCHAR(128) NOT NULL,
	email VARCHAR(256) NOT NULL,
	cpf CHAR(12) NOT NULL,
	password_hash VARCHAR(256) NOT NULL,
	about_me TEXT NOT NULL,

	PRIMARY KEY (id),
	FOREIGN KEY (phone_id) REFERENCES Phone(id),
  	FOREIGN KEY (workplace_id) REFERENCES Workplace(id)
);

CREATE TABLE Workday (
	id SERIAL NOT NULL,
	professional_id INTEGER NOT NULL,
	week_day SMALLINT NOT NULL,

	PRIMARY KEY (id),
	FOREIGN KEY (professional_id) REFERENCES Professional(id)
);

CREATE TABLE Review (
	id SERIAL NOT NULL,
	professional_id INTEGER NOT NULL,
	customer_id INTEGER NOT NULL,
	comment VARCHAR(512),
	rating SMALLINT NOT NULL,

	PRIMARY KEY (id),
	FOREIGN KEY (professional_id) REFERENCES Professional(id),
	FOREIGN KEY (customer_id) REFERENCES Customer(id)
);

CREATE TABLE Schedulling (
	id SERIAL NOT NULL,
	professional_id INTEGER NOT NULL,
	customer_id INTEGER NOT NULL,
	schedulling_datetime TIMESTAMP NOT NULL,
	confirmed BOOLEAN NOT NULL,

	PRIMARY KEY (id),
	FOREIGN KEY (professional_id) REFERENCES Professional(id),
	FOREIGN KEY (customer_id) REFERENCES Customer(id)
);

CREATE TABLE Service (
	id SERIAL NOT NULL,
	professional_id INTEGER NOT NULL,
	name VARCHAR(128) NOT NULL,
	price NUMERIC NOT NULL,
	estimated_duration VARCHAR(16) NOT NULL,

	PRIMARY KEY (id) ,
	FOREIGN KEY (professional_id) REFERENCES Professional(id)
);

CREATE TABLE Schedulling_Service (
	schedule_id INTEGER NOT NULL,
	service_id INTEGER NOT NULL,

	PRIMARY KEY (schedule_id, service_id),
	FOREIGN KEY (schedule_id) REFERENCES Schedulling(id),
	FOREIGN KEY (service_id) REFERENCES Service(id)
);

CREATE TABLE Time_Range (
	id SERIAL NOT NULL,
	workday_id INTEGER NOT NULL,
	start_time TIME NOT NULL,
	end_time TIME NOT NULL,
	break_time BOOLEAN NOT NULL,

	PRIMARY KEY (id),
	FOREIGN KEY (workday_id) REFERENCES Workday(id)
);