# Database Questions

## Level 1 (Novice)
Write a SQL query that shows me how many customers there are from Germany.

**Answer**:
```sql
SELECT 
    COUNT(*) AS CustomerFromGermany 
FROM Customers 
WHERE Country = "Germany";
```


## Level 2
Write a query that shows me a list of the countries that have the most customers; from most customers to least customers.  Don’t show countries that have less than 5 customers.

**Answer**:
```sql
SELECT * FROM
(
    SELECT 
        COUNT(*) AS CustomerCount, 
        Country FROM Customers
    GROUP BY Country
)
WHERE CustomerCount >= 5
ORDER BY CustomerCount DESC;
```

## Level 3 (Average Developer - Expected Task Time <8 minutes):
Reverse Engineer These Results (tell me the query that we need to write to get these results):

```sql
SELECT
  c.CustomerName,
  agg.OrderCount,
  agg.FirstOrder,
  agg.LastOrder
FROM Customers c
INNER JOIN (
    SELECT
      CustomerId,
      COUNT(*)            AS OrderCount,
      MIN(OrderDate)      AS FirstOrder,
      MAX(OrderDate)      AS LastOrder
    FROM Orders
    GROUP BY CustomerId
) AS agg
  ON c.CustomerID = agg.CustomerId;

```
