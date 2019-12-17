using Estoque.Domain;
using Estoque.Domain.Model;
using System;
using System.Threading.Tasks;

namespace Estoque.Service
{
    public class EstoqueService
    {
        private EstoqueContext _estoqueContext { get; set; }

        public EstoqueService(EstoqueContext estoqueContext)
        {
            _estoqueContext = estoqueContext ?? throw new ArgumentNullException(nameof(estoqueContext));
        }

        /// <summary>
        /// Criar Estoque
        /// </summary>
        /// <param name="estoqueSave">Estoque a criar</param>
        /// <returns>Estoque criado</returns>
        public virtual async Task<EstoqueModel> CreateAsync(EstoqueModel estoqueSave)
        {
            _estoqueContext.Estoque.Add(estoqueSave);
            await _estoqueContext.SaveChangesAsync();

            return estoqueSave;
        }

        /// <summary>
        /// Atualizar Estoque
        /// </summary>
        /// <param name="id">Id do estoque</param>
        /// <param name="estoqueSave">Etoque a atualizar</param>
        /// <returns>Estoque atualizado</returns>
        public virtual async Task<EstoqueModel> UpdateAsync(int id, EstoqueModel estoqueSave)
        {
            EstoqueModel estoque = GetEstoqueById(id);
            estoque.Nome = estoqueSave.Nome;
            estoque.Quantidade = estoqueSave.Quantidade;
            estoque.Valor = estoqueSave.Valor;

            await _estoqueContext.SaveChangesAsync();

            return estoqueSave;
        }

        /// <summary>
        /// Get Estoque pelo id
        /// </summary>
        /// <param name="id">id do estoque</param>
        /// <returns>O estoque encontrado,ou exceção ServiceException se não encontrado</returns>
        public virtual EstoqueModel GetEstoqueById(int id)
        {
            EstoqueModel estoque = _estoqueContext.Estoque.Find(id);

            //TODO excessão se nao encontrar
            return estoque;
        }

        /// <summary>
        /// Delete Estoque
        /// </summary>
        /// <param name="id">id do estoque</param>
        /// <returns>Status Delete</returns>
        public virtual async Task<bool> DeleteAsync(int id)
        {
            EstoqueModel estoque = _estoqueContext.Estoque.Find(id);

            _estoqueContext.Estoque.Remove(estoque);

            await _estoqueContext.SaveChangesAsync();

            return true;
        }


    }
}
