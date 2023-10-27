import sys
from bs4 import BeautifulSoup
import asyncio
import aiohttp

state = sys.argv[1]
page = sys.argv[2]
date = sys.argv[3]

base = f"https://www.eventbrite.com/d/united-states--{state}/all-events/?page={page}&end_date=2{date}&start_date={date}"
urls = [f"{base}{i}" for i in range(1, int(page)+1)]


async def fetch(session, url):
    async with session.get(url) as response:
        if response.status != 200:
            response.raise_for_status()
        return await response.text()


async def fetch_all(session, urls):
    tasks = []
    for url in urls:
        task = asyncio.create_task(fetch(session, url))
        tasks.append(task)
    results = await asyncio.gather(*tasks)
    return results


async def main():
    events = set()

    async with aiohttp.ClientSession() as session:
        htmls = await fetch_all(session, urls)
        for html in htmls:
            soup = BeautifulSoup(html, 'html.parser')
            results = soup.find_all("a", {"class": "event-card-link"})
            for result in results:
                events.add(result['data-event-id'])
        return events


eventIDs = asyncio.run(main())
eventIDstr = ','.join(eventIDs)
sys.stdout.write(eventIDstr)
