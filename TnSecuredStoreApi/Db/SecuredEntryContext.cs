namespace DbApp.Db
{
    using System;
    using System.Data;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using TnSecuredStoreApi.Models;

    public partial class SecuredEntryContext : DbContext
    {
        private readonly IConfiguration _configuration;
        public virtual DbSet<Entry> EntrySet { get; set; }

        public SecuredEntryContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new EntryConfiguartion());
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_configuration["EntryDbConnection:ConnectionString"]);
            
        }
    }
}
