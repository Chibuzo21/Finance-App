-- Create or replace the existing function, named `calculate_total`
-- Note: if your function has a different argument set, it won't replace the original function
create or replace function calculate_total (
  -- The arguments (this one is optional, but arguments can be mandatory, just skip `default null`)
	type_arg varchar default null,
	range_arg varchar default 'last30days'
) returns table(current_amount numeric, previous_amount numeric) as $$ -- Returns a table with 2 columns current_amount and previous_amount which both have the data type of numeric
declare 
currentStart timestamp; 
currentEnd timestamp ;
previousStart timestamp;
previousEnd timestamp;
-- previousStart and previousEnd is like the last duration. Eg lets say the day now is tuesday, currentStart and currentEnd in the last 24hrs will be between (monday-tuesday) and then previousStart and previousEnd lies between whatever time till monday. its like saying the amount spent or earned on monday(previousStart and previousEnd) vs the amount spent or earned on tuesday(currentstart and currentEnd). this will be vital to determine the percentagechange
-- declare is used to define variables that you want to use in the function
-- timestamp which means date with time is the data type for the variable(currentStart)
begin
currentEnd:=now();
currentStart:= case
-- this is like the if else statement in javascript
when range_arg = 'last24hrs' then currentEnd -interval '24 hours'
when range_arg = 'last7days' then currentEnd -interval '7 days'
when range_arg = 'last30days' then currentEnd -interval '30 days'
when range_arg = 'last12months' then currentEnd -interval '12 months'
-- = is used for comparison replacing == in js
-- whatever that is gotten from currentEnd-interval will be the new value of currentStart
else currentEnd - interval '30 days'
-- else is used for our default value or when no option is selected
end;
-- we are trying to assign value to the variable currentEnd
-- instead of just "=" for assigning values to  variables in javascript, we use := in sql. now() returns the current date and time 
previousEnd := currentStart - interval '1 second';
-- This is too ensure that previousEnd and currentStart are not exactly the same
previousStart := currentStart - (currentEnd - currentStart);
-- currentEnd-currentStart will give us an interval(24hrs,7days,30days,12months) and then currentStart minus this interval will give us the prevstart
	current_amount := (
	select	COALESCE(SUM(amount), 0)
-- Select the sum of all values from the amount column
		from transactions  -- of transactions table
		where              -- where...
			(type = type_arg or type_arg is null) -- The type is type_arg, if type_arg was specified
			and (created_at between currentStart and currentEnd)
			-- created_at between checks if the the date/time in the created_at column in your database lies between the currentStart and curreneEnd values, if yes, it will be included if no it will ignore it.
			-- this is same for the previous amount
	);
	previous_amount := (
select	COALESCE(SUM(amount), 0)
-- Select the sum of all values from the amount column
		from transactions  -- of transactions table
		where              -- where...
			(type = type_arg or type_arg is null) -- The type is type_arg, if type_arg was specified
			and (created_at between previousStart  and previousEnd)
	);
	return next;
	-- return next is used when you are sending multiple rows one after the other
end;
$$ language plpgsql -- The language of this func is plpgsql (other languages can be used!)

-- We are creating this action in the server as it helps our code faster. The above function is used to calculate the total number in the amount column depending on the type provided(ie expense, income, investment etc)