CREATE TABLE [dbo].[Entry] (
    [Id]         INT            IDENTITY (1, 1) NOT NULL,
    [AuthorId]   INT            NOT NULL,
    [CreatedOn]  DATETIME       NOT NULL,
    [ModifiedOn] DATETIME       NULL,
    [RowGuid]    NVARCHAR (128) NOT NULL,
    [IsActive]   BIT            NOT NULL,
    [IsRemoved]  BIT            NOT NULL,
    [Title]      NVARCHAR (MAX) NOT NULL,
    [Password]   NVARCHAR (MAX) NULL,
    [Login]      NVARCHAR (MAX) NULL,
    [Email]      NVARCHAR (255) NULL,
    [Url]        NVARCHAR (MAX) NULL,
    CONSTRAINT [PK_Entry] PRIMARY KEY CLUSTERED ([Id] ASC)
);

