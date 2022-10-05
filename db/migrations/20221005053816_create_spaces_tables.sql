-- migrate:up
CREATE TABLE spaces(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(50) NOT NULL
)
-- migrate:down
DROP TABLE spaces