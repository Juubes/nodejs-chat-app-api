export default class UserHandler {

    public static loadedUsers = {};

    public static loadAllUsers(): void {

    }

    public static userExists(username: string): boolean {
        return (username in this.loadedUsers);
    }

    /**
     * @returns user's session token
     */
    public static register(username: string, passwordHash: string): string {
        return "   ";
    }
}
class User {

}