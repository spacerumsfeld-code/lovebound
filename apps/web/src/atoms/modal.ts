import { atom } from 'jotai'

export enum ModalType {
    None,
    StoryCreated,
    EReader,
}

export const modalAtom = atom<ModalType>(ModalType.None)
