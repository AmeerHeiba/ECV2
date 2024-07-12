class UserController {
    static getUserOrders(userId) {
        const orders = Order.getOrders();
        return orders.filter(order => order.userId === userId);
    }

    static updateUserDetails(userId, newDetails) {
        const users = User.getUsers();
        const userIndex = users.findIndex(user => user.id === userId);

        if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...newDetails };
            User.saveUsers(users);
            alert('Account details updated successfully.');
        } else {
            alert('User not found.');
        }
    }


    static setState(newState, id){
        const users = User.getUsers()
        const userIndex = users.findIndex(user => user.id === id);
        const newDetails = {state:newState};
      

        if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...newDetails };
            User.saveUsers(users);
            alert('Account details updated successfully.');
        } else {
            alert('User not found.');
        }
    }


    
        
    }

