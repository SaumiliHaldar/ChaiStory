# Research Notes: Mike Murphy Storytelling Website Analysis

An analysis of the storytelling and interaction design on [mike-murphy.webflow.io](https://mike-murphy.webflow.io/). This site serves as a high-end reference for the "Case 17 — The Vanishing Archivist" project.

## Key Observations

### 1. Immersive Entry Experience
The site starts with a pitch-black screen and a single "Click to Enter" button. This serves two purposes:
- **Narrative Hook:** It forces the user to actively "step into" the story.
- **Technical Initialization:** It allows the browser to initialize audio and complex animations that might be blocked by autoplay policies.

### 2. Multi-Layered Parallax (Pseudo-3D)
The site creates extreme depth through layering:
- **Foreground:** Blurred elements (rocks, foliage) that move much faster than the scroll speed.
- **Midground:** Main content and high-quality assets (e.g., Gollum, Hogwarts castle).
- **Background:** Ghostly, large-scale typography (e.g., "LORD OF THE RINGS") that moves very slowly.

> [!TIP]
> **Application for Case 17:** Use blurred "foreground" evidence (like a magnifying glass or floating dust particles) to create depth in the Detective's Office.

### 3. Cinematic Aesthetic
- **Color Palette:** Deep navy, charcoal, and black with subtle gold/cream highlights. This aligns perfectly with the "Noir" aesthetic requested for Case 17.
- **Lighting:** Vignetted edges and "glow" effects around key elements draw the eye to the center of the story.
- **Typography:** Sophisticated serif fonts for titles (Storyteller vibe) and high-legibility sans-serif for secondary information.

### 4. Continuous Narrative Flow
The scroll doesn't just move page sections; it moves the "camera." Transitions between chapters (e.g., from the castle entrance to specific film projects) feel like cinematic cuts or pans rather than traditional web navigation.

---

## Visual Reference

![Entry Page](file:///C:/Users/redes/.gemini/antigravity/brain/dff72ff6-3d87-4355-886d-019dfdc27cc0/.system_generated/click_feedback/click_feedback_1773751134582.png)
*Figure 1: Minimalist "Entry Gate" for immersion.*

![Hero Section](file:///C:/Users/redes/.gemini/antigravity/brain/dff72ff6-3d87-4355-886d-019dfdc27cc0/.system_generated/click_feedback/click_feedback_1773751194692.png)
*Figure 2: Strong depth and atmospheric lighting in the hero section.*

![Layout Consistency](file:///C:/Users/redes/.gemini/antigravity/brain/dff72ff6-3d87-4355-886d-019dfdc27cc0/.system_generated/click_feedback/click_feedback_1773751255952.png)
*Figure 3: Consistent typography and layout in content sections.*

---

## Recommendations for Case 17
1. **The "Click to Begin" screen:** Implement a similar entry gate to set the mood and handle audio loading.
2. **Foreground Blur:** Add 2-3 layers of blurry SVG or image assets in the foreground to increase the sense of being "in the room."
3. **Scroll Snapping:** Use CSS scroll-snap or GSAP `ScrollTrigger` to create the "section-jumping" but smooth transition feel.
4. **Subtle Audio:** Consider a low-frequency ambient "noir" hum or rain sound that begins upon entry.
