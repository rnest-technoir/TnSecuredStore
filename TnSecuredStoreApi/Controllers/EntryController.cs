using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DbApp.Db;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
using TnSecuredStoreApi.Db.Services;
using TnSecuredStoreApi.Lib;
using TnSecuredStoreApi.Models;

namespace TnSecuredStoreApi.Controllers
{
    
    public class EntryController : MainController
    {
        private readonly EntryService _entryService;
        private readonly EntryValidatorFactory _validatorFactory;
        private readonly IMapper _mapper;

        public EntryController(EntryService entryService, EntryValidatorFactory validatorFactory, IMapper mapper, IHttpContextAccessor accessor): base(accessor)
        {
            _entryService = entryService;
            _validatorFactory = validatorFactory;
            _mapper = mapper;
        }

        [Route("api/EntryList")]
        [HttpGet]
        public async Task<IActionResult> GetEntryListAsync()
        {
            var list = (await _entryService.GetAllAsync()).OrderByDescending(e => e.CreatedOn).ToList();
            return Ok(_mapper.Map<IList<Entry>, IList<EntryModel>>(list));
        }

        [Route("api/GetEntryById/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetEntryByIdAsync(int id)
        {
            var entry = _mapper.Map<Entry, EntryModel>(await _entryService.GetByIdAsync(id));
            if(null == entry)
                return StatusCode(StatusCodes.Status404NotFound);

            return Ok(_mapper.Map<Entry, EntryModel>(await _entryService.GetByIdAsync(id)));
        }

        [Route("api/AddEntry")]
        [HttpPost]
        public async Task<IActionResult> AddEntryAsync([FromBody]EntryModel model)
        {
            var validator = _validatorFactory.Create(typeof(AddEntryValidator));
            var validation = await validator.ValidateAsync(model);
            if(!validation.IsValid)
                return StatusCode(StatusCodes.Status400BadRequest, validation.Errors.FirstOrDefault().ErrorMessage);

            var entry = _mapper.Map<EntryModel, Entry>(model);
            model = _mapper.Map<Entry, EntryModel>(await _entryService.AddAsync(entry));
            var url = GetCreatedRouteUrl("api/GetEntryById", entry.Id);
            return Created(url, model);
        }

        [Route("api/AddOrUpdateEntry")]
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
                var url = Url.Action(nameof(GetEntryByIdAsync), nameof(EntryController), new { id = model.Id }, Request.Scheme);
                return Created(url, model);
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
            var validator = _validatorFactory.Create(typeof(EntryValidator));
            var validation = await validator.ValidateAsync(model);
            if (!validation.IsValid)
                return StatusCode(StatusCodes.Status400BadRequest, validation.Errors.FirstOrDefault().ErrorMessage);


            var entryToModel = _mapper.Map<EntryModel, Entry>(model);

            int result = await _entryService.UpdateAsync(entryToModel);

            if (result == 0)
                return StatusCode(StatusCodes.Status400BadRequest, TXT.Response.ResourceFound400);

            var entry = await _entryService.GetByIdAsync(model.Id);
            model = _mapper.Map<Entry, EntryModel>(entry);
            return Ok(model);
        }


        [Route("api/DeleteEntry")]
        [HttpPost]
        public async Task<IActionResult> DeleteEntryAsync([FromBody]EntryModel model)
        {

            var validator = _validatorFactory.Create(typeof(EntryValidator));
            var validation = await validator.ValidateAsync(model);
            if (!validation.IsValid)
                return StatusCode(StatusCodes.Status400BadRequest, validation.Errors.FirstOrDefault().ErrorMessage);

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