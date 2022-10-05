-- migrate:up
CREATE TABLE residences(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(50) NOT NULL
)
-- migrate:down
DROP TABLE residences