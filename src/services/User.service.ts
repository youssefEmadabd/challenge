import { IUser } from "../types";
import Service from "./Service";

export default class TalentService extends Service<IUser> {

    async isUsernameUnique(username: string): Promise<boolean> {
        const Model = this.model;
        const user = await Model.findOne({ username });
        if (user) {
            return true;
        }
        return false;
    }

}