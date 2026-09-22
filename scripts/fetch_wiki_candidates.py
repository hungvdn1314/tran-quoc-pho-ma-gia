import urllib.request, json

candidates = [
    'File:TW3K Liu Hong.png',
    'File:TW3K Kong Rong-final.png',
    'File:TW3K Li Ru.png',
    'File:TW3K Liu Biao-final.png',
    'File:TW3K Chen Gong.png',
    'File:TW3K Da Qiao-norm.png',
    'File:TW3K Diaochan-norm.png',
    'File:TW3K Lady Mi-norm.png',
    'File:TW3K Lady Bian.png',
    'File:TW3K Yu Jin.png',
    'File:TW3K Huangfu Song.png',
    'File:TW3K Gao Shun.png',
    'File:TW3K Jia Xu.png'
]

pipe_titles = '|'.join(candidates)
url = f'https://totalwar.fandom.com/api.php?action=query&titles={urllib.parse.quote(pipe_titles)}&prop=imageinfo&iiprop=url&format=json'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})

try:
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode())
        pages = data['query']['pages']
        results = {}
        for pid, pinfo in pages.items():
            title = pinfo.get('title')
            if 'imageinfo' in pinfo:
                img_url = pinfo['imageinfo'][0]['url']
                results[title] = img_url
                print(f"FOUND: {title} -> {img_url}")
            else:
                print(f"NOT FOUND: {title}")
        
        with open('scripts/character_urls.json', 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=2)
except Exception as e:
    print('Error:', e)
