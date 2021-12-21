import { Application } from "pixi.js";
import { Scene } from "./scene";
import { addScroll } from "./scroll";

const app = new Application({
    antialias: true,
    backgroundColor: 0,
    resizeTo: document.body,
    clearBeforeRender: true,
    autoDensity: true,
});

document.body.appendChild(app.view);

app.resize();

Scene(app);

app.view.addEventListener("mousewheel", addScroll(app.stage));

document.body.addEventListener("keydown", (ev: KeyboardEvent) => {
    switch (ev.key) {
        case "ArrowLeft":
        case "a":
            app.stage.transform.position.x += 125;
            break;
        case "ArrowRight":
        case "d":
            app.stage.transform.position.x -= 125;
            break;
        case "ArrowUp":
        case "w":
            app.stage.transform.position.y += 125;
            break;
        case "ArrowDown":
        case "s":
            app.stage.transform.position.y -= 125;
            break;
        default:
            break;
    }
});

app.start();
