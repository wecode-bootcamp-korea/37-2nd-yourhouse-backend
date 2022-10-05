-- migrate:up
CREATE TABLE follows(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    follow_id INT NOT NULL,
    follower_id INT NOT NULL,
    CONSTRAINT follow_user_fkey FOREIGN KEY (follow_id) REFERENCES users (id),
    CONSTRAINT follower_user_fkey FOREIGN KEY (follower_id) REFERENCES users (id),
    CONSTRAINT follows_ukey UNIQUE (follow_id, follower_id)
)
-- migrate:down
DROP TABLE follows