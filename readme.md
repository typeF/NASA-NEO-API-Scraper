# NASA Near Earth Object (NEO) API Scraper

## Introduction

Companion app for [Astrrisk](https://github.com/typeF/AstrRisk) that will download all NEO data from Nasa's API for a set date range, parse and format the data, and then output into a JSON file.

## Setup

- Get an API key from NASA and plug into .env file
- Set the date range that you want to scrape data from in the APIOptions variable **end date**

## Usage

```
node api.js 1990-12-31
```

Date should be formatted as YYYY-MM-DD
