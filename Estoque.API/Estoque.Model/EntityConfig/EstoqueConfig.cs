using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Estoque.Domain.EntityConfig
{
    public class EstoqueConfig : IEntityTypeConfiguration<Model.EstoqueModel>
    {
        public void Configure(EntityTypeBuilder<Model.EstoqueModel> entity)
        {
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Nome)
                .IsRequired()
                .HasMaxLength(100);
        }
    }
}
