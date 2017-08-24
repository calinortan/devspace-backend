/**
 * ScriptRunner.ts
 * Class providing methods for running python scripts
 */

const exec = require('child_process').exec;

export default class ScriptRunner {
  public static computeStatsFor(userId) {
    if (userId == null) return null;
    const path = `python ./scripts/compute_stats.py ${userId}`;
    exec(path, (error, stdout, stderr) => {
      if (error != null) {
        throw (error);
      }
      console.log(stdout);
    });
  }
}