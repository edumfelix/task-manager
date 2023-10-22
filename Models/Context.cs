using Microsoft.EntityFrameworkCore;

namespace TaskManager.Models
{
    public class Context : DbContext
    {
        public DbSet<Task> Tasks { get; set; }
        public Context(DbContextOptions<Context> options) : base(options)
        {

        }
    }
}
