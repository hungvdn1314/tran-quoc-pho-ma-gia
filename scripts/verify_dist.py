import os
import re

with open('dist/index.html', encoding='utf-8') as f:
    c = f.read()

scripts = re.findall(r'src=["\'](.*?)["\']', c)
links = re.findall(r'href=["\'](.*?)["\']', c)

print("=== VERIFYING SCRIPTS IN dist/index.html ===")
all_ok = True
for s in scripts:
    clean_s = s.split('?')[0].lstrip('/')
    p = os.path.join('dist', clean_s)
    exists = os.path.exists(p)
    print(f"  [{'OK' if exists else 'MISSING'}] {s} -> {p}")
    if not exists:
        all_ok = False

print("\n=== VERIFYING STYLESHEETS IN dist/index.html ===")
for l in links:
    if l.startswith('http'):
        continue
    clean_l = l.split('?')[0].lstrip('/')
    p = os.path.join('dist', clean_l)
    exists = os.path.exists(p)
    print(f"  [{'OK' if exists else 'MISSING'}] {l} -> {p}")
    if not exists:
        all_ok = False

if all_ok:
    print("\n>>> ALL ASSETS, SCRIPTS AND STYLES ARE 100% PRESENT AND RESOLVABLE! <<<")
else:
    print("\n>>> WARNING: SOME ASSETS ARE MISSING! <<<")
