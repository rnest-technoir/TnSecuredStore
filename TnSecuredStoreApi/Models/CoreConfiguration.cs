using DbApp.Db;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TnSecuredStoreApi.Models
{
    public abstract class CoreConfiguration<TCoreEntity> : IEntityTypeConfiguration<TCoreEntity> where TCoreEntity: CoreEntity
    {
        public void Configure(EntityTypeBuilder<TCoreEntity> builder)
        {
            builder.ToTable("Entry");
            builder.Property(e => e.AuthorId).IsRequired();
            builder.Property(e => e.CreatedOn).IsRequired();
            builder.Property(e => e.RowGuid).IsRequired();
            builder.Property(e => e.IsActive).IsRequired();
            builder.Property(e => e.IsRemoved).IsRequired();
        }

        public abstract void EntityConfiguration(EntityTypeBuilder<TCoreEntity> builder);
    }
}
