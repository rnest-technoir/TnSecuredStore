using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TnSecuredStoreApi.Models
{
    public class CoreModel
    {
        public int Id { get; set; }
        public int AuthorId { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public string RowGuid { get; set; }
        public bool IsRemoved { get; set; }
        public bool IsActive { get; set; }
    }
}
