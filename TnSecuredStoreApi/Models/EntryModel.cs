using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TnSecuredStoreApi.Models
{
    public class EntryModel : CoreModel
    {
        [Required]
        public string Title { get; set; }

        public string Password { get; set; }

        public string Login { get; set; }

        [StringLength(255)]
        public string Email { get; set; }

        public string Url { get; set; }
    }
}
