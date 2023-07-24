const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const dfd = require("danfojs-node");


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ------------ IPC functions ------------------

app.get("/api/get_mean_ipc_date_new", (req, res) => {
  dfd.readCSV("./filtered_dataset.csv")
  .then(df => {
    let minDate = Number(req.query.minDate);
    let maxDate = Number(req.query.maxDate);
    let date_mask = df['timestamp'].ge(minDate).and(df['timestamp'].le(maxDate));

    df = df.query(date_mask)
    df = df.loc({ columns: ["date", "fews_ipc"] });

    // drop rows with NaN values
    df = df.dropNa({ axis: 1 });

    let grp = df.groupby(['date'])
    let result = grp.col(["fews_ipc"]).mean().rename({fews_ipc_mean: "ipc", date: "date"})
    if (result.shape[0] > 0) { // Check if the result has any rows
      res.send(dfd.toJSON(result));
    } else {
      res.status(500).send({ error: 'No data available for given query' });
    }
  })
  .catch(err => {
    console.error(err);
    res.status(500).send({ error: 'An error occurred' });
  });
});

app.get("/api/get_mean_ipc_date_by_region_new", (req, res) => {
  dfd.readCSV("./filtered_dataset.csv")
    .then(df => {
      let minDate = Number(req.query.minDate);
      let maxDate = Number(req.query.maxDate);
      let regions = req.query.regions
      console.log(regions)
      let condition = df['admin_name'].eq(regions[0])
      for (let i = 1; i < regions.length; i++) {
        condition = condition.or(df['admin_name'].eq(regions[i]))
      }
      
      let date_mask = df['timestamp'].ge(minDate).and(df['timestamp'].le(maxDate));
      let combined_mask = condition.and(date_mask);
      df = df.loc({ rows: combined_mask }); 
      df.print()

      df = df.loc({ columns: ["admin_name", "fews_ipc","date"] });
      df = df.dropNa({ axis: 1 });
      let grp = df.groupby(['date']);
      let result = grp.col(["fews_ipc"]).mean().rename({fews_ipc_mean: "y", admin_name: "region", date: "x"});
  
      if (result.shape[0] > 0) { // Check if the result has any rows
        res.send(dfd.toJSON(result));
      } else {
        res.status(500).send({ error: 'No data available for given query' });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({ error: 'An error occurred' });
    });
});



app.get("/api/get_ipc_mean_new", (req, res) => {
  dfd.readCSV("./filtered_dataset.csv")
    .then(df => {
      let minDate = Number(req.query.minDate)
      let maxDate = Number(req.query.maxDate)
      let country = req.query.country
      
      let country_mask = df['country'].eq(country);
      let date_mask = df['timestamp'].ge(minDate).and(df['timestamp'].le(maxDate))
      
      let combined_mask = country_mask.and(date_mask);

      df = df.loc({ rows: combined_mask }); 
      df = df.loc({ columns: ["admin_name", "fews_ipc"] });

      // drop rows with NaN values
      df = df.dropNa({ axis: 1 });
      

      let grp = df.groupby(['admin_name'])
      let result = grp.col(["fews_ipc"]).mean().rename({fews_ipc_mean: "ipc", admin_name: "region"})

      if (result.shape[0] > 0) { // Check if the result has any rows
        res.send(dfd.toJSON(result))
      } else {
        res.status(500).send({ error: 'No data available for given query' });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({ error: 'An error occurred' });
    });
});

app.get("/api/example", (req, res) => {
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
    res.send(dfd.toJSON(query_df))
  }).catch(err=>{
     console.log(err);
  })
});

// ------------ Anomalies functions --------

app.get("/api/get_rain_anom_sum", (req, res) => {
  dfd.readCSV("./filtered_dataset.csv")
    .then(df => {
      let minDate = Number(req.query.minDate)
      let maxDate = Number(req.query.maxDate)
      let country = req.query.country

      let country_mask = df['country'].eq(country);
      let date_mask = df['timestamp'].ge(minDate).and(df['timestamp'].le(maxDate))

      let combined_mask = country_mask.and(date_mask);

      df = df.loc({ rows: combined_mask });   
      

      df = df.loc({ columns: ["admin_name", "rain_anom"] });

      // drop rows with NaN values
      df = df.dropNa({ axis: 1 });

      let grp = df.groupby(['admin_name'])
      let result = grp.col(["rain_anom"]).sum().rename({rain_anom: "rain anomalies", admin_name: "region"})

      if (result.shape[0] > 0) { // Check if the result has any rows
        res.send(dfd.toJSON(result))
      } else {
        res.status(500).send({ error: 'No data available for given query' });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({ error: 'An error occurred' });
    });
});

app.get("/api/get_et_anom_sum", (req, res) => {
  dfd.readCSV("./filtered_dataset.csv")
    .then(df => {
      let minDate = Number(req.query.minDate)
      let maxDate = Number(req.query.maxDate)
      let country = req.query.country

      let country_mask = df['country'].eq(country);
      let date_mask = df['timestamp'].ge(minDate).and(df['timestamp'].le(maxDate))

      let combined_mask = country_mask.and(date_mask);

      df = df.loc({ rows: combined_mask });    

      df = df.loc({ columns: ["admin_name", "et_anom"] });

      // drop rows with NaN values
      df = df.dropNa({ axis: 1 });

      let grp = df.groupby(['admin_name'])
      let result = grp.col(["et_anom"]).sum().rename({et_anom: "et anomalies", admin_name: "region"})

      if (result.shape[0] > 0) { // Check if the result has any rows
        res.send(dfd.toJSON(result))
      } else {
        res.status(500).send({ error: 'No data available for given query' });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({ error: 'An error occurred' });
    });
});

app.get("/api/get_ndvi_anom_sum", (req, res) => {
  dfd.readCSV("./filtered_dataset.csv")
    .then(df => {
      let minDate = Number(req.query.minDate)
      let maxDate = Number(req.query.maxDate)
      let country = req.query.country

      let country_mask = df['country'].eq(country);
      let date_mask = df['timestamp'].ge(minDate).and(df['timestamp'].le(maxDate))

      let combined_mask = country_mask.and(date_mask);

      df = df.loc({ rows: combined_mask });    

      df = df.loc({ columns: ["admin_name", "ndvi_anom"] });

      // drop rows with NaN values
      df = df.dropNa({ axis: 1 });

      let grp = df.groupby(['admin_name'])
      let result = grp.col(["ndvi_anom"]).sum().rename({ndvi_anom: "ndvi anomalies", admin_name: "region"})

      if (result.shape[0] > 0) { // Check if the result has any rows
        res.send(dfd.toJSON(result))
      } else {
        res.status(500).send({ error: 'No data available for given query' });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({ error: 'An error occurred' });
    });
});

//-------------Violent Events functions ----------------

app.get("/api/get_acled_count_sum", (req, res) => {
  dfd.readCSV("./filtered_dataset.csv")
    .then(df => {
      let minDate = Number(req.query.minDate)
      let maxDate = Number(req.query.maxDate)
      let country = req.query.country

      let country_mask = df['country'].eq(country);
      let date_mask = df['timestamp'].ge(minDate).and(df['timestamp'].le(maxDate))

      let combined_mask = country_mask.and(date_mask);

      df = df.loc({ rows: combined_mask });    

      df = df.loc({ columns: ["admin_name", "acled_count"] });

      // drop rows with NaN values
      df = df.dropNa({ axis: 1 });

      let grp = df.groupby(['admin_name'])
      let result = grp.col(["acled_count"]).sum().rename({acled_count_sum: "Number of violent events", admin_name: "Region"})

      if (result.shape[0] > 0) { // Check if the result has any rows
        res.send(dfd.toJSON(result))
      } else {
        res.status(500).send({ error: 'No data available for given query' });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({ error: 'An error occurred' });
    });
});

app.get("/api/get_acled_fatalities_sum", (req, res) => {
  dfd.readCSV("./filtered_dataset.csv")
    .then(df => {
      let minDate = Number(req.query.minDate)
      let maxDate = Number(req.query.maxDate)
      let country = req.query.country

      let country_mask = df['country'].eq(country);
      let date_mask = df['timestamp'].ge(minDate).and(df['timestamp'].le(maxDate))

      let combined_mask = country_mask.and(date_mask);

      df = df.loc({ rows: combined_mask });    

      df = df.loc({ columns: ["admin_name", "acled_fatalities"] });

      // drop rows with NaN values
      df = df.dropNa({ axis: 1 });

      let grp = df.groupby(['admin_name'])
      let result = grp.col(["acled_fatalities"]).sum().rename({acled_fatalities_sum: "Number of fatalities", admin_name: "Region"})

      if (result.shape[0] > 0) { // Check if the result has any rows
        res.send(dfd.toJSON(result))
      } else {
        res.status(500).send({ error: 'No data available for given query' });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({ error: 'An error occurred' });
    });
});
//TODO:------------- functions for ndvi/et/rain_mean ----------
app.get("/api/get_rain_mean", (req, res) => {
  dfd.readCSV("./filtered_dataset.csv")
    .then(df => {
      let minDate = Number(req.query.minDate)
      let maxDate = Number(req.query.maxDate)
      let country = req.query.country

      let country_mask = df['country'].eq(country);
      let date_mask = df['timestamp'].ge(minDate).and(df['timestamp'].le(maxDate))

      let combined_mask = country_mask.and(date_mask);

      df = df.loc({ rows: combined_mask });    

      df = df.loc({ columns: ["admin_name", "rain_mean"] });

      // drop rows with NaN values
      df = df.dropNa({ axis: 1 });

      let grp = df.groupby(['admin_name'])
      let result = grp.col(["rain_mean"]).mean().rename({rain_mean: "rain_mean", admin_name: "Region"})

      if (result.shape[0] > 0) { // Check if the result has any rows
        res.send(dfd.toJSON(result))
      } else {
        res.status(500).send({ error: 'No data available for given query' });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({ error: 'An error occurred' });
    });
});
app.get("/api/get_et_mean", (req, res) => {
  dfd.readCSV("./filtered_dataset.csv")
    .then(df => {
      let minDate = Number(req.query.minDate)
      let maxDate = Number(req.query.maxDate)
      let country = req.query.country

      let country_mask = df['country'].eq(country);
      let date_mask = df['timestamp'].ge(minDate).and(df['timestamp'].le(maxDate))

      let combined_mask = country_mask.and(date_mask);

      df = df.loc({ rows: combined_mask });    

      df = df.loc({ columns: ["admin_name", "et_mean"] });

      // drop rows with NaN values
      df = df.dropNa({ axis: 1 });

      let grp = df.groupby(['admin_name'])
      let result = grp.col(["et_mean"]).mean().rename({rain_mean: "rain_mean", admin_name: "Region"})

      if (result.shape[0] > 0) { // Check if the result has any rows
        res.send(dfd.toJSON(result))
      } else {
        res.status(500).send({ error: 'No data available for given query' });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({ error: 'An error occurred' });
    });
});




//TODO:-------------population and pcts -----------






app.listen(3001, () => console.log("running on port 3001"));