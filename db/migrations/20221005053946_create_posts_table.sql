-- migrate:up
CREATE TABLE posts(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(500) NULL,
    user_id INT NOT NULL,
    create_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT posts_user_fkey FOREIGN KEY (user_id) REFERENCES users (id)
)
-- migrate:down
DROP TABLE posts