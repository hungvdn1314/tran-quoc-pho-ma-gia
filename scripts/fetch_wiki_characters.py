import urllib.request, json

url = 'https://totalwar.fandom.com/api.php?action=query&list=categorymembers&cmtitle=Category:Character_portraits_(Total_War:_Three_Kingdoms)&cmlimit=100&cmcontinue=file%7C5457334b204845524f20706f727472616974207a68616e672068652e706e67%7C105574&format=json'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})

try:
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode())
        members = data['query']['categorymembers']
        print(f"Found next {len(members)} portrait files:")
        for m in members:
            print(m['title'])
except Exception as e:
    print('Error:', e)
