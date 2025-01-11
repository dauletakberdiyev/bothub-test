interface User {
    id: number;
    email: string;
    password: string;
    avatar: string;
}

type UserWithoutPassword = Omit<User, 'password'>;