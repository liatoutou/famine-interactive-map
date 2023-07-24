const dfd = require("danfojs-node");
dfd.readCSV("./filtered_dataset.csv") //assumes file is in CWD
    .then(df => {
      let l = ["Awi/Agew", "Addis Adaba"]
      let condition = df['admin_name'].eq(l[0])
      for (let i = 1; i < l.length; i++) {
        condition = condition.or(df['admin_name'].eq(l[i]))
      }
      let query_df = df.query(condition)
      // write query_df to csv
      dfd.toCSV(query_df, {filePath: "query_df.csv"})
    })