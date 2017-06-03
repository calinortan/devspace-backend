const exec = require('child_process').exec;

export default class ScriptRunner {
  public static computeStatsFor(userId) {
    if (userId == null) return null;
    
    exec(`python ./scripts/compute_stats.py ${userId}`, (error, stdout, stderr) => {
      if (error != null) {
        throw (error);
      }
      console.log(stdout);
    });
  }
}