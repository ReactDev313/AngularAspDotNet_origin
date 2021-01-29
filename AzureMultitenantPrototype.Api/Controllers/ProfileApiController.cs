using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace AzureMultitenantPrototype.Api.Controllers
{
    [Route("api/profile")]
    [Authorize]
    public class ProfileApiController : Controller
    {
        [Route("me")]
        [HttpGet]
        public IActionResult MyProfile()
        {
            return Ok(new { Name = User.Claims.First(x => x.Type == "name").Value, TenantId = User.Claims.First(x => x.Type == "http://schemas.microsoft.com/identity/claims/tenantid").Value });
        }
    }
}
