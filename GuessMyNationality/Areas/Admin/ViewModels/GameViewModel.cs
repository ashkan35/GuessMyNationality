using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GuessMyNationality.MVC.Areas.Admin.ViewModels
{
    public class GameViewModel
    {
        public GameViewModel()
        {
            GameGuid = "";
            GameId = "";
            GameId = "";
        }
        public string GameGuid { get; set; }
        public string GameId { get; set; }
        public int GameScore { get; set; }
    }
}
