using DbApp.Db;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TnSecuredStoreApi.Services;

namespace TnSecuredStoreApi.Db.Services
{
    public class EntryService : CoreService<Entry>
    {
        public EntryService(DbContext context) : base(context)
        {
        }

        protected override int GetAuthorId() => 1;


        protected override DateTime GetLocalNow() => DateTime.UtcNow;
       
    }
}
