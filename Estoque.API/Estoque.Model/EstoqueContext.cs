using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Estoque.Domain
{
    public partial class EstoqueContext : DbContext
    {
        public EstoqueContext()
        {
        }

        public EstoqueContext(DbContextOptions<EstoqueContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Model.EstoqueModel> Estoque { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var configuration = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                    .AddJsonFile("appsettings.Development.json", optional: false, reloadOnChange: true)
                    .AddEnvironmentVariables()
                    .Build();
                var connectionString = configuration.GetConnectionString("DefaultConnection");
                optionsBuilder.UseSqlServer(connectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.4-estoque-10062");

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(EstoqueContext).Assembly);
        }
    }
}
