export const disableBackPage = () => {
    window.history.pushState(null, '', window.location.pathname);
    window.addEventListener('popstate', function (event) {
        window.history.pushState(null, '', window.location.pathname);
    });
};
