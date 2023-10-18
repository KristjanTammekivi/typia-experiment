import { testType } from 'typia-typetest';

interface SomeType {
    a: string;
    b: number;
}

testType<SomeType>({ a: 'a', b: 1 });