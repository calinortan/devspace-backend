import { DocumentModel, IDocument } from '../models/Document';
import { Router, Request, Response, NextFunction } from 'express';
import { ModelFindByIdAndUpdateOptions } from 'mongoose'

class DocumentsController {

  public getDocumentsForUser(req: Request, res: Response, next: NextFunction) {
    const userId = req.query.user;
    if (userId == null) return res.status(404).json({ message: 'Missing user id' });

    const query = {
      user: userId
    }

    DocumentModel.find(query)
      .populate({
        path: 'user',
        select: 'name avatar'
      })
      .then((docs) => {
        if (docs == null) return res.status(404);
        res.status(200).json({ documents: docs });
      })
      .catch(err => res.status(400).json({ message: err.message }));
  }
  public addNewDocument(req: Request, res: Response, next: NextFunction) {
    const doc = <IDocument>req.body;
    const docModel = new DocumentModel(doc);
    docModel.save()
      .then((document) => {
        res.status(200).json({ status: `new Post created at ${document.createdAt}`, document });
      })
      .catch((err) => res.status(400).send({ error: err.message, }))
  }
}

export default DocumentsController