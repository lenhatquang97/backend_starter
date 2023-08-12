CREATE TABLE `official_account` (
  `oa_id` varchar(255) CHARACTER SET utf8 PRIMARY KEY,
  `name` varchar(255) CHARACTER SET utf8,
  `description` varchar(255) CHARACTER SET utf8,
  `cover` varchar(255) CHARACTER SET utf8,
  `avatar` varchar(255) CHARACTER SET utf8
);

CREATE TABLE `oa_category` (
  `oa_id` varchar(255) CHARACTER SET utf8,
  `category_id` varchar(255) CHARACTER SET utf8
);

CREATE TABLE `store` (
  `store_id` varchar(255) CHARACTER SET utf8 PRIMARY KEY,
  `oa_id` varchar(255) CHARACTER SET utf8,
  `store_name` varchar(255) CHARACTER SET utf8,
  `address` varchar(255) CHARACTER SET utf8,
  `longtitude` float,
  `latitude` float,
  `min_price` int,
  `max_price` int
);

CREATE TABLE `category` (
  `category_id` varchar(255) CHARACTER SET utf8 PRIMARY KEY,
  `category_description` varchar(255) CHARACTER SET utf8
);

CREATE TABLE `voucher` (
  `voucher_id` varchar(255) CHARACTER SET utf8 PRIMARY KEY,
  `oa_id` varchar(255) CHARACTER SET utf8,
  `voucher_name` varchar(255) CHARACTER SET utf8,
  `voucher_description` varchar(255) CHARACTER SET utf8
);

CREATE TABLE `user_likes` (
  `user_id` varchar(255) CHARACTER SET utf8,
  `store_id` varchar(255) CHARACTER SET utf8
);

CREATE TABLE `user` (
  `user_id` varchar(255) CHARACTER SET utf8 PRIMARY KEY,
  `user_name` varchar(255) CHARACTER SET utf8
);

CREATE TABLE `booking` (
  `booking_id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `user_id` varchar(255) CHARACTER SET utf8,
  `oa_id` varchar(255) CHARACTER SET utf8,
  `store_id` varchar(255) CHARACTER SET utf8,
  `store_name` varchar(255) CHARACTER SET utf8,
  `start_time` BIGINT,
  `end_time` BIGINT,
  `is_cancel` boolean DEFAULT false,
  `is_match` boolean DEFAULT false,
  `conversation_id` varchar(255) CHARACTER SET utf8
);

CREATE TABLE `message` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `sender` varchar(50) CHARACTER SET utf8,
  `content` text,
  `replyTo` varchar(50) CHARACTER SET utf8,
  `createdAt` varchar(50) CHARACTER SET utf8,
  `type` varchar(50) CHARACTER SET utf8,
  `conversation_id` varchar(255) CHARACTER SET utf8
);

ALTER TABLE `oa_category` ADD FOREIGN KEY (`oa_id`) REFERENCES `official_account` (`oa_id`);

ALTER TABLE `oa_category` ADD FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`);

ALTER TABLE `store` ADD FOREIGN KEY (`oa_id`) REFERENCES `official_account` (`oa_id`);

ALTER TABLE `voucher` ADD FOREIGN KEY (`oa_id`) REFERENCES `official_account` (`oa_id`);

ALTER TABLE `user_likes` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `user_likes` ADD FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`);

ALTER TABLE `booking` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `booking` ADD FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`);



