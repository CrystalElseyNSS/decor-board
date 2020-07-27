using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DecorBoard.Models
{
    public class Category
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(25)]
        public string CategoryName { get; set; }
    }
}
