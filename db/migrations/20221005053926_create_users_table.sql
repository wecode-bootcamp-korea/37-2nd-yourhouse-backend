-- migrate:up
CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    social_id BIGINT NOT NULL,
    email VARCHAR(100) NOT NULL,
    nickname VARCHAR(30) NOT NULL,
    profile_image VARCHAR(1000) NULL,
    description VARCHAR(300) NULL,
    CONSTRAINT users_name_ukey UNIQUE (nickname)
)
-- migrate:down
DROP TABLE users