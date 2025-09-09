CREATE OR REPLACE FUNCTION fetch_transactions(
    range_arg VARCHAR default 'last30days',
    limit_arg INT default 20,
    offset_arg INT default 0
)
RETURNS SETOF transactions AS $$
-- this means that it is returning the same as structure of the transactions table. It returns all the rows from the transaction table.
DECLARE
-- for declaring local variables
    startDate TIMESTAMP;
    endDate TIMESTAMP := NOW();
BEGIN
    CASE range_arg
        WHEN 'last24hours' THEN
            startDate := NOW() - INTERVAL '24 hours';
        WHEN 'last7days' THEN
            startDate := NOW() - INTERVAL '7 days';
        WHEN 'last30days' THEN
            startDate := NOW() - INTERVAL '30 days';
        WHEN 'last12months' THEN
            startDate := NOW() - INTERVAL '12 months';
        ELSE
            startDate := NOW() - INTERVAL '30 days'; -- Default case
    END CASE;

    RETURN QUERY SELECT * FROM transactions
    WHERE created_at BETWEEN startDate AND endDate
    ORDER BY created_at DESC
    LIMIT limit_arg OFFSET offset_arg;
END;
-- return query tells the function to return the result of the sql query that follows
-- select is used to choose number of columns in the table
-- order by created_at desc means sort the result in descending order. limit tells how many results or rows to return and limit arg already has a default value of 20.
-- offset skips a number of rows for pagination. eg page 2 sarts from offset 20. like showing a number of rows at a time on a page. like saying page 1 will show 10 items and next page gets the next 20  
$$ LANGUAGE plpgsql;