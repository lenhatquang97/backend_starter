CREATE TABLE `meal_history` (
  `id` varchar(255) PRIMARY KEY,
  `oa_id` varchar(255),
  `store_id` varchar(255),
  `user_id` varchar(255)
);

CREATE TABLE `official_account` (
  `oa_id` varchar(255) PRIMARY KEY,
  `name` varchar(255),
  `description` varchar(255),
  `cover` varchar(255),
  `avatar` varchar(255)
);

CREATE TABLE `oa_category` (
  `oa_id` varchar(255),
  `category_id` varchar(255)
);

CREATE TABLE `store` (
  `store_id` varchar(255) PRIMARY KEY,
  `oa_id` varchar(255),
  `store_name` varchar(255),
  `address` varchar(255),
  `longtitude` float,
  `latitude` float,
  `min_price` int,
  `max_price` int
);

CREATE TABLE `category` (
  `category_id` varchar(255) PRIMARY KEY,
  `category_description` varchar(255)
);

CREATE TABLE `voucher` (
  `voucher_id` varchar(255) PRIMARY KEY,
  `oa_id` varchar(255),
  `voucher_name` varchar(255),
  `voucher_description` varchar(255)
);

CREATE TABLE `user_likes` (
  `user_id` varchar(255),
  `store_id` varchar(255)
);

CREATE TABLE `user` (
  `user_id` varchar(255) PRIMARY KEY,
  `user_name` varchar(255),
  `user_ava` varchar(255)
);

CREATE TABLE `booking` (
  `booking_id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `user_id` varchar(255),
  `store_id` varchar(255),
  `start_time` BIGINT,
  `end_time` BIGINT,
  `is_cancel` boolean DEFAULT false,
  `is_match` boolean DEFAULT false,
  `conversation_id` varchar(255)
);

ALTER TABLE `meal_history` ADD FOREIGN KEY (`oa_id`) REFERENCES `official_account` (`oa_id`);

ALTER TABLE `meal_history` ADD FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`);

ALTER TABLE `meal_history` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `oa_category` ADD FOREIGN KEY (`oa_id`) REFERENCES `official_account` (`oa_id`);

ALTER TABLE `oa_category` ADD FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`);

ALTER TABLE `store` ADD FOREIGN KEY (`oa_id`) REFERENCES `official_account` (`oa_id`);

ALTER TABLE `voucher` ADD FOREIGN KEY (`oa_id`) REFERENCES `official_account` (`oa_id`);

ALTER TABLE `user_likes` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `user_likes` ADD FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`);

ALTER TABLE `booking` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `booking` ADD FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`);

CREATE TABLE `message` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `sender` varchar(50),
  `content` text,
  `replyTo` varchar(50),
  `createdAt` varchar(50),
  `type` varchar(50),
  `conversation_id` varchar(255)
);

ALTER TABLE `user` 
ADD COLUMN `user_ava` VARCHAR(255);
