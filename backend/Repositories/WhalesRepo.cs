using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;

namespace WhaleSpotting.Repositories

{
    public interface IWhalesRepo
    {
       List<Whale> GetAllWhales();
       Whale GetWhaleById(int whaleId);
       Whale Create(CreateWhaleRequest newWhale, int userId);
       Whale AddWhaleSponsor(int whaleId, int userId);
    }

    public class WhalesRepo : IWhalesRepo
    {
        private readonly WhaleSpottingDbContext _context;

        public WhalesRepo(WhaleSpottingDbContext context)
        {
            _context = context;
        }

        public List<Whale> GetAllWhales()
        {
            return _context
                .Whales
                .Include(s => s.Species)
                .Include(u => u.Sponsor)
                .ToList();
        }
        public Whale GetWhaleById(int whaleId)
        {
            return _context
                .Whales
                .Include(s => s.Species)
                .Include(u => u.Sponsor)
                .Single(Whale => Whale.Id == whaleId);
        }

        public Whale Create(CreateWhaleRequest newWhale, int userId)
        {
            var insertedResult = _context.Whales.Add( 
                new Whale
                {
                    Name = newWhale.Name,
                    RegisteredDate = newWhale.RegisteredDate,
                    Age = newWhale.Age,
                    Description = newWhale.Description,
                    PhotoUrl = newWhale.PhotoUrl,
                    SpeciesId = newWhale.SpeciesId
 
                });
            _context.SaveChanges();
            return insertedResult.Entity;
        }
    

        public Whale AddWhaleSponsor(int whaleId, int userId)
        {
            var whale = GetWhaleById(whaleId);

            whale.Sponsor.Id = userId;

            _context.Users.Update(whale.Sponsor);
            _context.SaveChanges();

            return whale;
        }
    }

}
