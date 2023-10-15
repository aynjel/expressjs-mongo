import { Request, Response, NextFunction } from 'express';
import { TSketch } from '../types/Types';
import Sketch from '../models/Sketch';

export class SketchController {
    public index(req: Request, res: Response, next: NextFunction) {
        Sketch.find()
            .then((sketchs: TSketch[]) => res.json({ sketchs }))
            .catch((error: Error) => res.status(500).json({ error }));
    }

    public show(req: Request, res: Response, next: NextFunction) {
        const id: string = req.params.id;
        Sketch.findById(id)
            .then((sketch: TSketch | any) => res.json({ sketch }))
            .catch((error: Error) => res.status(500).json({ error }));
    }

    public create(req: Request, res: Response, next: NextFunction) {
        const sketch: TSketch = req.body;
        Sketch.create(sketch)
            .then((sketch: TSketch) => res.status(201).json({ sketch }))
            .catch((error: Error) => res.status(500).json({ error }));
    }

    public update(req: Request, res: Response, next: NextFunction) {
        const sketchData: TSketch = req.body;
        Sketch.findByIdAndUpdate(req.params.id, sketchData)
            .then((sketch: TSketch | any) => res.json({ sketch }))
            .catch((error: Error) => res.status(500).json({ error }));
    }

    public destroy(req: Request, res: Response, next: NextFunction) {
        Sketch.findByIdAndRemove(req.params.id)
            .then((sketch: TSketch | any) => res.json({ sketch }))
            .catch((error: Error) => res.status(500).json({ error }));
    }
}
