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
using System.Threading.Tasks;

namespace GuessMyNationality.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IRepository<GamePicture> _pictureRepository;
        private readonly IHostEnvironment _hostEnvironment;


        public HomeController(ILogger<HomeController> logger, IRepository<GamePicture> PictureRepository, IHostEnvironment hostEnvironment)
        {
            _logger = logger;
            _pictureRepository = PictureRepository;
            _hostEnvironment = hostEnvironment;

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
        public async Task<ViewComponentResult> GetScoresViewComponent(string ImageGuid="",string GameGuid="", Nationality? nationality=null)
        {
          
                return ViewComponent(typeof(GuessMyNationality.MVC.ViewComponents.ScoresViewComponent),new GameViewModel());
            
           
        }
    }
}
