using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace TnSecuredStoreApi.Controllers
{
    [ApiController]
    [EnableCors("SecuredEntryPolicy")]
    public class MainController : ControllerBase
    {
        protected readonly IHttpContextAccessor _accesor;

        public MainController(IHttpContextAccessor accesor)
        {
            _accesor = accesor;
        }


        protected string GetCreatedUrl(string controller, string action, int id)
        {
            var acc = _accesor;
            return $"{_accesor.HttpContext.Request.Scheme}://{controller}/{action}/{id}";
        }

        protected string GetCreatedRouteUrl(string route, int id)
        {
            var acc = _accesor;
            return $"{_accesor.HttpContext.Request.Scheme}://{route}/{id}";
        }

    }
}
