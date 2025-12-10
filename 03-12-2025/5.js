const EventEmitter = Base => class extends Base {
    constructor(...args) {
        super(...args);
        this._events = {};
    }

    on(event, handler) {
        if (!this._events[event]) {
            this._events[event] = [];
        }
        this._events[event].push(handler);
    }

    off(event, handler) {
        if (!this._events[event]) return;
        this._events[event] = this._events[event].filter(h => h !== handler);
    }

    emit(event, data) {
        if (!this._events[event]) return;
        for (const handler of this._events[event]) {
            handler(data);
        }
    }
};


class BaseGame {}

class GameEngine extends EventEmitter(BaseGame) {
    start() {
        console.log("Game started!");
        this.emit("start", { time: Date.now() });
    }

    update() {
        let tick = 0;
        const interval = setInterval(() => {
            tick++;
            this.emit("update", { tick });

            if (tick === 3) {
                clearInterval(interval);
                console.log("Game stopped.");
            }
        }, 1000);
    }
}
