﻿namespace TechChallenge5.Services.ExternalServices
{
    public interface IEmailService
    {
        Task SendEmailAsync(string to, string subject, string body);
    }
}
