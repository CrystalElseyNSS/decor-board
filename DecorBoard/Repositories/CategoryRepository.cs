using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DecorBoard.Data;
using DecorBoard.Models;
using Microsoft.EntityFrameworkCore;

namespace DecorBoard.Repositories
{
    public class CategoryRepository
    {
        private readonly ApplicationDbContext _context;

        public CategoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Category GetById(int id)
        {
            return _context.Category
                .FirstOrDefault(i => i.Id == id);
        }

        public List<Category> GetCategories()
        {
            return _context.Category
                .ToList();
        }
    }
}