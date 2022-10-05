-- migrate:up
CREATE TABLE hashtags(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    post_info_id INT NOT NULL,
    CONSTRAINT hash_post_in_fkey FOREIGN KEY (post_info_id) REFERENCES posts_infomations (id)
)
-- migrate:down
DROP TABLE hashtags