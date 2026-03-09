declare module "three-story-controls" {
    export class CameraRig {
        constructor(camera: any, scene: any);
        setAnimationClip(clip: any): void;
        disassemble(): void;
        update(): void;
        setAnimationPercentage(percentage: number): void;
        setAnimationTime(time: number): void;
    }
    export class ScrollControls {
        constructor(rig: any, options?: any);
        enable(): void;
        disable(): void;
        update(): void;
    }
    export class ThreeDOFControls {
        constructor(rig: any, options?: any);
        enable(): void;
        disable(): void;
        update(): void;
    }
}
