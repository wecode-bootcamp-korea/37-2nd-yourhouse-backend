-- migrate:up
CREATE TABLE room_sizes(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    size VARCHAR(50) NOT NULL
)
-- migrate:down
DROP TABLE room_sizes