import glob
import re

templates = glob.glob('src/**/*.html', recursive=True)
print(f'Found {len(templates)} templates:')
for t in sorted(templates):
    with open(t, encoding='utf-8') as f:
        c = f.read()
    ids = re.findall(r'id=["\'](.*?)["\']', c)
    print(f'  {t}: {len(c.splitlines())} lines, {len(ids)} IDs: {ids[:6]}')
