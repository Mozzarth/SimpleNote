import { IDeleteNotebookRepository } from '../domain/deleteNotebookRepository';
import { IFindNoteBookRepository } from '../../find/domain/findNotebook';
import { Uuid } from './../../../shared/domain/value-object/Uuid';
import { IGuardAPP } from '../../../shared/domain/IGuardApp';
import { IDeleteNotebookDto } from './deleteNotebookDto';

export class DeleteNotebookUseCase {
  constructor(
    private deleteNotebook: IDeleteNotebookRepository,
    private findNotebook: IFindNoteBookRepository,
    private guardAppJwt: IGuardAPP
  ) {}

  async handle(params: IDeleteNotebookDto): Promise<void> {
    try {
      const idUser = await this.guardAppJwt.getDecodedKey(params.key);
      const idNotebook = new Uuid(params.idNotebook);
      const notebook = await this.findNotebook.byIdNotebook(idUser, idNotebook);
      if (notebook == undefined) {
        throw new Error('This Notebook not exists');
      }
      return this.deleteNotebook.delete(idNotebook);
    } catch (error) {
      throw error;
    }
  }
}
