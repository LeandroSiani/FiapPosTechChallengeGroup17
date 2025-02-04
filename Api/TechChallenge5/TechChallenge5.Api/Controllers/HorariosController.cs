using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TechChallenge5.Domain.Models;
using TechChallenge5.Services.InternalServices;

namespace TechChallenge5.Api.Controllers
{
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [ApiVersion("1.0")]
    [Authorize]
    public class HorariosController : ControllerBase
    {
        private readonly IHorarioService _horarioService;

        public HorariosController(IHorarioService horarioService)
        {
            _horarioService = horarioService;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Horario payload)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var result = await _horarioService.AdicionarHorarioAsync(payload);

                return Created("",result);
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

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var result = await _horarioService.ObterHorariosAsync();
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
