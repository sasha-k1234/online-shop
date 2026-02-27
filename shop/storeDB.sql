CREATE DATABASE IF NOT EXISTs store;

CREATE TABLE IF NOT EXISTS`store`.user(
	id INT AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(100) NOT NULL,
    first_name VARCHAR(45) NOT NULL,
    last_name VARCHAR(45) NOT NULL,
    birth_date DATE,
    
    CONSTRAINT user_id_pk PRIMARY KEY(id),
    CONSTRAINT user_username_uq UNIQUE(username),
    CONSTRAINT user_email_uq UNIQUE(email),
    INDEX user_username_idx(username)
);

CREATE TABLE IF NOT EXISTS `store`.category(
	id INT AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    
    CONSTRAINT category_id_pk PRIMARY KEY(id),
    CONSTRAINT category_name_uq UNIQUE(name)
 );

CREATE TABLE IF NOT EXISTS `store`.photo(
	id INT AUTO_INCREMENT,
    url VARCHAR(500) NOT NULL,
    name VARCHAR(45) NOT NULL,
    is_main BOOL DEFAULT FALSE,
    expires_in DATETIME,
    CONSTRAINT photo_id_pk PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS `store`.product(
	id INT AUTO_INCREMENT,
    category_id INT ,
    views_count INT NOT NULL DEFAULT 0,
    price DECIMAL(10,4) DEFAULT 0,
    name VARCHAR(30) NOT NULL,
    description NVARCHAR(5000),
    rating DECIMAL(2,1) DEFAULT 0,
    is_deleted BOOL DEFAULT FALSE,
    ratings_sum INT NOT NULL DEFAULT 0,
    ratings_count INT NOT NULL DEFAULT 0,
    feature NVARCHAR(5000),
	
    CONSTRAINT product_id_pk PRIMARY KEY(id),
    CONSTRAINT product_category_id_fk 
		FOREIGN KEY(category_id) 
		REFERENCES `store`.category(id)
		ON DELETE SET NULL,
        INDEX product_name_idx(name)
);

CREATE TABLE IF NOT EXISTS `store`.product_photo(
	photo_id INT NOT NULL,
    product_id INT NOT NULL,		
    
    CONSTRAINT photo_product_id_pk PRIMARY KEY(photo_id,product_id),
    CONSTRAINT product_photo_photo_id_photo_fk 
		FOREIGN KEY(photo_id) 
		REFERENCES `store`.photo(id)
        ON DELETE CASCADE,
	CONSTRAINT product_photo_product_id_product_fk 
		FOREIGN KEY(product_id) 
		REFERENCES `store`.product(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `store`.user_photo(
	photo_id INT NOT NULL,
    user_id INT NOT NULL,
    
    CONSTRAINT photo_user_id_pk PRIMARY KEY(photo_id,user_id),
    CONSTRAINT user_photo_photo_id_photo_fk 
		FOREIGN KEY(photo_id) 
        REFERENCES `store`.photo(id) 
        ON DELETE NO ACTION,
	CONSTRAINT user_photo_user_id_user_fk
		FOREIGN KEY(user_id)
        REFERENCES `store`.user(id)
		ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS `store`.favorite(
	product_id INT NOT NULL,
    user_id INT NOT NULL,
    
    CONSTRAINT product_user_id_pk PRIMARY KEY(product_id,user_id),
    CONSTRAINT favorite_user_id_user_fk
		FOREIGN KEY(user_id)
        REFERENCES `store`.user(id)
		ON DELETE NO ACTION,
	CONSTRAINT favorite_product_id_product_fk 
		FOREIGN KEY(product_id) 
		REFERENCES `store`.product(id)
        ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS `store`.review(
	id INT AUTO_INCREMENT ,
    text NVARCHAR(180),
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    date DATETIME NOT NULL,
    rate INT NOT NULL DEFAULT 0,
    
    CONSTRAINT review_id_pk PRIMARY KEY(id),
    CONSTRAINT user_id_review_id_fk 
		FOREIGN KEY(user_id)
        REFERENCES `store`.user(id)
        ON DELETE NO ACTION,
	CONSTRAINT product_id_review_fk
		FOREIGN KEY(product_id)
        REFERENCES `store`.product(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `store`.cart(
	quantity INT DEFAULT 1,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    
    CONSTRAINT cart_quantity_chk CHECK(quantity>0),
    CONSTRAINT cart_product_id_user_id_pk PRIMARY KEY(product_id,user_id),
    CONSTRAINT cart_product_id_fk 
		FOREIGN KEY(product_id)
        REFERENCES `store`.product(id)
        ON DELETE CASCADE,
	CONSTRAINT cart_user_id_fk
		FOREIGN KEY(user_id)
        REFERENCES `store`.user(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `store`.order(
	id INT AUTO_INCREMENT,
    date DATETIME NOT NULL,
    destination NVARCHAR(100),
    status VARCHAR(15),
    user_id INT NOT NULL,
    
    CONSTRAINT order_id_pk PRIMARY KEY(id),
    CONSTRAINT order_user_id_fk 
		FOREIGN KEY(user_id)
        REFERENCES `store`.user(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `store`.order_item(
	quantity INT DEFAULT 1,
    product_id INT NOT NULL,
    order_id INT NOT NULL,
    
    CONSTRAINT order_item_quantity_chk CHECK(quantity>0),
    CONSTRAINT order_item_product_id_order_id_pk PRIMARY KEY(product_id,order_id),
    CONSTRAINT order_item_product_id_fk 
		FOREIGN KEY(product_id)
        REFERENCES `store`.product(id)
        ON DELETE NO ACTION,
	CONSTRAINT order_item_order_id_fk
		FOREIGN KEY(order_id)
        REFERENCES `store`.order(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `store`.notification_type(
	id INT AUTO_INCREMENT,
    name NVARCHAR(25),
    CONSTRAINT notification_id_pk PRIMARY KEY(id),
    CONSTRAINT notification_name_uq UNIQUE(name)
);

CREATE TABLE IF NOT EXISTS `store`.notification(
	user_id INT,
    id INT AUTO_INCREMENT,
    content NVARCHAR(1000),
    header NVARCHAR(100),
	is_read BOOLEAN,
    created_at DATETIME,
    read_at DATETIME,
    direct INT,
    is_available BOOLEAN DEFAULT FALSE,
    CONSTRAINT notification_id_pk PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS `store`.notification_type_notification(
	type_notify_id INT ,
    notify_id INT,
    CONSTRAINT notify_type_notify_type_notify_id_notify_id_pk PRIMARY KEY(type_notify_id,notify_id),
    CONSTRAINT notify_type_notify_type_notify_id_fk 
		FOREIGN KEY(type_notify_id)
        REFERENCES `store`.notification_type(id)
        ON DELETE CASCADE,
	CONSTRAINT notify_type_notify_notify_id_fk
		FOREIGN KEY(notify_id)
        REFERENCES `store`.notification(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `store`.role(
    id INT AUTO_INCREMENT,
    name NVARCHAR(20),
    normalized_name NVARCHAR(20),

    CONSTRAINT role_id_pk PRIMARY KEY(id) 
);

CREATE TABLE IF NOT EXISTS `store`.user_role(
    user_id INT,
    role_id INT,
    CONSTRAINT FOREIGN KEY(user_id)
    REFERENCES `store`.user(id)
    ON DELETE CASCADE,
    CONSTRAINT FOREIGN KEY(role_id)
    REFERENCES `store`.role(id)
    ON DELETE CASCADE
);

INSERT IGNORE INTO `store`.role (id,name,normalized_name) 
    VALUES
    (1,'user','USER'),
    (2,'admin','ADMIN');