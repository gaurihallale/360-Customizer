SELECT u.user_id, u.username, SUM(o.amount) AS total_order_amount
FROM users u
JOIN orders o ON u.user_id = o.user_id
WHERE o.order_date >= (CURRENT_DATE - INTERVAL '1 month')
GROUP BY u.user_id, u.username
ORDER BY total_order_amount DESC
LIMIT 5;
