# Room Portfolio — Sagar Kumar

An interactive 3D portfolio set inside a recreation of my room. Instead of a conventional résumé page, it lets visitors step into the space and discover my work, projects, and story through the objects in it.

This is my own version of my room, built by me and inspired by the interactive 3D portfolios below.

---

## Overview

The site presents a single, hand-modeled room rendered in real time in the browser. Visitors can orbit the scene, switch between day and night, and click on objects to open detailed panels:

- **The Box** — *About Me*
- **The Trophy** — *Achievements*
- **The Laptop** — *Experience & Projects*
- **The Books** — *Education*
- **The Rocket & Plane** — *Builds and Hobbies*
- **The Bulletin Board** — *Research*
- **Wall tiles** — links to my GitHub and LinkedIn

---

## How It Works

The project pairs offline rendering quality with real-time web performance:

1. **Modeling & lighting (Blender).** The room — furniture, props, curtains, string lights, grass surround — is modeled in Blender, with lighting computed in the Cycles renderer for a soft, photoreal look.
2. **Texture baking.** The Cycles lighting is *baked* into texture atlases instead of being computed live. Separate day and night atlases are baked for every surface so the scene can crossfade between the two moods.
3. **Real-time display (Three.js).** The browser loads a lightweight `.glb` model and shows the baked atlases through custom shaders. Because the lighting is pre-baked, it renders smoothly on most devices while keeping the rendered look.
4. **Interaction layer.** A raycaster drives hover highlights, themed tooltips, and click-to-open panels, alongside an animated intro camera, an eased day/night transition, drifting night-time fireflies, spring-based grass sway, and a click-to-enlarge lightbox for panel cards.

### Tech Stack
- **[Three.js](https://threejs.org/)** — real-time WebGL rendering
- **[Blender](https://www.blender.org/)** — modeling and Cycles lighting, baked to texture atlases
- **Vanilla HTML / CSS / JavaScript** — no build step required

---


Then open **http://localhost:8000**. Use the sun/moon button (top-right) to toggle day and night, drag to orbit, scroll to zoom, and click objects to explore.

---

## Inspiration & Credits

Built by me, inspired by:

- [sooahs-room-folio.com](https://www.sooahs-room-folio.com/) — for the concept of an explorable, isometric "room" portfolio
- the wider community of interactive 3D portfolios that explore the browser as a creative space

Made with [Three.js](https://threejs.org/) and [Blender](https://www.blender.org/).
