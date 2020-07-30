using DecorBoard.Data;
using DecorBoard.Models;
using DecorBoard.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace DecorBoard.Controllers
{

    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly RoomRepository _roomRepository;
        private readonly UserProfileRepository _userProfileRepository;
        public RoomController(ApplicationDbContext context)
        {
            _roomRepository = new RoomRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
        }

        [HttpGet("room/{id}")]
        public IActionResult GetRoomById(int id)
        {
            var room = _roomRepository.GetById(id);
            return Ok(room);
        }

        [HttpGet()]
        public IActionResult GetRoomsByCurrentUser()
        {
            var currentUser = GetCurrentUserProfile();
            var rooms = _roomRepository.GetUserRooms(currentUser.Id);
            return Ok(rooms);
        }

        [HttpPost]
        public IActionResult Register(Room room)
        {
            _roomRepository.Add(room);
            return CreatedAtAction(nameof(GetRoomById), new { id = room.Id }, room);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }

}
