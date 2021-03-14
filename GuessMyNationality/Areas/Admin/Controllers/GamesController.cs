using GuessMyNationality.Data.Repository;
using GuessMyNationality.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GuessMyNationality.MVC.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class GamesController : Controller
    {
        private readonly IRepository<Game> _gamerepository;

        public GamesController(IRepository<Game> Gamerepository)
        {
           _gamerepository = Gamerepository;
        }
        public Task<ViewResult> Index()
        {

            var games = _gamerepository.TableNoTracking;
            return Task.Run(() => { return View(games); });
        }
    }
}
