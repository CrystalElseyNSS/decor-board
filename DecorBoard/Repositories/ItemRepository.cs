using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DecorBoard.Data;
using DecorBoard.Models;
using Microsoft.EntityFrameworkCore;

namespace DecorBoard.Repositories
{
    public class ItemRepository
    {
        private readonly ApplicationDbContext _context;

        public ItemRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Item GetById(int id)
        {
            return _context.Item
                .FirstOrDefault(i => i.Id == id);
        }

        public List<Item> GetItemsByRoomId(int roomId)
        {
            return _context.Item
                //.Include(r => r.Room)
                .Where(i => i.RoomId == roomId)
                .ToList();
        }

        public decimal GetSumOfItems(int roomId)
        {
            return _context.Item
                .Where(i => i.RoomId == roomId)
                .Sum(i => i.ItemPrice);
        }

        public void Add(Item item)
        {
            _context.Add(item);
            _context.SaveChanges();
        }

        public void Update(Item item)
        {
            _context.Entry(item).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var item = GetById(id);
            _context.Item.Remove(item);
            _context.SaveChanges();
        }
    }
}