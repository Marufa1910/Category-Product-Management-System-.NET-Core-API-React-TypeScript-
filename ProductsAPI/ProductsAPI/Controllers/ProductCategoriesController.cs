using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductsAPI.Data;
using ProductsAPI.Models;
namespace ProductsAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProductCategoriesController : ControllerBase
    {
        private readonly ProductsAPIContext _context;
        public ProductCategoriesController(ProductsAPIContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductCategory>>> GetProductCategory()
        {
            return await _context.ProductCategory.Include(pc => pc.Products).ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductCategory>> GetProductCategory(int id)
        {
            var productCategory = await _context.ProductCategory.Include(pc => pc.Products).SingleAsync(pc => pc.ProductCategoryID == id);
            if (productCategory == null) { return NotFound(); }
            return productCategory;
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductCategory(int id, ProductCategory productCategory)
        {
            if (id != productCategory.ProductCategoryID)
            {
                return BadRequest();
            }
            var existingProductCategory = await _context.ProductCategory.Include(pc => pc.Products).SingleOrDefaultAsync(pc => pc.ProductCategoryID == id);
            if (existingProductCategory == null) return NotFound();
            existingProductCategory.Name = productCategory.Name;
            _context.Product.RemoveRange(existingProductCategory.Products);
            foreach (var newProduct in productCategory.Products)
            {
                newProduct.ProductCategoryID = existingProductCategory.ProductCategoryID;
                _context.Product.Add(newProduct);
            }
            await _context.SaveChangesAsync();
            return NoContent();
        }
        [HttpPost]
        public async Task<ActionResult<ProductCategory>> PostProductCategory(ProductCategory productCategory)
        {
            _context.ProductCategory.Add(productCategory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductCategory", new { id = productCategory.ProductCategoryID }, productCategory);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductCategory(int id)
        {
            var productCategory = await _context.ProductCategory.FindAsync(id);
            if (productCategory == null) { return NotFound(); }
            _context.ProductCategory.Remove(productCategory);
            await _context.SaveChangesAsync();
            return NoContent();
        }
       
    }
}
