import requests
import sys
from lxml import html

sys.stdout.reconfigure(encoding='utf-8')

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

url = 'https://www.tvtruyen.live/tran-quoc-pho-ma-gia/chuong-1'
res = requests.get(url, headers=headers, timeout=15)
print('Status:', res.status_code)
print('Length:', len(res.text))

tree = html.fromstring(res.text)
titles = tree.xpath('//h1//text() | //h2//text()')
print('Titles:', [t.strip() for t in titles if t.strip()][:3])

# Check content selectors
content_nodes = tree.xpath('//div[contains(@class, "chapter-content")]//text() | //div[@id="chapter-content"]//text() | //div[contains(@class, "content-story")]//text() | //div[contains(@class, "box-content")]//text() | //div[@class="content"]//text()')
if not content_nodes:
    content_nodes = tree.xpath('//div[contains(@id, "content")]//text()')

text = '\n'.join([c.strip() for c in content_nodes if c.strip()])
print(f'Extracted text length: {len(text)}')
print('Preview:')
print(text[:400])
