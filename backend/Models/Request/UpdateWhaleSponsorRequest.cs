using System.ComponentModel.DataAnnotations;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Request
{
    public class UpdateWhaleSponsorRequest
    {
        public int SponsorUserId { get; set; }
    }
}