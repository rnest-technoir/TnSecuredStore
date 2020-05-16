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
using TnSecuredStoreApi.Lib;
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
        [HttpGet]
        public async Task<IList<EntryModel>> GetEntryListAsync()
        {
            return _mapper.Map<IList<Entry>, IList<EntryModel>>((await _entryService.GetAllAsync()).OrderByDescending(e => e.CreatedOn).ToList());
        }

        [Route("api/addEntry")]
        [HttpPost]
        public async Task<EntryModel> AddEntryAsync([FromBody]EntryModel model)
        {
            var entry = _mapper.Map<EntryModel, Entry>(model);
            model = _mapper.Map<Entry, EntryModel>(await _entryService.AddAsync(entry));
            return model;
        }

        [Route("api/addOrUpdateEntry")]
        [HttpPut]
        public async Task<IActionResult> AddOrUpdateEntryAsync([FromBody]EntryModel model)
        {
            var entry = await _entryService.GetByIdAsync(model.Id);
            var entryToModel = _mapper.Map<EntryModel, Entry>(model);

            if (null == entry)
            {
                var added = await _entryService.AddAsync(entryToModel);
                if(null == added)
                    return StatusCode(StatusCodes.Status500InternalServerError, TXT.Response.ResourceNotFound500);
                return Ok(added);
            }

            int result = await _entryService.UpdateAsync(entryToModel);

            if (result == 0)
                return StatusCode(StatusCodes.Status400BadRequest, TXT.Response.ResourceFound400);

            model = _mapper.Map<Entry, EntryModel>(entry);
            return Ok(model);
        }

        [Route("api/UpdateEntry")]
        [HttpPut]
        public async Task<IActionResult> UpdateEntryAsync([FromBody]EntryModel model)
        {
            var entryToModel = _mapper.Map<EntryModel, Entry>(model);

            int result = await _entryService.UpdateAsync(entryToModel);

            if (result == 0)
                return StatusCode(StatusCodes.Status400BadRequest, TXT.Response.ResourceFound400);

            var entry = await _entryService.GetByIdAsync(model.Id);
            model = _mapper.Map<Entry, EntryModel>(entry);
            return Ok(model);
        }


        [Route("api/deleteEntry")]
        [HttpPost]
        public async Task<IActionResult> DeleteEntryAsync([FromBody]EntryModel model)
        {
            var entry = await _entryService.GetByIdAsync(model.Id);

            if (null == entry)
                return StatusCode(StatusCodes.Status404NotFound, TXT.Response.ResourceFound403);

            var modelEntry = _mapper.Map<EntryModel, Entry>(model);
            int result = await _entryService.DeleteAsync(modelEntry);

            if (result == 0)
                return StatusCode(StatusCodes.Status500InternalServerError, TXT.Response.InternalError);

            return StatusCode(StatusCodes.Status204NoContent);
        }
    }
}