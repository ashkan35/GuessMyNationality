using GuessMyNationality.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GuessMyNationality.MVC.Areas.Admin.ViewModels
{
    public class PictureToGameViewModel
    {
        public string Path { get; set; }
        public string Guid { get; set; }
        public Nationality Nationality { get; set; }

    }
}
