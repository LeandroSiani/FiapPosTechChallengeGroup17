using Asp.Versioning;
using FluentValidation;
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
   // [Authorize]
    public class ResponsaveisController : ControllerBase
    {
        private readonly IResponsavelService _responsavelService;

        public ResponsaveisController(IResponsavelService responsavelService)
        {
            _responsavelService = responsavelService;
        }

        [HttpGet("aluno/{alunoId}")]
        public async Task<IActionResult> GetByAlunoId(int alunoId)
        {
            try
            {
                var responsaveis = await _responsavelService.ObterTodosResponsaveisPorAlunoIdAsync(alunoId);
                return Ok(responsaveis);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var responsavel = await _responsavelService.ObterResponsavelPorIdAsync(id);
                if (responsavel == null)
                {
                    return NotFound();
                }
                return Ok(responsavel);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ResponsavelViewModel payload)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var responsavel = await _responsavelService.AdicionarResponsavelAsync(payload);
                return CreatedAtAction(nameof(Get), new { id = responsavel.Id }, responsavel);
            }
            catch (ValidationException ex)
            {
                return BadRequest(ex.Errors);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
