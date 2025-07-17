using Microsoft.AspNetCore.Mvc;
using StudentAPI.Models;
using StudentAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace StudentAPI.Controllers
{
    /// <summary>
    /// Controlador para gestionar estudiantes
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class StudentsController : ControllerBase
    {
        private readonly StudentDbContext _context;

        public StudentsController(StudentDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Obtiene todos los estudiantes
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> GetStudents()
        {
            return await _context.Students.ToListAsync();
        }

        /// <summary>
        /// Obtiene un estudiante por su ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> GetStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null)
                return NotFound($"Estudiante con ID {id} no encontrado");
            return student;
        }

        /// <summary>
        /// Crea un nuevo estudiante
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<Student>> CreateStudent([FromBody] Student student)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Verificar si el email ya existe
            if (await _context.Students.AnyAsync(s => s.Email == student.Email))
                return BadRequest("Ya existe un estudiante con este email");

            _context.Students.Add(student);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetStudent), new { id = student.Id }, student);
        }

        /// <summary>
        /// Actualiza un estudiante existente
        /// </summary>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStudent(int id, [FromBody] Student student)
        {
            if (id != student.Id)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Verificar si el email ya existe en otro estudiante
            if (await _context.Students.AnyAsync(s => s.Id != id && s.Email == student.Email))
                return BadRequest("Ya existe otro estudiante con este email");

            _context.Entry(student).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _context.Students.AnyAsync(e => e.Id == id))
                    return NotFound($"Estudiante con ID {id} no encontrado");
                else
                    throw;
            }
            return Ok(student);
        }

        /// <summary>
        /// Elimina un estudiante
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null)
                return NotFound($"Estudiante con ID {id} no encontrado");

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
} 