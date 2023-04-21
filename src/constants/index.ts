import {ReasonReport} from '../entities/DataType';

export const DEFAULT_USER_AVATAR = 'https://storage.googleapis.com/fjob-dev/default-avatar.png';
export * from './colors';
export const ElementsText = {
    AUTOPLAY: 'AutoPlay',
};

export const PostType = {
    ALL: 2,
    POST: 0,
    SEARCH: 1
}
export const PostStatus = {
    Posted: 0,
    Hided: 1
}
export const PostTypes = [
    {
        id: PostType.ALL,
        name: 'Tất cả',
    },
    {
        id: PostType.POST,
        name: 'Cho thuê',
    },
    {
        id: PostType.SEARCH,
        name: 'Tìm phòng',
    },
]

export const reasonReport: ReasonReport[] = [
    {
        id: 0,
        reason: 'Lừa đảo',
    },
    {
        id: 1,
        reason: 'Không thân thiện',
    },
    {
        id: 2,
        reason: 'Thông tin sai sự thật',
    },
    {
        id: 3,
        reason: 'Thông tin nhạy cảm',
    },
    {
        id: 4,
        reason: 'Vấn đề khác',
    },
]
export const OtherReason = 4

export const GenderType = [
    {
        id: 0,
        name: 'Khác'
    },
    {
        id: 1,
        name: 'Nam'
    },
    {
        id: 2,
        name: 'Nữ'
    },
]