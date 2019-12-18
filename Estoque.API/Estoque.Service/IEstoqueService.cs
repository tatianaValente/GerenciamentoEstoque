using System.Collections.Generic;
using System.Threading.Tasks;
using Estoque.Domain.Model;

namespace Estoque.Service
{
    public interface IEstoqueService
    {
        Task<EstoqueModel> CreateAsync(EstoqueModel estoqueSave);
        Task<bool> DeleteAsync(int id);
        EstoqueModel GetEstoqueById(int id);
        IList<EstoqueModel> Read();
        Task<EstoqueModel> UpdateAsync(int id, EstoqueModel estoqueSave);
    }
}