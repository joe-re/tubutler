const gulp = require('gulp');
const glob = require('glob');
const util = require('util');
const cp = require('child_process');
const exec = util.promisify(cp.exec);

gulp.task('zip', () => {
  const build = (dir) => exec(`zip --symlinks ${dir}.zip -r ${dir}`);
  const releases = glob.sync('./release/*');
  return Promise.all(releases.map((dir) => build(dir)));
});
