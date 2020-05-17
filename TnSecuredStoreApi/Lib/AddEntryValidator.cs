using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TnSecuredStoreApi.Models;

namespace TnSecuredStoreApi.Lib
{
    public class AddEntryValidator: AbstractValidator<EntryModel>
    {
        public AddEntryValidator()
        {
            RuleFor(entry => entry.Title).NotEmpty().WithMessage(TXT.Validation.TitleNotEmpty);
        }
    }
}
