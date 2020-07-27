using Microsoft.EntityFrameworkCore;
using DecorBoard.Models;

namespace DecorBoard.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Category> Category { get; set; }

        public DbSet<UserProfile> UserProfile { get; set; }

        public DbSet<Room> Room { get; set; }

        public DbSet<Item> Item { get; set; }

        public DbSet<RoomItem> RoomItem { get; set; }
    }
}