//404 midellware  controller :  
export function get4O4(req, res, next) {
    res.status(404).render('error', { titlePage: 'error page ' });
}