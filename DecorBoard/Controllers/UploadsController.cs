using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadsController : ControllerBase
    {
        private readonly IWebHostEnvironment _webhost;
        public UploadsController(IWebHostEnvironment webhost)
        {
            _webhost = webhost;
        }

        [HttpPost]
        public async Task<IActionResult> Post(IFormFile body)
        {
            var saveFile = Path.Combine(_webhost.WebRootPath, "uploads", body.FileName);
            if (body.Length > 0)
            {
                using (var stream = new FileStream(saveFile, FileMode.Create))
                {
                    await body.CopyToAsync(stream);

                }
            }
            else
            {
                return BadRequest();
            }
            return Ok();
        }
    }
}