using GuessMyNationality.MVC.Areas.Admin.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GuessMyNationality.MVC.ViewComponents
{
    public class GamePictureViewComponent:ViewComponent
    {

        public async Task<IViewComponentResult> InvokeAsync(PictureToGameViewModel model)
        {
            return View("/Views/Home/GamePictureViewComponent.cshtml",model);
        }
    }
}
