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
    public class ItemController : ControllerBase
    {
        private readonly ItemRepository _itemRepository;
        private readonly UserProfileRepository _userProfileRepository;
        public ItemController(ApplicationDbContext context)
        {
            _itemRepository = new ItemRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
        }

        [HttpGet("item/{id}")]
        public IActionResult GetItemById(int id)
        {
            var item = _itemRepository.GetById(id);
            return Ok(item);
        }

        [HttpGet]
        public IActionResult GetAllRoomItems(int roomId)
        {
            var items = _itemRepository.GetItemsByRoomId(roomId);
            return Ok(items);
        }

        [HttpPost]
        public IActionResult Post(Item item)
        {
            _itemRepository.Add(item);
            return CreatedAtAction(nameof(GetItemById), new { id = item.Id }, item);
        }

        [HttpPut("addItem/{id}")]
        public IActionResult Put(int id, Item item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            _itemRepository.Update(item);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _itemRepository.Delete(id);
            return NoContent();
        }
    }
}