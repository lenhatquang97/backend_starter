-- Sample data for official_account table
INSERT INTO `official_account` (`oa_id`, `name`, `description`, `cover`, `avatar`)
VALUES
  ('oa1', 'StreetFoodVN', 'Exploring the best street food in Vietnam', 'cover_oa1.jpg', 'avatar_oa1.jpg'),
  ('oa2', 'PhoLovers', 'For all the pho enthusiasts out there', 'cover_oa2.jpg', 'avatar_oa2.jpg'),
  ('oa3', 'BanhMiDelights', 'Discover the delightful world of banh mi', 'cover_oa3.jpg', 'avatar_oa3.jpg'),
  ('oa4', 'SeafoodHaven', 'Featuring the freshest seafood dishes', 'cover_oa4.jpg', 'avatar_oa4.jpg'),
  ('oa5', 'CafeSaigon', 'Exploring the vibrant cafe culture in Saigon', 'cover_oa5.jpg', 'avatar_oa5.jpg');

-- Sample data for category table
INSERT INTO `category` (`category_id`, `category_description`)
VALUES
  ('cat1', 'Noodle Dishes'),
  ('cat2', 'Rice Dishes'),
  ('cat3', 'Sandwiches'),
  ('cat4', 'Seafood'),
  ('cat5', 'Beverages');

-- Sample data for oa_category table
INSERT INTO `oa_category` (`oa_id`, `category_id`)
VALUES
  ('oa1', 'cat1'),
  ('oa1', 'cat2'),
  ('oa2', 'cat1'),
  ('oa3', 'cat3'),
  ('oa4', 'cat4');

-- Sample data for store table
INSERT INTO `store` (`store_id`, `oa_id`, `store_name`, `address`, `longtitude`, `latitude`, `min_price`, `max_price`)
VALUES
  ('st1', 'oa1', 'Pho Street', '123 Pho Street, Hanoi', 21.0285, 105.8542, 30000, 80000),
  ('st2', 'oa1', 'Bun Cha Express', '456 Bun Cha Alley, Hanoi', 21.0302, 105.8534, 40000, 70000),
  ('st3', 'oa2', 'PhoLovers Corner', '789 Pho Avenue, Ho Chi Minh City', 10.7769, 106.6958, 35000, 75000),
  ('st4', 'oa3', 'Banh Mi Deli', '101 Banh Mi Street, Da Nang', 16.0719, 108.2245, 20000, 50000),
  ('st5', 'oa4', 'Seafood Paradise', '234 Seafood Boulevard, Nha Trang', 12.2388, 109.1967, 50000, 120000);

-- Sample data for voucher table
INSERT INTO `voucher` (`voucher_id`, `oa_id`, `voucher_name`, `voucher_description`)
VALUES
  ('v1', 'oa1', 'PhoLovers Discount', 'Get 10% off on any pho dish'),
  ('v2', 'oa3', 'BanhMi Delight', 'Free drink with every banh mi purchase'),
  ('v3', 'oa4', 'Seafood Feast', '50% off on seafood platter for two'),
  ('v4', 'oa5', 'Coffee Delight', 'Enjoy a complimentary dessert with any coffee order'),
  ('v5', 'oa5', 'Happy Hour', 'Buy one, get one free on selected beverages');

-- Sample data for user table
INSERT INTO `user` (`user_id`, `user_name`)
VALUES
  ('u1', 'Foodie123'),
  ('u2', 'TasteExplorer'),
  ('u3', 'StreetEats'),
  ('u4', 'SeafoodLover'),
  ('u5', 'CaffeineAddict');

-- Sample data for user_likes table
INSERT INTO `user_likes` (`user_id`, `store_id`)
VALUES
  ('u1', 'st1'),
  ('u1', 'st3'),
  ('u2', 'st1'),
  ('u2', 'st4'),
  ('u3', 'st2');

-- Sample data for booking table
INSERT INTO `booking` (`user_id`, `oa_id`, `store_id`, `store_name`, `start_time`, `end_time`, `is_cancel`, `is_match`, `conversation_id`)
VALUES
  ('u1', 'oa1', 'st1', 'Pho Street', 1678905600, 1678908000, false, true, 'conv1'),
  ('u2', 'oa1', 'st2', 'Bun Cha Express', 1678909200, 1678911600, false, false, 'conv2'),
  ('u3', 'oa2', 'st3', 'PhoLovers Corner', 1678915200, 1678918800, true, false, 'conv3'),
  ('u4', 'oa3', 'st4', 'Banh Mi Deli', 1678922400, 1678926000, false, true, 'conv4'),
  ('u5', 'oa4', 'st5', 'Seafood Paradise', 1678929600, 1678933200, false, false, 'conv5');

-- Sample data for message table
INSERT INTO `message` (`sender`, `content`, `replyTo`, `createdAt`, `type`, `conversation_id`)
VALUES
  ('u1', 'Hi, can I make a reservation?', NULL, '2023-08-12 10:30', 'text', 'conv1'),
  ('st1', 'Of course! When would you like to visit?', 'u1', '2023-08-12 10:32', 'text', 'conv1'),
  ('u2', 'I am excited to try your dishes!', NULL, '2023-08-12 14:15', 'text', 'conv2'),
  ('u3', 'I had a great time at your restaurant!', NULL, '2023-08-12 18:40', 'text', 'conv3'),
  ('st4', 'We are glad you enjoyed your meal!', 'u3', '2023-08-12 18:42', 'text', 'conv3');


INSERT INTO `official_account` (`oa_id`, `name`, `description`, `cover`, `avatar`)
VALUES
  ('oa6', 'McDonalds Campus', 'Exploring the best fast food in Vietnam', 'https://upload.wikimedia.org/wikipedia/commons/2/25/New-McDonald-HU-lg_%2843261171540%29.jpg', 'https://upload.wikimedia.org/wikipedia/commons/3/36/McDonald%27s_Golden_Arches.svg');

INSERT INTO `category` (`category_id`, `category_description`)
VALUES
  ('cat6', 'Fast Food');

INSERT INTO `oa_category` (`oa_id`, `category_id`)
VALUES
  ('oa6', 'cat5'),
  ('oa6', 'cat6');

-- Sample data for store table
INSERT INTO `store` (`store_id`, `oa_id`, `store_name`, `address`, `longtitude`, `latitude`, `min_price`, `max_price`)
VALUES
  ('st6', 'oa6', 'McDonalds Campus 1', 'District 1, Ho Chi Minh City', 10.7925455, 106.6987758, 50000, 120000),
  ('st7', 'oa6', 'McDonalds Campus 2', 'District 2, Ho Chi Minh City', 10.8023069, 106.7383043, 50000, 120000),
  ('st8', 'oa6', 'McDonalds Campus 3', 'District 3, Ho Chi Minh City', 10.7684637, 106.5917802, 50000, 120000);

-- Sample data for voucher table
INSERT INTO `voucher` (`voucher_id`, `oa_id`, `voucher_name`, `voucher_description`)
VALUES
  ('v100', 'oa6', 'Hamburger Discount', 'Get 10% off on any hamburger dish'),
  ('v102', 'oa6', 'McDonalds Discount', 'Get 20% off on any dish');

-- Sample data for user_likes table
INSERT INTO `user_likes` (`user_id`, `store_id`)
VALUES
  ('u3', 'st6'),
  ('u2', 'st6');