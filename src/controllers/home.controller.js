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