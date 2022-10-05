-- migrate:up
CREATE TABLE posts_infomations(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    room_size_id INT NOT NULL,
    residence_id INT NOT NULL,
    style_id INT NOT NULL,
    space_id INT NOT NULL,
    post_id INT NOT NULL,
    image VARCHAR(1000) NOT NULL,
    description VARCHAR(500) NULL,
    CONSTRAINT room_posts_fkey FOREIGN KEY (room_size_id) REFERENCES room_sizes (id),
    CONSTRAINT resi_posts_fkey FOREIGN KEY (residence_id) REFERENCES residences (id),
    CONSTRAINT style_posts_fkey FOREIGN KEY (style_id) REFERENCES styles (id),
    CONSTRAINT space_posts_fkey FOREIGN KEY (space_id) REFERENCES spaces (id),
    CONSTRAINT post_posts_fkey FOREIGN KEY (post_id) REFERENCES posts (id)
)

-- migrate:down
DROP TABLE posts_infomations