import { Storage } from '@capacitor/storage';

export class StorageService<T> implements Setter<T>, Getter<T>, Remover {

    public async set(key: string, value: T): Promise<void> {
        await Storage.set({
            key,
            value: JSON.stringify(value),
        })
    }

    public async get(key: string): Promise<T> {
        const item = await Storage.get({ key })
        return JSON.parse(item.value)
    }

    public async remove(key: string): Promise<void> {
        await Storage.remove({
            key,
        })
    }
}

export type StorageServiceCreator = new <T>() => StorageService<T>



interface Setter<T> {
    set: (key: string, value: T) => Promise<void>
}

interface Getter<T> {
    get: (key: string) => Promise<T>
}

interface Remover {
    remove: (key: string) => Promise<void>
}
