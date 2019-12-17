using System;
using System.Collections.Generic;
using System.Text;

namespace Estoque.Domain.Model
{
    public class EstoqueModel
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public int Quantidade { get; set; }
        public double Valor { get; set; }
    }
}
