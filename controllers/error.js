exports.get404 = (request, response, next) => {
    response.render('404', {pageTitle: "Not Found", path: ''});
    // response.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
}
