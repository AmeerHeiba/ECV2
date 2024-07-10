(function() {
    // Function to get the current user from local storage
    function getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    // Function to check if the user is authorized to access the page
    function isAuthorized(requiredRole) {
        const currentUser = getCurrentUser();
        if (!currentUser) {
            return false;
        }
        const userRole = currentUser.role;
        return userRole === requiredRole || userRole === 'super_admin';
    }

    // Function to handle unauthorized access
    function handleUnauthorizedAccess() {
        alert('You are not authorized to view this page.');
        window.location.href = 'login.html'; // Redirect to login page or appropriate page
    }

    // Function to protect a page
    function protectPage(requiredRole) {
        if (!isAuthorized(requiredRole)) {
            handleUnauthorizedAccess();
        }
    }

    // Expose the functions to the global scope
    window.auth = {
        getCurrentUser: getCurrentUser,
        isAuthorized: isAuthorized,
        protectPage: protectPage
    };
})();
