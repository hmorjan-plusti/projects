using Moq;
using Xunit;
using ProductApp.API.Controllers;
using ProductApp.API.Models;
using ProductApp.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace ProductApp.Tests
{
    public class ProductControllerTests
    {
        [Fact]
        public void GetById_ProductExists_ReturnsOk()
        {
            // Arrange
            var mock = new Mock<IProductService>();
            mock.Setup(s => s.GetById(1)).Returns(new Product { Id = 1, Name = "Test", Price = 100 });

            var controller = new ProductController(mock.Object);

            // Act
            var result = controller.GetById(1);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var product = Assert.IsType<Product>(okResult.Value);
            Assert.Equal("Test", product.Name);
        }

        [Fact]
        public void GetById_ProductNotFound_ReturnsNotFound()
        {
            var mock = new Mock<IProductService>();
            mock.Setup(s => s.GetById(99)).Returns((Product?)null);

            var controller = new ProductController(mock.Object);
            var result = controller.GetById(99);

            Assert.IsType<NotFoundResult>(result.Result);
        }
    }
}
