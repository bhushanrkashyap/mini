# AlgoSphere (Django)

This workspace contains a small Django project that serves the AlgoSphere visualizers.

How to run

1. Create a virtualenv and install dependencies:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

2. Run migrations and start the server:

```bash
python manage.py migrate
python manage.py runserver 127.0.0.1:8000
```

Open http://127.0.0.1:8000/algosphere/ in your browser.

Notes
- Templates are under `templates/algosphere/` and use TailwindCSS + D3 via CDN.
- Trees and Graphs pages are placeholders; Arrays, Stacks, Queues and Comparison provide working visualizers.
# mini
