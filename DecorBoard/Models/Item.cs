using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DecorBoard.Models
{
    public class Item
    {
        public int Id { get; set; }

        [Required]
        public int CategoryId { get; set; }

        public Category Category { get; set; }

        [Required]
        public int RoomId { get; set; }

        public Room Room { get; set; }

        [Required]
        [MaxLength(50)]
        public string ItemName { get; set; }

        [Required]
        [MaxLength(25)]
        public string ImageLocation { get; set; }

        [Required]
        public decimal ItemPrice { get; set; }
    }
}
