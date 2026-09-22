import urllib.request, json

candidates = [
    'File:TW3K_Zheng_Jiang-angry.png',
    'File:TW3K_Zheng_Jiang-norm.png',
    'File:TW3K_Zheng_Jiang-happy.png',
    'File:TW3K_Yan_Baihu.png',
    'File:TW3K_Huang_Shao.png',
    'File:TW3K_Gong_Du.png',
    'File:TW3K_He_Yi.png'
]

pipe_titles = '|'.join(candidates)
url = f'https://totalwar.fandom.com/api.php?action=query&titles={urllib.parse.quote(pipe_titles)}&prop=imageinfo&iiprop=url&format=json'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})

try:
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode())
        for pid, pinfo in data['query']['pages'].items():
            if 'imageinfo' in pinfo:
                print(pinfo['title'], '-->', pinfo['imageinfo'][0]['url'])
except Exception as e:
    print('Error:', e)
