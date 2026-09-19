import sqlite3
import sys

sys.stdout.reconfigure(encoding='utf-8')
conn = sqlite3.connect('data/crawler_state.db')
cur = conn.cursor()
cur.execute("SELECT COUNT(*) FROM queue WHERE status = 'completed'")
completed = cur.fetchone()[0]
cur.execute("SELECT COUNT(*) FROM queue WHERE status = 'failed'")
failed = cur.fetchone()[0]
cur.execute("SELECT COUNT(*) FROM queue WHERE status = 'pending'")
pending = cur.fetchone()[0]

print(f"Status: Completed={completed}, Failed={failed}, Pending={pending} (Total=1509, {completed/1509*100:.1f}%)")

cur.execute("SELECT chapter_num, title, word_count FROM queue WHERE status = 'completed' ORDER BY chapter_num DESC LIMIT 5")
rows = cur.fetchall()
if rows:
    print("Latest completed:")
    for r in rows:
        print(f"  Ch.{r[0]}: {r[1]} ({r[2]} words)")

if failed > 0:
    cur.execute("SELECT chapter_num, error FROM queue WHERE status = 'failed' LIMIT 3")
    print("Sample errors:")
    for r in cur.fetchall():
        print(f"  Ch.{r[0]}: {r[1]}")
conn.close()
