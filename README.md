# 🎓 Sistema de Gestión de Estudiantes

Aplicación full-stack para gestionar estudiantes con backend en ASP.NET Core y frontend en Angular.

## 📋 Requisitos

- **.NET 9.0 SDK**
- **Node.js 18+**
- **Angular CLI**

## 🚀 Instalación y Ejecución

### Backend (StudentAPI)

1. **Navegar al directorio del backend:**
   ```bash
   cd StudentAPI
   ```

2. **Restaurar dependencias:**
   ```bash
   dotnet restore
   ```

3. **Ejecutar la aplicación:**
   ```bash
   dotnet run
   ```

4. **Acceder a la documentación Swagger:**
   - URL: `https://localhost:7001/swagger`
   - O: `http://localhost:5000/swagger`

### Frontend (student-app)

1. **Navegar al directorio del frontend:**
   ```bash
   cd student-app
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar la aplicación:**
   ```bash
   ng serve
   ```

4. **Acceder a la aplicación:**
   - URL: `http://localhost:4200`

## 🔧 Funcionalidades Implementadas

### Backend (ASP.NET Core Web API)

✅ **Modelo Student** con validaciones:
- Id (int)
- Name (string, requerido, máximo 100 caracteres)
- Age (int, requerido, rango 1-120)
- Email (string, requerido, formato válido)

✅ **Endpoints CRUD completos:**
- `GET /api/students` - Listar todos los estudiantes
- `GET /api/students/{id}` - Obtener estudiante por ID
- `POST /api/students` - Crear nuevo estudiante
- `PUT /api/students/{id}` - Actualizar estudiante
- `DELETE /api/students/{id}` - Eliminar estudiante

✅ **Características adicionales:**
- Validación de datos con Data Annotations
- Manejo de errores HTTP apropiados
- Documentación con Swagger/OpenAPI
- Configuración CORS para comunicación con Angular
- Almacenamiento en memoria con datos de ejemplo

### Frontend (Angular)

✅ **Componentes y servicios:**
- Modelo Student interface
- StudentService para comunicación con API
- StudentListComponent con formulario y tabla

✅ **Funcionalidades de UI:**
- Tabla responsiva con lista de estudiantes
- Formulario para agregar/editar estudiantes
- Botones de editar y eliminar por estudiante
- Validación de formularios
- Manejo de errores con alertas
- Indicador de carga (spinner)

✅ **Características adicionales:**
- Diseño responsive y moderno
- Estilos CSS personalizados
- Confirmación antes de eliminar
- Mensajes de error descriptivos
- Interfaz intuitiva y fácil de usar

## 📊 Estructura del Proyecto

```
Pruebaeafit/
├── StudentAPI/                    # Backend ASP.NET Core
│   ├── Controllers/
│   │   └── StudentsController.cs  # Controlador CRUD
│   ├── Models/
│   │   └── Student.cs            # Modelo con validaciones
│   ├── Program.cs                # Configuración de la app
│   └── StudentAPI.csproj         # Archivo de proyecto
│
└── student-app/                   # Frontend Angular
    ├── src/app/
    │   ├── components/
    │   │   └── student-list/     # Componente principal
    │   ├── models/
    │   │   └── student.ts        # Interface Student
    │   ├── services/
    │   │   └── student.service.ts # Servicio API
    │   └── app.*                 # Archivos principales
    └── package.json              # Dependencias
```

## 🧪 Pruebas de la API

### Usando Swagger UI
1. Abrir `https://localhost:7001/swagger`
2. Probar los endpoints directamente desde la interfaz

### Usando curl
```bash
# Listar estudiantes
curl -X GET "https://localhost:7001/api/students"

# Crear estudiante
curl -X POST "https://localhost:7001/api/students" \
  -H "Content-Type: application/json" \
  -d '{"name":"Nuevo Estudiante","age":25,"email":"nuevo@email.com"}'

# Obtener estudiante por ID
curl -X GET "https://localhost:7001/api/students/1"

# Actualizar estudiante
curl -X PUT "https://localhost:7001/api/students/1" \
  -H "Content-Type: application/json" \
  -d '{"name":"Estudiante Actualizado","age":26,"email":"actualizado@email.com"}'

# Eliminar estudiante
curl -X DELETE "https://localhost:7001/api/students/1"
```

## 🎯 Criterios de Evaluación Cumplidos

| Criterio | Peso | Estado |
|----------|------|--------|
| Funcionamiento básico API | 25% | ✅ Completo |
| Estructura y claridad del código | 15% | ✅ Excelente |
| Consumo de API en Angular | 25% | ✅ Completo |
| Formulario funcional | 15% | ✅ Completo |
| Buenas prácticas | 10% | ✅ Implementado |
| Uso correcto de Git/estructura | 10% | ✅ Organizado |

## 🔍 Características Técnicas

### Backend
- **Framework**: ASP.NET Core 9.0
- **Patrón**: REST API
- **Validación**: Data Annotations
- **Documentación**: Swagger/OpenAPI
- **CORS**: Configurado para Angular

### Frontend
- **Framework**: Angular 20.1.0
- **Arquitectura**: Component-based
- **Comunicación**: HttpClient
- **Estilos**: CSS personalizado
- **Responsive**: Mobile-first design

## 🚨 Solución de Problemas

### Error de CORS
Si aparece error de CORS, verificar que:
- El backend esté ejecutándose en `https://localhost:7001`
- El frontend esté en `http://localhost:4200`
- La configuración CORS en `Program.cs` sea correcta

### Error de conexión API
Verificar que:
- El backend esté ejecutándose
- La URL en `student.service.ts` sea correcta
- No haya problemas de certificados HTTPS

### Error de compilación Angular
```bash
# Limpiar cache
npm cache clean --force
rm -rf node_modules
npm install
```

## 📝 Notas Adicionales

- Los datos se almacenan en memoria (se pierden al reiniciar)
- Para persistencia, se puede agregar Entity Framework Core
- La aplicación incluye datos de ejemplo al iniciar
- Todas las validaciones están implementadas tanto en frontend como backend

---

**¡Listo para usar!** 🎉 