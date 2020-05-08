using AutoMapper;
using DbApp.Db;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TnSecuredStoreApi.Models;

namespace TnSecuredStoreApi.Profiles
{
    public class MainProfile : Profile
    {
        public MainProfile()
        {
            CreateMap<Entry, EntryModel>();
            CreateMap<EntryModel, Entry>();
        }
    }
}
