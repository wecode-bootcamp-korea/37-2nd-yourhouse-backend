-- migrate:up
CREATE TABLE products(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(300) NOT NULL,
    image VARCHAR(1000) NOT NULL,
    color_id INT NOT NULL,
    CONSTRAINT product_color_fkey FOREIGN KEY (color_id) REFERENCES colors (id)
)
-- migrate:down
DROP TABLE products