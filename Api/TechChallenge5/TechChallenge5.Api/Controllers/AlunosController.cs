using Asp.Versioning;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TechChallenge5.Domain.DTO;
using TechChallenge5.Domain.ViewModels;
using TechChallenge5.Services.InternalServices;

namespace TechChallenge5.Api.Controllers
{
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [ApiVersion("1.0")]
    [Authorize]
    public class AlunosController : ControllerBase
    {
        private readonly IAlunoService _alunoService;

        public AlunosController(IAlunoService alunoService)
        {
            _alunoService = alunoService;
        }

        [HttpGet]        
        public async Task<IActionResult> Get()
        {
            try
            {
                var alunos = await _alunoService.ObterAlunosAsync();
                return Ok(alunos);
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
                var aluno = await _alunoService.ObterAlunoPorIdAsync(id);
                if (aluno == null)
                {
                    return NotFound();
                }                
                return Ok(aluno);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] AlunoViewModel payload)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {   
                var aluno = await _alunoService.AdicionarAlunoAsync(payload);                
                return CreatedAtRoute("", new { id = aluno.Id }, aluno);
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

        [HttpPost("{id}/responsavel")]
        public async Task<IActionResult> AdicionarResponsavel(int id, [FromBody] ResponsavelViewModel payload)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var aluno = await _alunoService.AdicionarResponsavel(id, payload);
                var alunoDto = new AlunoDTO
                {
                    Id = aluno.Id,
                    Nome = aluno.Pessoa?.Nome,
                    Sobrenome = aluno.Pessoa?.Sobrenome,
                    Cpf = aluno.Pessoa?.Cpf,
                    Email = aluno.Pessoa?.Email,
                    Telefone = aluno.Pessoa?.Telefone,
                    DataNascimento = aluno.Pessoa!.DataNascimento,
                    Ativo = aluno.Ativo,
                    Responsaveis = aluno.ResponsavelAlunos.Select(r => new ResponsavelDTO
                    {
                        Id = r.ResponsavelId,
                        Nome = r.Responsavel.Pessoa?.Nome,
                        Sobrenome = r.Responsavel.Pessoa?.Sobrenome,
                        Cpf = r.Responsavel.Pessoa?.Cpf,
                        Email = r.Responsavel.Pessoa?.Email,
                        Telefone = r.Responsavel.Pessoa?.Telefone,
                        DataNascimento = r.Responsavel.Pessoa!.DataNascimento                        
                    }).ToList()
                };

                return Created("", alunoDto);
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
