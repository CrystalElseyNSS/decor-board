using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DecorBoard.Data;
using DecorBoard.Models;

namespace DecorBoard.Repositories
{
    public class RoomRepository
    {
        private readonly ApplicationDbContext _context;

        public RoomRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Room GetRoomById(int id)
        {
            return _context.Room
                .FirstOrDefault(r => r.Id == id);
        }

        public List<Room> GetRoomsByUserId(int userId)
        {
            return _context.Room
                .Where(r => r.UserProfileId == userId)
                .ToList();
        }

        public void Add(Room room)
        {
            _context.Add(room);
            _context.SaveChanges();
        }
    }
}
