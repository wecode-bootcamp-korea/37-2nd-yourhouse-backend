-- migrate:up
CREATE TABLE styles(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    style VARCHAR(50) NOT NULL
)
-- migrate:down
DROP TABLE styles