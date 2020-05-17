using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TnSecuredStoreApi.Models;

namespace TnSecuredStoreApi.Lib
{
    public class EntryValidator: AbstractValidator<EntryModel>
    {
        public EntryValidator()
        {
            RuleFor(entry => entry.Title).NotEmpty().WithMessage(TXT.Validation.TitleNotEmpty);
            RuleFor(entry => entry.Id).NotNull().WithMessage(TXT.Validation.IdNotNullOrZero);
            RuleFor(entry => entry.AuthorId).NotNull().WithMessage(TXT.Validation.AuthorIdNotNullOrZero);
            RuleFor(entry => entry.CreatedOn).NotEmpty().WithMessage(TXT.Validation.CreatedOnotEmpty);
            RuleFor(entry => entry.IsActive).NotNull().WithMessage(TXT.Validation.IsActiveNotNull);
            RuleFor(entry => entry.IsRemoved).NotNull().WithMessage(TXT.Validation.IsRemovedNotNull);
            RuleFor(entry => entry.RowGuid).NotEmpty().WithMessage(TXT.Validation.RowGuidNotEmpty);
        }
    }
}
