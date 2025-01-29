using Asp.Versioning;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TechChallenge5.BLL.Validators;
using TechChallenge5.Data;
using TechChallenge5.Domain.Models;
using TechChallenge5.Domain.Models.Identity;
using TechChallenge5.HostedService.Jobs;
using TechChallenge5.Services.InternalServices;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<TechChallengeDbContext>(
    options => options.UseNpgsql(builder.Configuration.GetConnectionString("TechChallengePostgresConnection"))
);

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

// Register repository interfaces and implementations
TechChallenge5.Api.Extensions.ServiceCollectionExtensions.AddRepositories(builder.Services);
// Register AutoMapper configuration
TechChallenge5.Api.Extensions.ServiceCollectionExtensions.AddAutoMapper(builder.Services);

builder.Services.AddControllers();

// Register FluentValidation
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<AlunoViewModelValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<ResponsavelViewModelValidator>();
// Register services
TechChallenge5.Api.Extensions.ServiceCollectionExtensions.AddInternalServices(builder.Services);
TechChallenge5.Api.Extensions.ServiceCollectionExtensions.AddExternalServices(builder.Services);

// Register Hosted Services
builder.Services.AddHostedService<VerificarEntradasSaidasJob>();

// Add API versioning
builder.Services.AddApiVersioning(options =>
{
    options.DefaultApiVersion = new ApiVersion(1, 0);
    options.AssumeDefaultVersionWhenUnspecified = true;
    options.ReportApiVersions = true;
    options.ApiVersionReader = new UrlSegmentApiVersionReader();
});


// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// Configure logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.MapOpenApi();
if (app.Environment.IsDevelopment())
{
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/openapi/v1.json", "TechChallenge5 API v1");
    });
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
