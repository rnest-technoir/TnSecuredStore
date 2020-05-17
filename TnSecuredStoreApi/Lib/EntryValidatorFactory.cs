using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TnSecuredStoreApi.Models;

namespace TnSecuredStoreApi.Lib
{
    public class EntryValidatorFactory
    {
        public AbstractValidator<EntryModel> Create(Type validatorType) => (AbstractValidator<EntryModel>)Activator.CreateInstance(validatorType);
    }
}
