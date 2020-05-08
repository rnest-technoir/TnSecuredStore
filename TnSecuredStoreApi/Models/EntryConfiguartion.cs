using DbApp.Db;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TnSecuredStoreApi.Models
{
    public class EntryConfiguartion : CoreConfiguration<Entry>
    {
        public override void EntityConfiguration(EntityTypeBuilder<Entry> builder)
        {
            builder.Property(p => p.Title).IsRequired();
        }
    }
}
