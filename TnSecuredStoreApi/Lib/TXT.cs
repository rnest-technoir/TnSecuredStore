using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TnSecuredStoreApi.Lib
{
    public class TXT
    {
        public class AppSettings
        {
            public static string EntryDbConnection { get => "EntryDbConnection:ConnectionString"; }
        }
        public class Response
        {
            public static string ResourceNotFound500 { get => "Resource not found. Can't create new."; }
            public static string ResourceFound400 { get => "Resource found. Can't update existing."; }
            public static string ResourceFound403 { get => "Resource not found."; }
            public static string InternalError { get => "Internal error"; }
        }

    }
}
