using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using signalRSample.Hubs;
using signalRSample.Models;

namespace signalRSample.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IHubContext<DeathlyHallowsHub> _deathlyHub;

        public HomeController(ILogger<HomeController> logger,IHubContext<DeathlyHallowsHub> deathlyHub)
        {
            _logger = logger;
            _deathlyHub = deathlyHub;
        }

        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> DeathlyHallows(string type)
        {
            if (SD.DeathlyHallowRace.ContainsKey(type)) 
            {
                SD.DeathlyHallowRace[type]++;
            }
            await _deathlyHub.Clients.All.SendAsync("updateDeathlyHallowCount",
                SD.DeathlyHallowRace[SD.Cloak],
                SD.DeathlyHallowRace[SD.Stone],
                SD.DeathlyHallowRace[SD.Wand]
                );
            return Accepted();
        }






        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
