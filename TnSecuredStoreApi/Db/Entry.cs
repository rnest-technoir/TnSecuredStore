namespace DbApp.Db
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data;
    using TnSecuredStoreApi.Models;

    public partial class Entry : CoreEntity
    {
        public string Title { get; set; }

        public string Password { get; set; }

        public string Login { get; set; }

        public string Email { get; set; }

        public string Url { get; set; }
    }



}
