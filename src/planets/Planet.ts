import { Texture } from "@pixi/core";
import { Container } from "@pixi/display";
import { Graphics } from "@pixi/graphics";
import { Point } from "@pixi/math";
import { SimpleRope } from "@pixi/mesh-extras";
import { Text } from "@pixi/text";

export class Planet {
    public readonly container: Container;
    public readonly graphics: Graphics;
    public readonly text: Text;
    private _acceleration: Point = new Point(0, 0);
    private _history: Point[];
    public rope: SimpleRope;
    private _count = 0;

    constructor(
        public readonly name: string,
        public readonly mass: number,
        public readonly size: number = 10,
        public position: Point = new Point(0, 0),
        public velocity: Point = new Point(0, 0),
        public readonly color: number = 0xffffff
    ) {
        this.container = new Container();
        this.graphics = new Graphics();
        this.text = new Text(name, { fill: 0xffffff, fontSize: 16, align: "center" });
        this.container.addChild(this.graphics, this.text);
        this.container.setTransform(this.position.x, this.position.y);
        this._history = Array.from(Array(1000)).map(() => this.position.clone());

        this.rope = new SimpleRope(Texture.WHITE, this._history, 0.01 * this.size);
        this.rope.tint = this.color;
        this.rope.alpha = 0.5;

        // render rules
        this.render();
    }

    render() {
        this.text.setTransform(-this.size/2, this.size);
        this.graphics
            .beginFill(this.color)
            .drawCircle(0, 0, this.size / 2)
            .endFill();
    }

    update(delta: number, root: Container) {
        this._count += delta;

        if (this._count > 5) {
            this._count = 0;
            const savePos = this._history.shift();
            if (savePos) {
                savePos.set(
                    this.position.x,
                    this.position.y,
                );
                this._history.push(savePos);
            }
        }
        

        this.velocity.set(
            this.velocity.x + this._acceleration.x,
            this.velocity.y + this._acceleration.y
        );

        this.position.set(
            this.position.x + this.velocity.x,
            this.position.y + this.velocity.y
        );

        this.container.setTransform(this.position.x, this.position.y);

        this.text.style.fontSize = 16 / root.scale.x;
    }

    public setAcceleration(x: number, y: number) {
        this._acceleration.set(x, y);
    }
}
