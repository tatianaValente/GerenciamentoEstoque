using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Estoque.Domain;
using Estoque.Domain.Model;
using Estoque.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Estoque.API.Controllers
{
    [Route("api/[controller]/produtos")]
    [ApiController]
    public class EstoqueController : ControllerBase
    {
        protected readonly EstoqueService _service;

        public EstoqueController( EstoqueService service)
        {
            _service = service;
        }

        /// <summary>
        /// Get lista de estoque
        /// </summary>
        /// <returns>Lista de estoque</returns>
        [HttpGet]
        public ActionResult Get()
        {

            var estoque = _service.Read();
            return Ok(estoque);
        }

        /// <summary>
        /// Get estoque por id
        /// </summary>
        /// <param name="id">Id do estoque</param>
        /// <returns>Estoque</returns>
        [HttpGet("{id}")]
        public IActionResult GetEstoque(int id)
        {
            var estoque = _service.GetEstoqueById(id);

            if(estoque == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(estoque);
            }
        }

        /// <summary>
        /// Post adição de estoque
        /// </summary>
        /// <param name="estoque">Estoque</param>
        /// <returns>Estoque criado</returns>
        [HttpPost]
        public virtual async Task<ActionResult<EstoqueModel>> PostAsync([FromBody] EstoqueModel estoqueSave)
        {
            EstoqueModel estoque = await _service.CreateAsync(estoqueSave);
            return Ok(estoque);
        }

        /// <summary>
        /// Put atualizar estoque por Id
        /// </summary>
        /// <param name="id">Identity Stop Condition</param>
        /// <param name="estoque">The Stop Condition to update</param>
        /// <returns>Estoque atualizado</returns>
        [HttpPut]
        public virtual async Task<ActionResult<EstoqueModel>> PutAsync([FromQuery] int id, [FromBody] EstoqueModel estoqueSave)
        {
            EstoqueModel estoque = await _service.UpdateAsync(id, estoqueSave);
            return Ok(estoque);
        }

        /// <summary>
        /// Delete estoque pelo Id
        /// </summary>
        /// <param name="id">Id do estoque</param>
        /// <returns>Boolean</returns>
        [HttpDelete]
        public virtual async Task<ActionResult> Delete([FromQuery] int id)
        {
            var statusDelete = await _service.DeleteAsync(id);
            return Ok(statusDelete);
        }
    }
}