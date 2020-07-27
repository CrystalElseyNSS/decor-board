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

        public Room GetByUserId(int userId)
        {
            return _context.Room
                .FirstOrDefault(r => r.UserProfileId == userId);
        }

        public void Add(Room room)
        {
            _context.Add(room);
            _context.SaveChanges();
        }
    }
}
