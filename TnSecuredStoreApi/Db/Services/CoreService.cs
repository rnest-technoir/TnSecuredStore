using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TnSecuredStoreApi.Models;

namespace TnSecuredStoreApi.Services
{
    public abstract class CoreService<TEntity> : IDisposable where TEntity : CoreEntity
    {
        protected DbContext _context;
        public virtual DbContext Context { get => _context; }

        

        public CoreService(DbContext context)
        {
            _context = context;
        }

      

        public virtual IQueryable<TEntity> DefaultListFilter(IQueryable<TEntity> inputList)
        {
            return inputList;
        }

        protected abstract int GetAuthorId();

        protected abstract DateTime GetLocalNow();

        public virtual IQueryable<TEntity> GetAll()
        {
            return DefaultListFilter(_context.Set<TEntity>().Where(e => e.IsActive));
        }

        public virtual async Task<IQueryable<TEntity>> GetAllAsync()
        {
            return await Task.Factory.StartNew(() =>
            {
                return DefaultListFilter(_context.Set<TEntity>().Where(e => e.IsActive));
            });
        }

        public virtual TEntity Add(TEntity entity)
        {
            entity.AuthorId = GetAuthorId();
            entity.CreatedOn = GetLocalNow();
            entity.IsActive = true;
            entity.IsRemoved = false;
            entity.RowGuid = Guid.NewGuid().ToString();


            var result = _context.Set<TEntity>().Add(entity);

            try
            {
                int changed = _context.SaveChanges();
                if (changed > 0)
                    return result.Entity;
                else
                    return null;
            }
            catch (Exception e)
            {
                throw e;
            }
            

        }

        public virtual async Task<TEntity> AddAsync(TEntity entity)
        {
            return await Task.Factory.StartNew(() =>
            {
                return Add(entity);
            });
        }

        public virtual int Update(TEntity entity)
        {
            int result = 0;
            try
            {
                TEntity original = _context.Set<TEntity>().FirstOrDefault(e => e.Id == entity.Id);
                entity.ModifiedOn = GetLocalNow();
                _context.Entry(original).CurrentValues.SetValues(entity);

                result = _context.SaveChanges();
                return result;
            }
            catch (Exception e)
            {
                throw e;
            }
          
        }

        public virtual async Task<int> UpdateAsync(TEntity entity)
        {
            return await Task.Factory.StartNew(() =>
            {
                return Update(entity);
            });
        }

        public virtual int AddOrUpdate(TEntity entity)
        {
            if (entity.Id > 0 && !string.IsNullOrEmpty(entity.RowGuid))
            {
                return Update(entity);
            }
            else
            {
                return Add(entity).Id;
            }

        }

        public virtual async Task<int> AddOrUpdateAsync(TEntity entity)
        {
            return await Task.Factory.StartNew(() =>
            {
                if (entity.Id > 0 && !string.IsNullOrEmpty(entity.RowGuid))
                {
                    return Update(entity);
                }
                else
                {
                    return Add(entity).Id;
                }

            });
        }

        public virtual int Deactivate(TEntity entity)
        {
            entity.IsActive = false;
            entity.ModifiedOn = GetLocalNow();
            return Update(entity);
        }

        public virtual async Task<int> DeactivateAsync(TEntity entity)
        {
            return await Task.Factory.StartNew(() =>
            {
                entity.IsActive = false;
                entity.ModifiedOn = GetLocalNow();
                return Update(entity);
            });

        }

        public virtual int Delete(TEntity entity)
        {
            entity.IsActive = false;
            entity.IsRemoved = true;
            entity.ModifiedOn = GetLocalNow();
            return Update(entity);
        }

        public virtual int Restore(TEntity entity)
        {
            entity.IsActive = true;
            entity.IsRemoved = false;
            entity.ModifiedOn = GetLocalNow();
            return Update(entity);
        }

        public virtual async Task<int> DeleteAsync(TEntity entity)
        {
            return await Task.Factory.StartNew(() =>
            {
                entity.IsActive = false;
                entity.IsRemoved = true;
                entity.ModifiedOn = GetLocalNow();
                return Update(entity);
            });

        }

        public virtual async Task<int> RestoreAsync(TEntity entity)
        {
            return await Task.Factory.StartNew(() =>
            {
                entity.IsActive = true;
                entity.IsRemoved = false;
                entity.ModifiedOn = GetLocalNow();
                return Update(entity);
            });

        }

        public virtual TEntity DeletePermanent(TEntity entity)
        {
            var result = _context.Set<TEntity>().Remove(entity);
            _context.SaveChanges();
            return result.Entity;
        }

        public virtual async Task<TEntity> DeletePermanentAsync(TEntity entity)
        {
            return await Task.Run(() => DeletePermanent(entity));
        }

        public virtual TEntity GetById(int id)
        {
            return _context.Set<TEntity>().FirstOrDefault(e => e.Id == id);
        }

        public virtual async Task<TEntity> GetByIdAsync(int id)
        {
            return await Task.Factory.StartNew(() =>
            {
                return _context.Set<TEntity>().FirstOrDefault(e => e.Id == id);
            });
        }

        public virtual TEntity GetByGuid(string rowguid)
        {
            return _context.Set<TEntity>().FirstOrDefault(e => e.RowGuid == rowguid);
        }

        public virtual async Task<TEntity> GetByGuidAsync(string rowguid)
        {
            return await Task.Factory.StartNew(() =>
            {
                return _context.Set<TEntity>().FirstOrDefault(e => e.RowGuid == rowguid);
            });

        }

        public virtual TEntity GetByGuid(Guid rowguid)
        {
            return _context.Set<TEntity>().FirstOrDefault(e => e.RowGuid == rowguid.ToString());
        }

        public virtual async Task<TEntity> GetByGuidAsync(Guid rowguid)
        {
            return await Task.Factory.StartNew(() =>
            {
                return _context.Set<TEntity>().FirstOrDefault(e => e.RowGuid == rowguid.ToString());
            });

        }

        public virtual TEntity Find(params object[] keys)
        {
            return _context.Set<TEntity>().Find(keys);
        }

        public virtual async Task<TEntity> FindAsync(params object[] keys)
        {
            return await Task.Factory.StartNew(() =>
            {
                return _context.Set<TEntity>().Find(keys);
            });
        }

        public virtual void Dispose()
        {
            if (_context != null)
                _context.Dispose();
        }
    }
}
