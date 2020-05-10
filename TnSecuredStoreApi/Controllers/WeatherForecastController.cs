using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace TnSecuredStoreApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [EnableCors("SecuredEntryPolicy")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Mglisto", "Bracing", "Chilly", "Cool", "Mild", "Duszno", "Balmy", "Hot", "Sweltering", "Scorching",
            "Freezing", "Bracing", "Parno", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching",
            "Smog", "Bracing", "Parno", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"

        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 25).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}
