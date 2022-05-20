using WhaleSpotting.Repositories;
using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Services;
using WhaleSpotting.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;


namespace WhaleSpotting.Controllers
{
    [ApiController]
    [Route("/whales")]
    public class WhalesController : ControllerBase
    {   
        private readonly IWhalesRepo _whalesRepo;
        private readonly IAuthService _authservice;
        private readonly IUsersRepo _usersRepo;
        public WhalesController(
            IWhalesRepo whalesRepo,
            IAuthService authservice,
            IUsersRepo usersRepo
            )
        {
            _whalesRepo = whalesRepo;
            _authservice = authservice;
            _usersRepo = usersRepo;
        }
        
        [HttpGet("")]
        public ActionResult<List<Whale>> WhalesList()
        {
            return _whalesRepo.GetAllWhales();
        }
        [HttpPost]
        [Route("create")]
        public ActionResult Create([FromBody] CreateWhaleRequest newWhale, [FromHeader(Name = "Authorization")] string authHeader)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (authHeader is null)
            {
                return new UnauthorizedResult();
            }

            string username = AuthHelper.GetUsernamePassword(authHeader).Split(":")[0];
            string usernamePassword = AuthHelper.GetUsernamePassword(authHeader);

            var user = new User();

            try
            {
                user = _usersRepo.GetByUsername(username);
            }

            catch (InvalidOperationException)
            {
                return StatusCode(
                    StatusCodes.Status401Unauthorized,
                    "The given username is not valid"
                );
            }
            
            if (user.Role != UserType.ADMIN)
            {
                return StatusCode(
                    StatusCodes.Status403Forbidden,
                    "You are not allowed to add a whale"
                );
            }

            var check = _authservice.IsAuthenticated(usernamePassword);

            if (!check)
                return new UnauthorizedResult();

            try
            {
                var species = _whalesRepo.Create(newWhale, user.Id);
                return Created("/", newWhale);
            }
            catch (BadHttpRequestException)
            {
                return StatusCode(
                    StatusCodes.Status400BadRequest,
                    "Could not create whale"
                );
            }
        }
    }
}