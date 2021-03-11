using GuessMyNationality.Domain.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GuessMyNationality.MVC.Areas.Admin.ViewModels
{
    public class AddPictureViewModel
    {
        [Required(ErrorMessage ="You must choose nationality")]
        public Nationality Nationality { get; set; }
        
        public bool IsFamous { get; set; } = false;
        [Required(ErrorMessage = "You must select a picture")]
        public IFormFile PictureFile { get; set; }
    }
}
