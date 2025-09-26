/**
 * The EPub library makes use of adm-zip, but adm-zip requires the 'fs' module.
 * adm-zip works in the browser context for extracting a zip, so long as the 
 * 'fs' module is "faked" with this version.
 */

const fs = {
    existsSync: null
}

exports.fs = fs;