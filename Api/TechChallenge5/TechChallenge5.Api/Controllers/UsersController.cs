using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using TechChallenge5.Domain.ViewModels.Identity;
using TechChallenge5.Services.InternalServices;

namespace TechChallenge5.Api.Controllers
{
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [ApiVersion("1.0")]
    public class UsersController : ControllerBase
    {
        private readonly IIdentityService _idenityService;

        public UsersController(IIdentityService idenityService)
        {
            _idenityService = idenityService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel payload)
        {
            try
            {
                var result = await _idenityService.Login(payload);
                if (result == null)
                {
                    return Unauthorized();
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel payload)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var result = await _idenityService.RegisterAsync(payload);
                if (result == null)
                {
                    return BadRequest();
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
