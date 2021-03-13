using GuessMyNationality.Common.Utilities;
using GuessMyNationality.Data.Repository;
using GuessMyNationality.Domain.Models;
using GuessMyNationality.MVC.Areas.Admin.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace GuessMyNationality.MVC.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class PicturesController : Controller
    {
        private readonly IRepository<GamePicture> _gamePictureRepository;
        private readonly IImageResizer _imageResizer;
        private readonly IHostEnvironment _hostEnvironment;

        public PicturesController(IRepository<GamePicture> GamePictureRepository, IImageResizer imageResizer, IHostEnvironment hostEnvironment)
        {
            _gamePictureRepository = GamePictureRepository;
            _imageResizer = imageResizer;
            _hostEnvironment = hostEnvironment;
        }
        public IActionResult Index(int PageId=1,int Ntionality=4)
        {
            List<EnumClass> enums = ((Nationality[])Enum.GetValues(typeof(Nationality))).Select(c => new EnumClass { Value = (int)c, Name = c.ToString() }).ToList();

            var list = new { names = Enum.GetNames(typeof(Nationality)), values = Enum.GetValues(typeof(Nationality)) };
            ViewBag.SelectList = new SelectList(enums,"Value","Name",Ntionality);
            IEnumerable<GamePicture> Pictures;
            if (Ntionality == 4)
                Pictures = _gamePictureRepository.TableNoTracking;
            else
                Pictures = _gamePictureRepository.TableNoTracking.Where(x => x.Nationality == (Nationality)Ntionality);

            int PictureCount = Pictures.Count();
            int take = 10;
            int skip = (PageId - 1) * 10;
            var Pictureslist = Pictures.Skip(skip).Take(take);
            ViewBag.PageId = PageId;
            ViewBag.TotalPages = PictureCount % 10 == 0 ? PictureCount / 10 : PictureCount / 10 + 1;
         
            return View(Pictureslist);
        }
        //Add Pictures to Game 
        public Task<ViewResult> AddPicture()
        {
            return Task.Run(() => { return View(); });
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddPicture(AddPictureViewModel model,CancellationToken cancellationToken)
        {
            
            if (ModelState.IsValid)
            {
                var picguid = Guid.NewGuid().ToString("N");
                var picname = picguid + ".jpg";
                using (Image img = Image.FromStream(model.PictureFile.OpenReadStream()))
                {
                    //img.Save(_hostEnvironment.ContentRootPath + $"\\wwwroot\\Images\\ProductImages\\{Guid.NewGuid()}.jpg", ImageFormat.Jpeg);
                    _imageResizer.Resize(img, _hostEnvironment.ContentRootPath + $"\\wwwroot\\GamePictures\\{picname}");
                }
                GamePicture pic = new GamePicture
                {
                    AddDate = DateTime.Now,
                    IsFamous = model.IsFamous,
                    Name = picname,
                    Guid = picguid,
                    Nationality = model.Nationality
                };
                await _gamePictureRepository.AddAsync(pic, cancellationToken);
                return RedirectToAction("Index");
            }
            return View(model);
        }
        [HttpPost]
        public async Task<JsonResult> DeletePicture(int id,CancellationToken cancellationToken)
        {
            var pic = await _gamePictureRepository.Table.SingleOrDefaultAsync(x => x.Id == id);
            if (pic == null)
                return Json(new { result = false, message = "Wrong Parameters" });
            else
            {
                try
                {
                    await _gamePictureRepository.DeleteAsync(pic, cancellationToken);

                    System.IO.File.Delete(_hostEnvironment.ContentRootPath + $"\\wwwroot\\GamePictures\\{pic.Name}");
                    return Json(new { result = true, message = "Done" });

                }
                catch (Exception)
                {

                    return Json(new { result = false, message = "Server Error" });

                }
            }
               

        }
    }
}
