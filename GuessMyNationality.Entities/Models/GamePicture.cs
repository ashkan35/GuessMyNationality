using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GuessMyNationality.Domain.Models
{
    public class GamePicture:IEntity
    {
        [Key]
        public int Id { get; set; }
        public string Guid { get; set; }
        public string Name { get; set; }
        public Nationality Nationality { get; set; }
        public bool IsFamous { get; set; } = false;
        public DateTime AddDate { get; set; }
    }
    public enum Nationality
    {
        Japanese,
        Chinese,
        Korean,
        Thai
    }
}
