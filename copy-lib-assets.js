/*
 * Copy the assets from project to the dist folder, since at the moment
 * it's not supported by angular.json file for the library project types.
 */

const fs = require('fs-extra');

(async function build() {
    await fs.ensureDir('dist/students-management-lib-fe/assets')
    await fs.ensureDir('projects/students-management-lib-fe/src/assets/stylesheets')
    await fs.copy('./projects/students-management-element/src/styles/students-management.css', './projects/students-management-lib-fe/src/assets/stylesheets/students-management.css')
    await fs.copy('./projects/students-management-lib-fe/src/assets', 'dist/students-management-lib-fe/assets/')
})()
