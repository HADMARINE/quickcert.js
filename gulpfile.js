var gulp = require("gulp");
var ts = require("gulp-typescript");
var fs = require("fs");

gulp.task("build", function () {
  if (fs.existsSync("dist")) {
    fs.rmdirSync("dist", { recursive: true });
  }
  var merge = require("merge2");
  var tsProject = ts.createProject("tsconfig.json");

  var tsResult = tsProject.src().pipe(tsProject());

  return merge([
    tsResult.dts.pipe(gulp.dest(tsProject.config.compilerOptions.outDir)),
    tsResult.js.pipe(gulp.dest(tsProject.config.compilerOptions.outDir)),
  ]);
});
