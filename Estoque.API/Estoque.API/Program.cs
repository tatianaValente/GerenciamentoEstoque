using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Estoque.Domain;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Estoque.API
{
    public class Program
    {
        public static void Main(string[] args)
        {

            IConfiguration configuration = GetConfiguration();


            try
            {

                IWebHost host = BuildWebHost(configuration, args);

                host.MigrateDbContext<EstoqueContext>((context, services) =>
                {
                    
                });



                host.Run();

            }
            catch (Exception ex)
            {
            }
            finally
            {
            }
        }


        private static IWebHost BuildWebHost(IConfiguration configuration, string[] args)
        {
            var host = WebHost.CreateDefaultBuilder(args)
                .CaptureStartupErrors(false)
                .UseStartup<Startup>()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseConfiguration(configuration);

            return host.Build();
        }

        private static IConfiguration GetConfiguration()
        {

            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Development"}.json", optional: true, reloadOnChange: true)
                .AddJsonFile("ocelot.json", optional: true, reloadOnChange: true)
                .AddEnvironmentVariables();

            return builder.Build();
        }

    }

    public static class IWebHostExtensions
    {
        
        public static IWebHost MigrateDbContext<TContext>(this IWebHost webHost, Action<TContext, IServiceProvider> seeder) where TContext : DbContext
        {

            using (var scope = webHost.Services.CreateScope())
            {
                var services = scope.ServiceProvider;

                var logger = services.GetRequiredService<ILogger<TContext>>();

                var context = services.GetService<TContext>();

                try
                {
                    logger.LogInformation("Migrating database associated with context {DbContextName}", typeof(TContext).Name);

                    InvokeSeeder(seeder, context, services);

                    logger.LogInformation("Migrated database associated with context {DbContextName}", typeof(TContext).Name);
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, "An error occurred while migrating the database used on context {DbContextName}", typeof(TContext).Name);
                }
            }

            return webHost;
        }

        private static void InvokeSeeder<TContext>(Action<TContext, IServiceProvider> seeder, TContext context, IServiceProvider services)
            where TContext : DbContext
        {
            context.Database.Migrate();
            seeder(context, services);
        }
    }


}
