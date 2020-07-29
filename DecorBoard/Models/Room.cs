using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DecorBoard.Models
{
    public class Room
    {
        public int Id { get; set; }
        [Required]
        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }

        [Required]
        [MaxLength(25)]
        public string RoomName { get; set; }

        [Required]
        [MaxLength(25)]
        public string ImageLocation { get; set; }

  
    }
}
