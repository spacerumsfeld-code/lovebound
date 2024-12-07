import { atom } from 'jotai'

export enum ModalType {
    None,
    StoryCreated,
    EReader,
    ConfirmCreate,
    ConfirmTopup,
    ConfirmSubscription,
}

export const modalAtom = atom<ModalType>(ModalType.None)
