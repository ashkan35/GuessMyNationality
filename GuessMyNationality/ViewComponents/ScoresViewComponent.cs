using GuessMyNationality.Data.Repository;
using GuessMyNationality.Domain.Models;
using GuessMyNationality.MVC.Areas.Admin.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GuessMyNationality.MVC.ViewComponents
{
    public class ScoresViewComponent:ViewComponent
    {
       public async Task<IViewComponentResult> InvokeAsync(GameViewModel model)
        {
            return View("/Views/Home/ScoresViewComponent.cshtml", model);
        }
    }
}
