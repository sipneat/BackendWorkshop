-- Create a new table called 'Users' in schema 'dbo'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.Users', 'U') IS NOT NULL
DROP TABLE dbo.Users
GO
-- Create the table in the specified schema
CREATE TABLE dbo.Users
(
    UsersId INT NOT NULL IDENTITY(1, 1) PRIMARY KEY, -- primary key column
    Name [NVARCHAR](50) NOT NULL,
    Email [NVARCHAR](50) NOT NULL
);
GO