using GuessMyNationality.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GuessMyNationality.MVC.Areas.Admin.ViewModels
{
    public class PictureViewModel
    {
        public Guid Id { get; set; }
        public string Path { get; set; }
        public Nationality Nationality { get; set; }
        public bool IsFamous { get; set; } = false;
        public DateTime AddDate { get; set; }
    }
}
