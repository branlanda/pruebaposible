using StudentAPI.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer(); // Para Swagger
builder.Services.AddSwaggerGen();           // Para Swagger
// builder.Services.AddOpenApi(); // Eliminado porque no es necesario ni válido

// Registrar el DbContext para SQL Server
builder.Services.AddDbContext<StudentDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();      // Swagger JSON
    app.UseSwaggerUI();    // Swagger UI
    // app.MapOpenApi();    // Opcional, solo si tienes Minimal APIs
}

app.UseHttpsRedirection();

// Use CORS
app.UseCors("AllowAngularApp");

app.MapControllers();

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
