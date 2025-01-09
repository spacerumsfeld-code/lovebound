import { atom } from 'jotai'

export enum ModalType {
    None,
    StoryCreated,
    EReader,
    ConfirmCreate,
    ConfirmTopup,
    ConfirmSubscription,
    ConfirmShopPurchase,
}

export const modalAtom = atom<ModalType>(ModalType.None)
