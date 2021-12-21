import { Application } from "@pixi/app";
import { Point } from "@pixi/math";
import { Planet } from "./planets/Planet";

const G = 0.1;
const scaleDistance = 20;

export function Scene(app: Application) {
    const { width, height } = app.view;

    const sun = new Planet(
        "Sun",
        332900,
        200,
        new Point(width / 2, height / 2),
        new Point(0, 0),
        0xff8800
    );
    const venus = new Planet(
        "Venus",
        0.815,
        20,
        new Point(width / 2 - 108 * scaleDistance, height / 2),
        new Point(0, 3),
        0xDDFF55
    );
    const earth = new Planet(
        "Earth",
        1,
        20,
        new Point(width / 2 - 149 * scaleDistance, height / 2),
        new Point(0, 3),
        0x55ff55
    );
    const moon = new Planet(
        "Moon",
        0.0123,
        1,
        new Point(width / 2 - (149 + 0.1) * scaleDistance, height / 2),
        new Point(0, 3.2),
        0xFFFFFF
    );
    const mars = new Planet(
        "Mars",
        0.107,
        40,
        new Point(width / 2 - 227 * scaleDistance, height / 2),
        new Point(0, 2.5),
        0xDD5555
    );
    const jupiter = new Planet(
        "Jupiter",
        318,
        200,
        new Point(width / 2 - 778 * scaleDistance, height / 2),
        new Point(0, 2),
        0xCCFF33
    );

    const planets = [sun, earth, moon, venus, mars, jupiter];
    planets.forEach((p) => app.stage.addChild(p.container, p.rope));

    app.ticker.add((delta) => {
        const forces = planets.map(() => [0, 0]);

        // update force
        for (let i = 0; i < planets.length - 1; ++i) {
            for (let j = i + 1; j < planets.length; ++j) {
                const dX = planets[i].position.x - planets[j].position.x;
                const dY = planets[i].position.y - planets[j].position.y;
                const distanceP2 = dX * dX + dY * dY;
                const distance = Math.sqrt(distanceP2);
                const f1 = (G * planets[j].mass) / distanceP2;
                const f2 = (G * planets[i].mass) / distanceP2;
                forces[i] = [
                    forces[i][0] - (f1 * dX) / distance,
                    forces[i][1] - (f1 * dY) / distance,
                ];
                forces[j] = [
                    forces[j][0] + (f2 * dX) / distance,
                    forces[j][1] + (f2 * dY) / distance,
                ];
            }
        }

        // update acceleration
        planets.forEach((p, idx) => {
            p.setAcceleration(forces[idx][0], forces[idx][1]);
        });

        // update velocity
        planets.forEach((p) => p.update(delta, app.stage));
    });
}
