let fetch = require('node-fetch')

const ERROR_CODE_DIC = {
    404: '404 Page Not Found',
    408: '408 Page Request Timeout',
    410: '410 Page Has Gone',
    451: '451 Page Is Illegal',
    500: '500 Server Error',
    502: '502 Bad Gateway',
    503: '503 Service Unavailable',
    504: '504 Gateway Timeout',
    509: '509 Bandwidth Limit Exceeded',
    520: '520 Unknown Error',
    521: '521 Server Is Down',
    523: '523 Unreachable Origin',
    524: '524 Timout Occurred',
    525: '525 SSL Handshake Failed',
    526: '526 Invalid SSL Certificate',
    999: 'Server Not Found'
}

const ARCHIVE_PAGE_URL = `https://web.archive.org/save/`
const REDIRECT_TYPE = "follow"
const REDIRECT_TIMES = 20;

module.exports = async function archivePage(url) {
    let escaped
    try {
        escaped = new URL(url).href
    } catch (e) {
        escaped = new URL(`https://${url}`).href
    }
    let options = {
        redirect: REDIRECT_TYPE,
        follow: REDIRECT_TIMES,
    };

    let res = await fetch(`${ARCHIVE_PAGE_URL}${url}`, options)
    if (res.ok) {
        console.log("have saved to way machine")
    } else {
        throw new Error(ERROR_CODE_DIC[res.status])
    }
}