using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DecorBoard.Data;
using DecorBoard.Models;
using Microsoft.EntityFrameworkCore;

namespace DecorBoard.Repositories
{
    public class RoomRepository
    {
        private readonly ApplicationDbContext _context;

        public RoomRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Room GetById(int id)
        {
            return _context.Room
                .FirstOrDefault(r => r.Id == id);
        }

        public List<Room> GetUserRooms(int userId)
        {
            return _context.Room
                .Include(r => r.UserProfile)
                .Where(r => r.UserProfileId == userId)
                .ToList();
        }

        public void Add(Room room)
        {
            _context.Add(room);
            _context.SaveChanges();
        }

        public void Update(Room room)
        {
            _context.Entry(room).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}
