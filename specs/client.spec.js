import {logIn} from "../helpers/general-helper";

describe('Client', () => {
    before(async () => {
         await logIn(process.env.EMAIL, process.env.PASSWORD)
    })

    it('Create client', async () => {
        await
    });
});