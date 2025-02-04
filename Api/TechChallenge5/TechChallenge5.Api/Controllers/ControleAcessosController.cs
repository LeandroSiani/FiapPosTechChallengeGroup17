using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TechChallenge5.Domain.ViewModels;
using TechChallenge5.Services.InternalServices;

namespace TechChallenge5.Api.Controllers
{
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [ApiVersion("1.0")]
    [Authorize]
    public class ControleAcessosController : ControllerBase
    {
        private readonly IControleAcessoService _controleAcessoService;

        public ControleAcessosController(IControleAcessoService controleAcessoService)
        {
            _controleAcessoService = controleAcessoService;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ControleAcessoViewModel payload)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var result = await _controleAcessoService.AdicionarControleAcesso(payload);
                
                return Ok(result);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { erros = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


    }
}
