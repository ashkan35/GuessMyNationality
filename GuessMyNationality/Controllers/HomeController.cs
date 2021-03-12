using GuessMyNationality.Data.Repository;
using GuessMyNationality.Domain.Models;
using GuessMyNationality.Models;
using GuessMyNationality.MVC.Areas.Admin.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace GuessMyNationality.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IRepository<GamePicture> _pictureRepository;
        private readonly IHostEnvironment _hostEnvironment;
        private readonly IRepository<Game> _gamerepository;

        public HomeController(ILogger<HomeController> logger, IRepository<GamePicture> PictureRepository, IHostEnvironment hostEnvironment,IRepository<Game> gamerepository)
        {
            _logger = logger;
            _pictureRepository = PictureRepository;
            _hostEnvironment = hostEnvironment;
            _gamerepository = gamerepository;
        }

        public IActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ViewComponentResult GetGamePictureViewComponent()
        {
            var Pics = _pictureRepository.TableNoTracking;
            int min = Pics.First().Id;
            int max = Pics.OrderByDescending(x => x.Id).First().Id;
            Random random = new Random();
            int PicNumber = 0;
            while (PicNumber == 0)
            {
                PicNumber = random.Next(min, max);
                var isExist = Pics.Any(x => x.Id == PicNumber);
                if (isExist == false)
                    PicNumber = 0;

            }
            var piv = Pics.SingleOrDefault(x => x.Id == PicNumber);
            PictureToGameViewModel model = new PictureToGameViewModel
            {
                Guid = piv.Guid,
                Path = $"\\GamePictures\\{piv.Name}"
            };
            return ViewComponent(typeof(GuessMyNationality.MVC.ViewComponents.GamePictureViewComponent), model);

         
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
        public async Task<ViewComponentResult> GetScoresViewComponent(CancellationToken cancellationToken,string ImageGuid="",string GameGuid="", Nationality? nationality=null)
        {

            if (GameGuid == null || GameGuid=="")
            {
                Game game = new Game
                {
                    Guid = Guid.NewGuid().ToString("N"),
                    IpAddress = "22",
                    NumberOfImages = 10,
                    Score = 0,
                    StartDateTime = DateTime.Now
                };
                await _gamerepository.AddAsync(game, cancellationToken);
                GameViewModel model = new GameViewModel { GameGuid = game.Guid, GameScore = game.Score };
                return ViewComponent(typeof(GuessMyNationality.MVC.ViewComponents.ScoresViewComponent),model);

            }
            else
            {
                var game = _gamerepository.Table.SingleOrDefault(x => x.Guid == GameGuid);
                var image = _pictureRepository.Table.SingleOrDefault(x => x.Guid == ImageGuid);
                if(game==null || image==null)
                    return ViewComponent(typeof(GuessMyNationality.MVC.ViewComponents.ScoresViewComponent), new GameViewModel());
                else
                {
                    if (image.Nationality == nationality)
                        game.Score += 10;
                    else
                        game.Score -= 5;
                    GameViewModel model = new GameViewModel { GameGuid = game.Guid, GameScore = game.Score };
                    await _gamerepository.UpdateAsync(game, cancellationToken);
                    return ViewComponent(typeof(GuessMyNationality.MVC.ViewComponents.ScoresViewComponent), model);

                }

            }


        }
        public Task<ViewComponentResult> GetStartButtonViewComponent(int id=0)
        {
            return Task.Run(()=> { return ViewComponent(typeof(GuessMyNationality.MVC.ViewComponents.StartButtonViewComponent)); });
        }
    }
}
