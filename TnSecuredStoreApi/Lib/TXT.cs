using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TnSecuredStoreApi.Lib
{
    public class TXT
    {
        public static class AppSettings
        {
            public static string EntryDbConnection { get => "EntryDbConnection:ConnectionString"; }
        }
        public static class Response
        {
            public static string ResourceNotFound500 { get => "Resource not found. Can't create new."; }
            public static string ResourceFound400 { get => "Resource found. Can't update existing."; }
            public static string BadRequest400 { get => "Bad request. Invalid entry"; }
            public static string ResourceFound403 { get => "Resource not found."; }
            public static string InternalError { get => "Internal error"; }
        }

        public static class Validation
        {
            public static string TitleNotEmpty { get => "Title can't be empty"; }
            public static string IdNotNullOrZero { get => "Invalid entry. Check Id property value"; }
            public static string AuthorIdNotNullOrZero { get => "Invalid entry. Check Author Id property value"; }
            public static string RowGuidNotEmpty { get => "Invalid entry. Check Row Id property value"; }
            public static string CreatedOnotEmpty { get => "Invalid entry. Check Created On property value"; }
            public static string IsActiveNotNull { get => "Invalid entry. Check Is Active property value"; }
            public static string IsRemovedNotNull { get => "Invalid entry. Check Is Removed property value"; }
        }

    }
}
