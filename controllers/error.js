//404 midellware  controller :  
function get4O4(req, res, next){
    res.status(404).render('./views/error.ejs', { titlePage: 'error page ' });
}

module.exports = get4O4;