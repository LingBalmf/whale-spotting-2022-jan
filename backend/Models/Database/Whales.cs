
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace WhaleSpotting.Models.Database
{
    public class Whales
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime RegisteredDate { get; set; }
        public int Age { get; set; }
        public string Description { get; set; }
        public string PhotoUrl { get; set; }
   
        [ForeignKey("SpeciesId")]
        public Species Species { get; set; }
  
        [ForeignKey("SponsorUserId")]
        public User Sponsor { get; set; }

    }
}