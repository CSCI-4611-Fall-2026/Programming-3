/* Programming 3
 * CSCI 4611, Fall 2026, University of Minnesota
 * Instructor: Evan Suma Rosenberg <suma@umn.edu>
 * License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 */ 

import * as gfx from 'gophergfx'

export class App extends gfx.GfxApp
{
    // The graphics primitives that define objects in the scene 
    private ship: gfx.Mesh2;

    private mousePosition: gfx.Vector2;

    // --- Create the App class ---
    constructor()
    {
        // Initialize the base class gfx.GfxApp
        super();

        this.ship = gfx.Geometry2Factory.createRectangle();

        this.mousePosition = new gfx.Vector2();

        // Set the viewport to crop the scene to fit the window while maintaining aspect ratio
        this.renderer.viewport = gfx.Viewport.CROP;
    }


    // --- Initialize the graphics scene ---
    createScene(): void 
    {
        // Set the ship's initial position and scale
        this.ship.position.set(0, 0);
        this.ship.scale.set(0.08, 0.08);

        // Load the textures for the ship and star
        this.ship.material.texture = new gfx.Texture('./ship.png');

        this.scene.add(this.ship);
    }

    
    // --- Update is called once each frame by the main graphics loop ---
    update(deltaTime: number): void 
    {
        const shipSpeed = 0.5; // normalized device units / sec

        if(this.ship.position.distanceTo(this.mousePosition) > 0.01) {
            this.ship.lookAt(this.mousePosition);

            const moveDirection = new gfx.Vector2(0, shipSpeed * deltaTime);
            moveDirection.rotate(this.ship.rotation);
            this.ship.position.add(moveDirection);
        }
    }


    /**
     * Method called when the mouse is clicked. Subclasses can override this method to handle the event.
     * 
     * @param event - The MouseEvent object associated with the mouse click
     */
    onMouseDown(event: MouseEvent): void {
        this.mousePosition = this.getNormalizedDeviceCoordinates(event.x, event.y);
    }
}