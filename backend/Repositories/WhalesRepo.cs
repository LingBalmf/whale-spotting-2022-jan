using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Repositories

{
    public interface IWhalesRepo
    {
        List<Whales> GetAllWhales();
    }

    public class WhalesRepo : IWhalesRepo
    {
        private readonly WhaleSpottingDbContext _context;

        public WhalesRepo(WhaleSpottingDbContext context)
        {
            _context = context;
        }

        public List<Whales> GetAllWhales()
        {
            return _context
                .Whales
                .Include(s => s.Species)
                .Include(u => u.SponsorId)
                .ToList();
        }
    }
}
