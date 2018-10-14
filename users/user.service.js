const config = require('config.json');
const jwt = require('jsonwebtoken');

// created 2 user for JSON response
const users = [{ id: 1, 
                username: 'Ash', 
                password: 'Ganga', 
                firstName: 'Ashwini', 
                lastName: 'Gangadhare', 
                menu: [{ description: 'Home', routePath: 'somethig' }, 
                       { description: 'About', routePath: 'somethig' }, 
                       { description: 'News', routePath: 'somethig' }] 
                },
                { id: 2, 
                  username: 'Adi', 
                  password: 'Pha', 
                  firstName: 'Aditya', 
                  lastName: 'Phatak', 
                  menu: [{ description: 'Home', routePath: 'somethig' }, 
                         { description: 'Career', routePath: 'somethig' }] 
                }];

  
module.exports = {
    authenticate,
    getUserInfo,
    getUserMenu
};

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ sub: user.id }, config.secret);
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    }
}

async function getUserInfo(id) { 
    const userInfo = users.find(u => u.id == id);
    if (userInfo) {
        return userInfo;
    }
}

async function getUserMenu(id) {
    const userMenu = users.find(u => u.id == id);
    if (userMenu) {
        return userMenu.menu;
    }
}
