-- Query the total count of Users --
SELECT COUNT(*) as UsersCount from dbo.Users;
-- Query all employee information --
SELECT UsersId, Name, Email
FROM dbo.Users;
GO