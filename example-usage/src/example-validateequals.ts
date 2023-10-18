import { validateEquals } from 'typia';

interface SomeType {
    a: string;
    b: number;
}

validateEquals<SomeType>({ a: 'a', b: 1 });