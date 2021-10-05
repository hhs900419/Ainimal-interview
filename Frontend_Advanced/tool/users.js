const users = [];
//join user
function joinUser(id , username) {
    const user = {id , username};
    users.push(user);
    return user;
}
//find current user
function getCurUser(id) {
    return users.find(user => user.id === id);
}

//user leave
function userleave(id) {
    const index = users.find(user => user.id === id)
    if(index !== -1) {
        return users.splice(index, 1)[0];
    }
}

function getOnlineUser() {
    return users;
}

module.exports = {
    joinUser,
    getCurUser,
    userleave,
    getOnlineUser
};