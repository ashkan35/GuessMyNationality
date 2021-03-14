using GuessMyNationality.Data.Repository;
using GuessMyNationality.Domain.Models;
using GuessMyNationality.MVC.Areas.Admin.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GuessMyNationality.MVC.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class HomeController : Controller
    {
        private readonly IRepository<Game> _gameRepository;

        public HomeController(IRepository<Game> GameRepository)
        {
            _gameRepository = GameRepository;
        }
        public IActionResult Index()
        {
            var games = _gameRepository.TableNoTracking;
            var query = games.GroupBy(x => x.IpAddress).Select(g => new { IpAddress = g.Key, Count = g.Count() });
            DashboardViewModel model = new DashboardViewModel
            {
                TopScore = games.OrderByDescending(x => x.Score).First().Score,
                TotalGames = games.Count(),
                TotalUsers = query.Count()
            };
            return View(model);
        }
    }
}
