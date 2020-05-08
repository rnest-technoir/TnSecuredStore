using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DbApp.Db;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TnSecuredStoreApi.Db.Services;
using TnSecuredStoreApi.Models;

namespace TnSecuredStoreApi.Controllers
{
    [ApiController]
    [EnableCors("SecuredEntryPolicy")]
    public class EntryController : ControllerBase
    {
        private readonly EntryService _entryService;
        private readonly IMapper _mapper;
        public EntryController(EntryService entryService, IMapper mapper)
        {
            _entryService = entryService;
            _mapper = mapper;
        }

        [Route("api/entryList")]
        public async Task<IList<EntryModel>> GetEntryListAsync()
        {
            return _mapper.Map<IList<Entry>, IList<EntryModel>>((await _entryService.GetAllAsync()).ToList());
        }

        [Route("api/addEntry")]
        [HttpPost]
        public async Task<EntryModel> AddEntryAsync([FromBody]EntryModel model)
        {
            var entry = _mapper.Map<EntryModel, Entry>(model);
            model = _mapper.Map<Entry, EntryModel>(await _entryService.AddAsync(entry));
            return model;
        }
    }
}