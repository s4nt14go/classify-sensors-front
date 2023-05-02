# Classify sensors
<a href="https://app.netlify.com/sites/classify-sensors/deploys">
  <img src="https://api.netlify.com/api/v1/badges/aa76785f-8ad4-4042-97b9-824b533c13da/deploy-status" />
</a><br /><br />

We have a fleet of vehicles equipped with sensors for `loudness`, `bumpiness`, and `happiness`. The vehicles upload a file with this format:

```text
reference loudness 5 bumpiness 10 happiness 5
loudness 184744bf-6439-4c9b-aeba-42e8fb6a214d
2007-04-05T22:00 3
2007-04-05T22:01 2
loudness f8aa668d-96b6-4f64-8179-505fa291ebd3
2007-04-05T22:00 8
2007-04-05T22:01 6
happiness 184744bf-6439-4c9b-aeba-42e8fb6a214d
2007-04-05T22:00 1
2007-04-05T22:01 2
happiness f8aa668d-96b6-4f64-8179-505fa291ebd3
2007-04-05T22:00 7
2007-04-05T22:01 9
bumpiness f8aa668d-96b6-4f64-8179-505fa291ebd3
2007-04-05T22:00 7
2007-04-05T22:01 9
```

The first line has some reference values, then for the following line, the first word is the sensor type (`loudness`, `bumpiness` or `happiness`) and the second word is the sensor `id` (in the example above `184744bf-6439-4c9b-aeba-42e8fb6a214d` and `f8aa668d-96b6-4f64-8179-505fa291ebd3`), then some timestamped values.

We have to process the file in order to classify each sensor, so for the above input we should get the following classification:

```json5
{
  "184744bf-6439-4c9b-aeba-42e8fb6a214d": [
    "loudness",
    "happiness"
  ],
  "f8aa668d-96b6-4f64-8179-505fa291ebd3": [
    "loudness",
    "happiness",
    "bumpiness"
  ]
}
```

> You can use the file `exampleFile.log` to test the app

# Demo

[Click here](https://classify-sensors.netlify.app) to check the demo!

<br />
<p align="center">
    <a href="https://classify-sensors.netlify.app">
        <img src="doc/screenshot.png" />
    </a>
</p>
<br />

### Techs used in this frontend
* React, TypeScript
* Tailwind CSS
* CI/CD: Netlify

# Backend

In [this repo](https://github.com/s4nt14go/classify-sensors-back) you can take a look at the backend

# Instructions

1. After deploying the backend, you'll get the api url. So, to run React locally you'll have to set it through an environment variable. In the [config.js](src/config.js) we expect to work with `dev` and `prod` backend stages, as an example let's say we want to run the app against the `prod` stage, create an `.env` file with these env vars:

    ```dotenv
    REACT_APP_STAGE=prod
    REACT_APP_prod_API_URL=https://<your backend prod data>.execute-api.<your region>.amazonaws.com/prod
    ```

1. Use Node 14 version, using [nvm](https://github.com/nvm-sh/nvm) you can:

    ```
    # set Node 14 in current terminal
    nvm use 14
    # set Node 14 as default (new terminals will use 14)
    nvm alias default 14
    ```

1. Install dependencies

    ```shell script
    npm ci
    ```

1. Run locally

    ```shell script
    npm start
    ```
