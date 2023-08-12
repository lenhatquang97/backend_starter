const {connection} = require("../../db.config");
exports.getAllOfficialAccount = (req, res) => {
    connection.query("SELECT * FROM `official_account`", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: "Error retrieving official account"
            });
        } else {
            res.send(result);
        }
    });
}

exports.getFavoriteOA = (req, res) => {
    const queryFavorite = String.raw`
SELECT
    s.store_id,
    o.oa_id,
    o.name AS oa_name,
    o.description AS oa_description,
    o.cover AS oa_cover,
    o.avatar AS oa_avatar,
    COUNT(ul.user_id) AS total_likes
FROM
    store s
JOIN
    official_account o ON s.oa_id = o.oa_id
LEFT JOIN
    user_likes ul ON s.store_id = ul.store_id
GROUP BY
    s.store_id, o.oa_id, o.name, o.description, o.cover, o.avatar
ORDER BY
    total_likes DESC
LIMIT 10;
    `

    connection.query(queryFavorite, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: "Error retrieving official account"
            });
        } else {
            res.send(result);
        }
    });

}

exports.getNearestOA = (req, res) => {
    let lat = req.query.lat;
    let lon = req.query.lon;
    if(!lat || !lon) {
        res.status(400).send({
            message: "Missing lat or lon"
        });
        return;
    }

    const queryNearest = String.raw`
    SELECT
    s.store_id,
    s.store_name,
    s.address,
    s.longtitude,
    s.latitude,
    o.oa_id,
    o.name AS oa_name,
    o.description AS oa_description,
    o.cover AS oa_cover,
    o.avatar AS oa_avatar,
    (6371 * ACOS(COS(RADIANS(${lat})) * COS(RADIANS(s.latitude)) * COS(RADIANS(s.longtitude) - RADIANS(${lon})) + SIN(RADIANS(${lat})) * SIN(RADIANS(s.latitude)))) AS distance
FROM
    store s
JOIN
    official_account o ON s.oa_id = o.oa_id
CROSS JOIN
    (SELECT ${lat} AS lat, ${lon} AS lon) AS user_location
ORDER BY
    distance
LIMIT 10;
    `

    connection.query(queryNearest, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: "Error retrieving official account"
            });
        } else {
            res.send({result});
        }
    });
}

exports.getMealHistory = (req, res) => {
    const queryMealHistory = String.raw`
    SELECT
    mh.id AS meal_id,
    mh.user_id,
    u.user_name AS user_name,
    mh.store_id,
    s.store_name,
    b.start_time AS booking_start_time,
    b.end_time AS booking_end_time
FROM
    meal_history mh
JOIN
    user u ON mh.user_id = u.user_id
JOIN
    store s ON mh.store_id = s.store_id
LEFT JOIN
    booking b ON mh.store_id = b.store_id AND mh.user_id = b.user_id
ORDER BY
    b.start_time DESC;
    `

    connection.query(queryMealHistory, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: "Error retrieving meal history"
            });
        } else {
            res.send(result);
        }
    });
}

exports.getOfficialAccountById = (req, res) => {
    let oa_id = req.query.oa_id;
    if(!oa_id) {
        res.status(400).send({
            message: "Missing oa_id"
        });
        return;
    }
    const rawQuery = String.raw`
  SELECT
      oa.oa_id,
      oa.name AS oa_name,
      oa.description AS oa_description,
      oa.cover,
      oa.avatar,
      s.store_id,
      s.store_name,
      s.address,
      s.longtitude,
      s.latitude,
      s.min_price,
      s.max_price,
      v.voucher_id,
      v.voucher_name,
      v.voucher_description
  FROM official_account oa
  LEFT JOIN store s ON oa.oa_id = s.oa_id
  LEFT JOIN voucher v ON oa.oa_id = v.oa_id
  WHERE oa.oa_id = "${oa_id}"
`
    connection.query(rawQuery, (error, results) => {
        if (error) {
            throw error;
        }

        // Map the results to a structured format
        const mappedResults = {};

        results.forEach(row => {
            const oaId = row.oa_id;

            if (!mappedResults[oaId]) {
                mappedResults[oaId] = {
                    oa_id: row.oa_id,
                    oa_name: row.oa_name,
                    oa_description: row.oa_description,
                    cover: row.cover,
                    avatar: row.avatar,
                    stores: [],
                    vouchers: []
                };
            }

            if (row.store_id && !mappedResults[oaId].stores.find(store => store.store_id === row.store_id)){
                mappedResults[oaId].stores.push({
                    store_id: row.store_id,
                    store_name: row.store_name,
                    address: row.address,
                    longtitude: row.longtitude,
                    latitude: row.latitude,
                    min_price: row.min_price,
                    max_price: row.max_price
                });
            }

            if (row.voucher_id) {
                mappedResults[oaId].vouchers.push({
                    voucher_id: row.voucher_id,
                    voucher_name: row.voucher_name,
                    voucher_description: row.voucher_description
                });
            }
        });

        // Print the mapped results
        console.log(mappedResults);
        res.send(mappedResults);
    });
}

exports.getStoreById = (req, res) => {
    let store_id = req.query.store_id;
    if(!store_id) {
        res.status(400).send({
            message: "Missing store_id"
        });
        return;
    }
    const rawQuery = String.raw`
    SELECT
    s.store_id,
    s.store_name,
    s.address,
    s.longtitude,
    s.latitude,
    s.min_price,
    s.max_price,
    oa.oa_id,
    oa.name AS oa_name,
    oa.description AS oa_description,
    oa.cover,
    oa.avatar
FROM store s
JOIN official_account oa ON s.oa_id = oa.oa_id
WHERE s.store_id = "${store_id}"
    `
    connection.query(rawQuery, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: "Error retrieving official account"
            });
        } else {
            res.send({result});
        }
    });

}

exports.getBookingById = (req, res) => {
    let user_id = req.query.user_id;
    if(!user_id) {
        res.status(400).send({
            message: "Missing user_id"
        });
        return;
    }
    const rawQuery = String.raw`
    SELECT
    b.booking_id,
    b.user_id,
    b.oa_id,
    b.store_id,
    b.store_name,
    b.start_time,
    b.end_time,
    b.is_cancel,
    b.is_match,
    b.conversation_id,
    oa.name AS oa_name,
    s.store_name AS booked_store_name
FROM booking b
JOIN official_account oa ON b.oa_id = oa.oa_id
JOIN store s ON b.store_id = s.store_id
WHERE b.user_id = "${user_id}"
    `

    connection.query(rawQuery, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: "Error retrieving official account"
            });
        } else {
            res.send({result});
        }
    });
}

exports.getAllCategories = (req, res) => {
    const rawQuery = String.raw`
    SELECT * FROM category
    `
    connection.query(rawQuery, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: "Error retrieving categories"
            });
        } else {
            res.send({result});
        }
    });
}