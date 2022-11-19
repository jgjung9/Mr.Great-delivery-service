import { db } from '../database/database.js';

export async function findByUserNo(user_no) {
    return db
        .execute(`SELECT * FROM user WHERE user_no=(?)`, [user_no])
        .then((result) => {
            return result[0][0];
        })
        .catch(console.error);
}

export async function findByUserId(user_id) {
    return db
        .execute(`SELECT * FROM user WHERE user_id=(?)`, [user_id])
        .then((result) => {
            return result[0][0];
        })
        .catch(console.error);
}

export async function createUser(userInfo) {
    const { user_id, password, user_nm, phone_no } = userInfo;
    return db
        .execute(
            'INSERT INTO user (user_id, password, user_nm, phone_no) VALUES((?),(?),(?),(?))',
            [user_id, password, user_nm, phone_no]
        )
        .then((result) => {
            console.log(result);
            return result;
        })
        .catch(console.error);
}
