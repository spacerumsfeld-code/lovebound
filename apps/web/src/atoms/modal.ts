import { atom } from 'jotai'

export enum ModalType {
    None,
    StoryCreated,
}

export const modalAtom = atom<ModalType>(ModalType.None)
