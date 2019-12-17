using System;
using System.Collections.Generic;
using System.Text;

namespace Estoque.Domain.Util
{
    public static class Validation
    {
        public static void ValidarId(int id)
        {
            if (id <= 0)
                throw new ArgumentException("Id inválido", "id");
        }

        public static void ValidarQuantidade(int quantidade)
        {
            if (quantidade < 0)
                throw new ArgumentException("Quantidade inválida", "quantidade");
        }

        public static void ValidarValor(double valor)
        {
            if (valor < 0)
                throw new ArgumentException("Valor inválida", "valor");
        }

    }
}
