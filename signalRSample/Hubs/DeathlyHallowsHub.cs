using Microsoft.AspNetCore.SignalR;

namespace signalRSample.Hubs
{
    public class DeathlyHallowsHub:Hub
    {
        public Dictionary<string, int> GetRaceStatus() 
        {
            return SD.DeathlyHallowRace;
        }

    }
}
