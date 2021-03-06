import { UserCookie } from '@/plugins/guetsdk';
import { ClientHolder } from '@/plugins/guetsdk_plugin';
import { db } from '@/db.js';
import * as log from 'loglevel';

const configc = db.collection("config");

const CDOCKEY = "account";

const CDOCTYPE = "t-guet-account-cookie";

const logger = log.getLogger("usersaving.js");

/*
Config structure
{
    key: "account",
    type: "t-guet-account-cookie",
    value: UserCookie.toObject(),
    visible: false,
}
*/
let createAccountCookieDocument = (value) => {
    return {
        key: CDOCKEY,
        type: CDOCTYPE,
        value: value,
        visible: false,
    };
};

ClientHolder.value.on('cookie_set', async client => {
    let accountObj = await configc.findOne({
        key: "account",
        type: 't-guet-account-cookie'
    });
    if (!accountObj) {
        await configc.insert(
            createAccountCookieDocument(client.userCookie.toObject())
        );
    } else {
        await configc.update(
            {
                key: CDOCKEY,
                type: CDOCTYPE
            },
            {
                $set: {
                    value: client.userCookie.toObject()
                }
            }
        );
    }
});


ClientHolder.value.on('cookie_not_found', async client => {
    let doc = await configc.findOne({
        key: CDOCKEY,
        type: CDOCTYPE,
    });
    if (doc) {
        let cookie = UserCookie.fromObject(doc.value);
        client.setUserCookie(cookie);
    } else {
        let cookieKey = localStorage.getItem("cookieKey");
        if (cookieKey) {
            window.console.log("Updating from old version..");
            let cookie = localStorage.getItem("cookie");
            let userCookie = new UserCookie(cookieKey, cookie);
            client.setUserCookie(userCookie);
            ['cookie', 'cookieKey'].map((k) => localStorage.removeItem(k));
        }
    }
});



/*
Config structure
{
    key: "account-rawdata",
    type: "t-guet-account-data",
    value: UserCookie.toObject(),
    visible: false,
}
*/
ClientHolder.value.on('cookie_invalid', async client => {
    let doc = await configc.findOne({
        key: "account-rawdata",
        type: "t-guet-account-data",
    });
    logger.warn("recvice cookie_invalid event: retry logging in");
    if (doc) {
        let { username, password } = doc.value;
        await client.login(username, password);
    }
});


export let saveUserRawData = async ({ username, password }) => {
    const createQuery = () => {
        return {
            key: "account-rawdata",
            type: "t-guet-account-data",
        };
    };
    let doc = await configc.findOne(createQuery());
    if (!doc) {
        await configc.insert((() => {
            let query = createQuery();
            query.value = {
                username: username,
                password: password,
            };
            query.visible = false;
            return query;
        })());
    } else {
        await configc.update(
            createQuery(),
            (() => {
                let query = createQuery();
                query.value = {
                    username: username,
                    password: password
                };
                query.visible = false;
                return query;
            })()
        );
    }
};

export let updatePassword = async (password) => {
    const createQuery = () => {
        return {
            key: "account-rawdata",
            type: "t-guet-account-data",
        };
    };
    let doc = await configc.findOne(createQuery());
    await configc.update(
        createQuery(),
        (() => {
            let query = createQuery();
            query.value = {
                username: doc.value.username,
                password: password
            };
            query.visible = false;
            return query;
        })()
    );
};