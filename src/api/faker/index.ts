import { faker } from '@faker-js/faker';

// faker.setLocale('zh_CN');
// faker.locale = 'zh_CN';

export const users: Person[] = [];

export function createUser(): Person {
  return {
    name: faker.internet.userName(),
    gender: faker.helpers.arrayElement(['男', '女']),
    // age: faker.random.numeric(),
    age: Math.ceil(Math.random() * 100),
    avatar: faker.image.avatar(),
  };
}

Array.from({ length: 10 }).forEach(() => {
  users.push(createUser());
});
