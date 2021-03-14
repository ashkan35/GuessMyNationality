using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GuessMyNationality.MVC.Areas.Admin.ViewModels
{
    public class DashboardViewModel
    {
        public int TotalGames { get; set; }
        public int TopScore { get; set; }
        public int TotalUsers { get; set; }
    }
}
