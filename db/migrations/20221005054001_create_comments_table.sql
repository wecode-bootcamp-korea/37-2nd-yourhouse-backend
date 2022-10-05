-- migrate:up
CREATE TABLE comments(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    comment VARCHAR(500) NOT NULL,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    CONSTRAINT comments_user_fkey FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT comments_post_fkey FOREIGN KEY (post_id) REFERENCES posts (id)
)
-- migrate:down
DROP TABLE comments