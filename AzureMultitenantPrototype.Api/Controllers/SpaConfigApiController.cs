using AzureMultitenantPrototype.Api.Configuration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AzureMultitenantPrototype.Api.Controllers
{
    [AllowAnonymous]
    [Route("api/config")]
    public class SpaConfigApiController : Controller
    {
        private readonly IConfiguration _configuration;
        public SpaConfigApiController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [Route("spa")]
        public IActionResult Get()
        {
            var spaConfig = new SpaConfig();
            _configuration.GetSection("SpaConfig").Bind(spaConfig);
            return Ok(spaConfig);
        }
    }
}
