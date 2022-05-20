using System.ComponentModel.DataAnnotations;
using System;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Request
{
    public class CreateWhaleRequest
    {
        [Required]
        public string Name{ get; set; }
        public DateTime RegisteredDate{ get; set; }

        public int Age{ get; set; }

        [Required]
        [StringLength(2048)]
        public string Description {get; set; }

        [Required]
        public string PhotoUrl { get; set; }

        [Required]
        public int SpeciesId { get; set; }
        public CreateWhaleRequest (Whale whale)
        {
            Name = whale.Name;
            RegisteredDate = whale.RegisteredDate;
            Age = whale.Age;
            Description = whale.Description;
            PhotoUrl = whale.PhotoUrl;
            SpeciesId = whale.SpeciesId;
        }
        public CreateWhaleRequest ()
        {
        }
    }
}