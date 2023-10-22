using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using TaskManager.Models;

namespace TaskManager.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly Context _context;
        public TasksController(Context context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Models.Task>>> GetAllAsync()
        {
            return await _context.Tasks.ToListAsync();
        }

        [HttpGet("{Id}")]
        public async Task<ActionResult<Models.Task>> GetTasksByIdAsync(int Id)
        {
            Models.Task? task = await _context.Tasks.FindAsync(Id);
            if (task == null)
                return NotFound();

            return Ok(task);
        }

        [HttpPost]
        public async Task<ActionResult<Models.Task>> SaveTaskAsync(Models.Task task)
        {
            await _context.Tasks.AddAsync(task);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> UpdateTaskAsync(Models.Task task)
        {
            _context.Tasks.Update(task);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{Id}")]
        public async Task<ActionResult> DeleteTaskAsync(int Id)
        {
            Models.Task? task = await _context.Tasks.FindAsync(Id);
            if (task == null)
                return NotFound();
            _context.Remove(task);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
