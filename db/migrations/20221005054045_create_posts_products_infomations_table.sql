-- migrate:up
CREATE TABLE posts_products_infomations(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    post_info_id INT NOT NULL,
    product_id INT NOT NULL,
    offset_X INT NOT NULL,
    offset_Y INT NOT NULL,
    CONSTRAINT post_in_info_fkey FOREIGN KEY (post_info_id) REFERENCES posts_infomations (id),
    CONSTRAINT post_in_pro_fkey FOREIGN KEY (product_id) REFERENCES products (id)
)
-- migrate:down
DROP TABLE posts_products_infomations