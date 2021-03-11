using GuessMyNationality.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GuessMyNationality.Data.Context
{
    public class GuessMyNationalityDbContext:DbContext
    {
        public GuessMyNationalityDbContext(DbContextOptions<GuessMyNationalityDbContext> options):base(options)
        {

        }
        public DbSet<Game> Games { get; set; }
        public DbSet<GamePicture> GamePictures { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

        }
    }
}
