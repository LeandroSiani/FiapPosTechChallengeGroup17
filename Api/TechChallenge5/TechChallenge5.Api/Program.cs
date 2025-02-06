using Asp.Versioning;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using TechChallenge5.BLL.Validators;
using TechChallenge5.Data;
using TechChallenge5.Domain.Models;
using TechChallenge5.Domain.Models.Identity;
using TechChallenge5.HostedService.Jobs;
using TechChallenge5.Services.InternalServices;

var builder = WebApplication.CreateBuilder(args);

// Configuração do banco de dados
builder.Services.AddDbContext<TechChallengeDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("TechChallengePostgresConnection"))
);

// Configuração de autenticação e identidade
builder.Services.AddIdentity<ApplicationUser, IdentityRole<int>>()
    .AddEntityFrameworkStores<TechChallengeDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

// **Configuração do CORS**
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowNextJs",
        policy => policy.WithOrigins("http://localhost:3000")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials());
});

// Configuração de serviços internos e externos
TechChallenge5.Api.Extensions.ServiceCollectionExtensions.AddRepositories(builder.Services);
TechChallenge5.Api.Extensions.ServiceCollectionExtensions.AddAutoMapper(builder.Services);
TechChallenge5.Api.Extensions.ServiceCollectionExtensions.AddInternalServices(builder.Services);
TechChallenge5.Api.Extensions.ServiceCollectionExtensions.AddExternalServices(builder.Services);

builder.Services.AddControllers();

// Configuração do Swagger para autenticação JWT
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "TechChallenge5 API", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header usando Bearer. Exemplo: \"Authorization: Bearer {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement()
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header,
            },
            new List<string>()
        }
    });
});

// Configuração de validações
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<AlunoViewModelValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<ResponsavelViewModelValidator>();

// Configuração de serviços e versionamento de API
builder.Services.AddHostedService<VerificarEntradasSaidasJob>();

builder.Services.AddApiVersioning(options =>
{
    options.DefaultApiVersion = new ApiVersion(1, 0);
    options.AssumeDefaultVersionWhenUnspecified = true;
    options.ReportApiVersions = true;
    options.ApiVersionReader = new UrlSegmentApiVersionReader();
});

// OpenAPI
builder.Services.AddOpenApi();

// Configuração de logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

var app = builder.Build();

// Configuração do pipeline HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "TechChallenge5 API v1");
    });
}

app.UseHttpsRedirection();

// **ADICIONE ESSA LINHA AQUI**
app.UseCors("AllowNextJs"); // Aplica a política CORS

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
