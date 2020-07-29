using DecorBoard.Data;
using DecorBoard.Models;
using DecorBoard.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DecorBoard.Controllers
{

    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly RoomRepository _roomRepository;
        public RoomController(ApplicationDbContext context)
        {
            _roomRepository = new RoomRepository(context);
        }

        [HttpGet("{id}")]
        public IActionResult GetByUserId(int userId)
        {
            var room = _roomRepository.GetByUserId(userId);
            if (room == null)
            {
                return NotFound();
            }
            return Ok(room);
        }

        [HttpPost]
        public IActionResult Register(Room room)
        {
            _roomRepository.Add(room);
            return CreatedAtAction(
                nameof(GetByUserId), new { userProfileId = room.UserProfileId }, room);
        }
    }

}
