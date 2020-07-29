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

        [HttpGet("room/{id}")]
        public IActionResult GetRoomById(int id)
        {
            var room = _roomRepository.GetById(id);
            return Ok(room);
        }

        [HttpGet("{id}")]
        public IActionResult GetRoomsByUserId(int id)
        {
            var rooms = _roomRepository.GetUserRooms(id);
            return Ok(rooms);
        }

        [HttpPost]
        public IActionResult Register(Room room)
        {
            _roomRepository.Add(room);
            return CreatedAtAction(nameof(GetRoomById), new { id = room.Id }, room);
        }
    }

}
