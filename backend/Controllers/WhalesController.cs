using WhaleSpotting.Repositories;
using WhaleSpotting.Models.Database;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace WhaleSpotting.Controllers
{
    [ApiController]
    [Route("/meetwhales")]

    public class WhalesController : ControllerBase
    {   
        private readonly IWhalesRepo _whalesRepo;
        public WhalesController(
            IWhalesRepo whalesRepo
            )
        {
            _whalesRepo = whalesRepo;
        }
        
        [HttpGet("")]
        public ActionResult<List<Whales>> WhalesList()
        {
            return _whalesRepo.GetAllWhales();
        }
    }
}