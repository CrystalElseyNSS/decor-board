using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DecorBoard.Models
{
    public class RoomItem
    {
        public int Id { get; set; }

        [Required]
        public int ItemId { get; set; }

        public Item Item { get; set; }

        [Required]
        public int RoomId { get; set; }

        public Room Room { get; set; }

    }
}
