using DecorBoard.Data;
using DecorBoard.Models;
using DecorBoard.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace DecorBoard.Controllers
{
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

        [HttpGet("{id}")]
        public IActionResult GetAllRoomItems(int id)
        {
            var items = _itemRepository.GetItemsByRoomId(id);
            return Ok(items);
        }

        [HttpGet("budget/{id}")]
        public IActionResult GetRoomBudget(int id)
        {
            var priceTotal = _itemRepository.GetSumOfItems(id);
            var roomTotal = new RoomTotalViewModel()
            {
                SumOfRoomItems = priceTotal
            };
            return Ok(roomTotal);
        }

        [HttpPost]
        public IActionResult Post(Item item)
        {
            _itemRepository.Add(item);
            return CreatedAtAction(nameof(GetItemById), new { id = item.Id }, item);
        }

        [HttpPut("editItem/{id}")]
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