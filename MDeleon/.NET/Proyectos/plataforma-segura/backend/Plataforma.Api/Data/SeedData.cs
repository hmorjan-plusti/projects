using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Plataforma.Api.Models;

namespace Plataforma.Api.Data
{
    public static class SeedData
    {
        public static async Task EnsureSeeded(IServiceProvider sp)
        {
            var userMgr = sp.GetRequiredService<UserManager<ApplicationUser>>();
            var roleMgr = sp.GetRequiredService<RoleManager<IdentityRole>>();

            if (!await roleMgr.RoleExistsAsync("admin")) await roleMgr.CreateAsync(new IdentityRole("admin"));
            if (!await roleMgr.RoleExistsAsync("user")) await roleMgr.CreateAsync(new IdentityRole("user"));

            var admin = await userMgr.FindByEmailAsync("admin@local");
            if (admin == null)
            {
                admin = new ApplicationUser { UserName = "admin@local", Email = "admin@local", EmailConfirmed = true, DisplayName = "Administrator" };
                await userMgr.CreateAsync(admin, "Admin1234!");
                await userMgr.AddToRoleAsync(admin, "admin");
            }
        }
    }
}
