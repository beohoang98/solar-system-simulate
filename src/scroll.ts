import { Container } from "@pixi/display";

export function addScroll(container: Container) {
    return function (ev: Event) {
        const { deltaY, clientX, clientY } = ev as WheelEvent;
        const { scale: { x : oldScale }, position: { x, y } } = container.transform;
        const scaleFactor = Math.pow(1.1, -deltaY / 125);
        const scale = oldScale * scaleFactor;
        const moveX = (clientX / oldScale - x) * scale * (1 - scaleFactor);
        const moveY = (clientY / oldScale - y) * scale * (1 - scaleFactor);
        container.setTransform(x + moveX, y + moveY, scale, scale);
    };
}
