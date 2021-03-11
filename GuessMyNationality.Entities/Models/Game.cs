using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GuessMyNationality.Domain.Models
{
    public class Game:IEntity
    {
        [Key]
        public int Id { get; set; }
        public string Guid { get; set; }
        public int NumberOfImages { get; set; }
        public DateTime StartDateTime { get; set; }
        public string IpAddress { get; set; }
        public int Score { get; set; }
    }
}
