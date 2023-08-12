-- -------------------------------------------------------------
-- TablePlus 5.3.9(502)
--
-- https://tableplus.com/
--
-- Database: db_test_04
-- Generation Time: 2023-08-12 15:13:16.6130
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `booking` (
  `booking_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `oa_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `store_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `store_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `start_time` bigint(20) DEFAULT NULL,
  `end_time` bigint(20) DEFAULT NULL,
  `is_cancel` tinyint(1) DEFAULT 0,
  `is_match` tinyint(1) DEFAULT 0,
  `conversation_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`booking_id`),
  KEY `user_id` (`user_id`),
  KEY `store_id` (`store_id`),
  CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `category` (
  `category_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `category_description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `category_icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `message` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `sender` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `content` text DEFAULT NULL,
  `replyTo` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `createdAt` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `type` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `conversation_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `oa_category` (
  `oa_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `category_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  KEY `oa_id` (`oa_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `oa_category_ibfk_1` FOREIGN KEY (`oa_id`) REFERENCES `official_account` (`oa_id`),
  CONSTRAINT `oa_category_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `official_account` (
  `oa_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `cover` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`oa_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `store` (
  `store_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `oa_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `store_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `longtitude` float DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `min_price` int(11) DEFAULT NULL,
  `max_price` int(11) DEFAULT NULL,
  PRIMARY KEY (`store_id`),
  KEY `oa_id` (`oa_id`),
  CONSTRAINT `store_ibfk_1` FOREIGN KEY (`oa_id`) REFERENCES `official_account` (`oa_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `user` (
  `user_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `user_ava` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `user_likes` (
  `user_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `store_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  KEY `user_id` (`user_id`),
  KEY `store_id` (`store_id`),
  CONSTRAINT `user_likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `user_likes_ibfk_2` FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `voucher` (
  `voucher_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `oa_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `voucher_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `voucher_description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`voucher_id`),
  KEY `oa_id` (`oa_id`),
  CONSTRAINT `voucher_ibfk_1` FOREIGN KEY (`oa_id`) REFERENCES `official_account` (`oa_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `category` (`category_id`, `category_description`, `category_icon`) VALUES
('cat1', 'Ăn chính', 'https://res.cloudinary.com/dlnopujz7/image/upload/v1691819834/an_chinh_fot8mn.png'),
('cat2', 'Khác', NULL),
('cat3', 'Ăn vặt', 'https://res.cloudinary.com/dlnopujz7/image/upload/v1691819834/an_vat_usiedx.png'),
('cat4', 'Tráng miệng', 'https://res.cloudinary.com/dlnopujz7/image/upload/v1691819834/trang_mieng_faoq8d.png'),
('cat5', 'Thức uống', 'https://res.cloudinary.com/dlnopujz7/image/upload/v1691819834/thuc_uong_yr0jvb.png'),
('cat6', 'Fast Food', NULL);

INSERT INTO `oa_category` (`oa_id`, `category_id`) VALUES
('oa1', 'cat1'),
('oa1', 'cat2'),
('oa2', 'cat1'),
('oa3', 'cat3'),
('oa4', 'cat4'),
('oa6', 'cat5'),
('oa6', 'cat6');

INSERT INTO `official_account` (`oa_id`, `name`, `description`, `cover`, `avatar`) VALUES
('oa1', 'Gánh Hàng Rong', 'Tiệm chuyên bán các món ăn vặt', 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Street_food_Yasothon.jpg', 'https://res.cloudinary.com/dlnopujz7/image/upload/v1691821188/street_food_pf0gs1.png'),
('oa2', 'Phở Hà Nội', 'Phở gia truyền hơn 40 năm', 'https://upload.wikimedia.org/wikipedia/commons/9/99/Ph%E1%BB%9F_b%C3%B2%2C_C%E1%BA%A7u_Gi%E1%BA%A5y%2C_H%C3%A0_N%E1%BB%99i.jpg', 'https://res.cloudinary.com/dlnopujz7/image/upload/v1691821246/pho_t6mmgj.png'),
('oa3', 'Bánh Mì Không', 'Bánh mì nổi tiếng Sài Gòn', 'https://upload.wikimedia.org/wikipedia/commons/0/0c/B%C3%A1nh_m%C3%AC_th%E1%BB%8Bt_n%C6%B0%E1%BB%9Bng.png', 'https://res.cloudinary.com/dlnopujz7/image/upload/v1691821289/bread_l9rqdy.png'),
('oa4', 'Ốc Huệ', 'Hải sản và ốc tươi sống', 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Plateau_van_zeevruchten.jpg', 'https://res.cloudinary.com/dlnopujz7/image/upload/v1691821340/seafood_jr9vhh.png'),
('oa5', 'Cafe Giảng', 'Best-seller của quán là cà phê Trứng', 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Latte_and_dark_coffee.jpg', 'https://res.cloudinary.com/dlnopujz7/image/upload/v1691821359/coffee-cup_z4ildt.png'),
('oa6', 'McDonalds Campus', 'Burger thơm ngon mời bạn ăn nha', 'https://upload.wikimedia.org/wikipedia/commons/2/25/New-McDonald-HU-lg_%2843261171540%29.jpg', 'https://upload.wikimedia.org/wikipedia/commons/3/36/McDonald%27s_Golden_Arches.svg');

INSERT INTO `store` (`store_id`, `oa_id`, `store_name`, `address`, `longtitude`, `latitude`, `min_price`, `max_price`) VALUES
('st1', 'oa1', 'Gánh Hàng Rong', '123 Hà Nội', 21.0285, 105.854, 30000, 80000),
('st2', 'oa1', 'Gánh Hàng Rong 1', '456 Bún Chả, Hà Nội', 21.0302, 105.853, 40000, 70000),
('st3', 'oa2', 'Yêu Phở', '789 Đại lộ Avenue, Ho Chi Minh City', 10.7769, 106.696, 35000, 75000),
('st4', 'oa3', 'Bánh Mì Không', '101 Phố Bánh Mì, Đà Nẵng', 16.0719, 108.225, 20000, 50000),
('st5', 'oa4', 'Ốc Huệ', '234 Seafood Boulevard, Nha Trang', 12.2388, 109.197, 50000, 120000),
('st6', 'oa6', 'McDonalds Campus 1', 'Quận 1, Ho Chi Minh City', 10.7925, 106.699, 50000, 120000),
('st7', 'oa6', 'McDonalds Campus 2', 'Quận 2, Ho Chi Minh City', 10.8023, 106.738, 50000, 120000),
('st8', 'oa6', 'McDonalds Campus 3', 'Quận 3, Ho Chi Minh City', 10.7685, 106.592, 50000, 120000);


INSERT INTO `voucher` (`voucher_id`, `oa_id`, `voucher_name`, `voucher_description`) VALUES
('v1', 'oa1', 'Yêu Phở', 'Giảm 10% các món Phở'),
('v100', 'oa6', 'Hamburger Discount', 'Giảm 10% các món về Hamburger'),
('v102', 'oa6', 'McDonalds Discount', 'Giảm 20% cho các món bất kì'),
('v2', 'oa3', 'Bánh mì ngon', 'Nước uống miễn phí khi mua bánh mì'),
('v3', 'oa4', 'Đại tiệc ốc', '10% khi đi 2 người'),
('v4', 'oa5', 'Cà phê Giảng', 'Cà phê Trứng chỉ có 30 cành'),
('v5', 'oa5', 'Happy Hour', 'Mua một, tặng một nước uống');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;