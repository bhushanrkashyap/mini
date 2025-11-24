# AlgoSphere

An interactive web application for visualizing data structures and algorithms using Django and D3.js.

## Features

- **7 Interactive Visualizers**:
  - Arrays (5 sorting algorithms: Bubble, Selection, Insertion, Merge, Quick Sort)
  - Stacks (Push, Pop, Peek, Clear)
  - Queues (Enqueue, Dequeue, Peek, Clear)
  - Linked Lists (Insert, Delete, Search, Reverse)
  - Trees (Binary Tree visualization)
  - Graphs (BFS, DFS traversal)
  - Algorithm Comparison (Side-by-side performance comparison)

- **Real-time animations** with D3.js
- **Performance metrics** (execution time + operation counting)
- **Speed controls** for animations
- **Responsive design** with Tailwind CSS

## Quick Start

1. **Install dependencies**:
```bash
pip install -r requirements.txt
```

2. **Run the development server**:
```bash
python3 manage.py runserver
```

3. **Open in browser**:
```
http://127.0.0.1:8000/algosphere/
```

## Tech Stack

- **Backend**: Django 5.2
- **Frontend**: Tailwind CSS + D3.js v7.8.5
- **Database**: SQLite
- **Fonts**: Google Fonts (Inter)

## Project Structure

```
mini/
├── algosphere/
│   └── apps/algosphere/     # Django app
├── templates/algosphere/     # HTML templates
├── static/
│   ├── css/                  # Stylesheets
│   └── js/                   # D3.js visualizations
└── manage.py
```

## Notes

- No authentication required - direct access to all visualizers
- All animations use D3.js transitions for smooth visual effects
- Comparison page measures actual algorithm execution time independently of animation speed
