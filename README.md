## Covid19 pandemic impact on US Financial Markets during January 2020 - March 2020

# Introduction
On January 7, 2020, the first confirmed case of a novel coronavirus, 2019-nCoV (Covid-19) was reported in
Wuhan, Hubei Province. Since then person to person transmission of Covid-19 has been occurring worldwide, including the first confirmed case reported in the United States on January 20, 2020. Covid-19 has been spreading
uncontrolled across the United States and has impacted the financial markets. The first quarter of 2020 was
the worst ever for the Dow and S&P 500. On March 16, 2020, the 2,997 point drop was the worst single-day drop in history. The previous record was four days earlier on March 12, 2020 when the Dow fell 2,353 point.  On March 31, 2020 the Dow recorded its worst first quarter in history, down 23.2%.

This project will analyze the US financial markets during this period through data from the following:
    1.  Dow Jones Industrial Averages (DJIA) - a stock market index that measures the stock performance of 30 large companies listed on the US stock exchanges.
    2.  S&P 500 (SNP)  - a stock market index that measures the stock performance of 500 large companies listed on the US stock exchanges.
    3. Nasdaq composite (NAS) - a stock market index of market capitalization-weighted index of equities listed on the Nasdaq stock exchange.
    4. Bitcoin (BTC) - The world’s largest cryptocurrency by market cap.
    5. VIX -  a measure of the stock market’s expectation of volatility based on S&P index options. It is often referred to as the fear index.


# Extract
Data on COVID19 was obtainged using an API call from https://covid19api.com/.
This data comes from a trusted source: Johns Hopkins Center for Systems Science and Engineering (CSSE).
The data is updated daily and includes a variety of information including summary of new and total cases per country, and cases by case type for a country from the first recorded case. There are also options to obtain "live" data where records are pulled every 10 minutes.

Data on financial markets came from  https://twelvedata.com/. We chose to use this API due to ease of use. But more importantly, this site provided access to everything we needed; stocks, forex, and cryptocurrencies. All data is available in real-time and historical formats. Twelve Data API also provides time series and technical indicators. It was free and there were no daily limits.


# Transform
Covid-19 cases
We wanted to create a chart by day of confirmed Covid-19 cases. While we could have chosen any country, we decided on the United States since we were analyzing the US financial markets. The process was fairly easy. The request returned a JSON file, which was then transformed into a DataFrame using Pandas in Python on a Jupyter Notebook. An index was added and the next step was to convert this into a CSV file.

Financials
Twelve Data has the option to return data in JSON or CSV. The team decided to use the JSON request to be consistent with the manner COVID-19 data was obtained.  The JSON file was transformed into a DataFrame using Pandas in Python on a Jupyter Notebook. Early in the project, we had unknowingly decided to view the data differently.
    1. Separate CSV files - Once into a Dataframe, we added an index and converted this into a CSV file. This resulted in a CSV file each for DJIA, SNP, NAS, and BTC.
    2. Combined - Once into a Dataframe, we did not add and index but instead needed to add "name" to identify the stock index. The Dataframes for DJIA, SNP, NAS and VIX were concantenated. Then an index was added and the file was converted into as CSV file.


# Load to SQLite
We used DB Browser for SQLite. This is a high quality, visual, open source tool to create, design, and edit database files compatible with SQLite. We imported the CSV files into DB Browser to create the sqlite database. Once completed, we used flask to load the database into several app routes. In creating the app route, we selected the columns we needed and thereby excluding those we did not use for our charts.


# Creating Charts
Using the app routes, we created three visualizations using Plotly. All three use a dropdown menu to select the financial index.
    1. Line and Barchart - The line chart of the selected stock market index would display with a bar chart of the US Covid cases. In order to emphasize the impact of the Covid-19 acceleration seen in March, the month of January was removed in the backend. 
    2. Multiple Line Chart - This chart adds a second line to the stock market index to illustrate the percent change of daily closing price. 
    3. Candlestick Chart - This chart provides daily information:  Opening Price, Closing Price,High and Low Price of the day.


# Conclusion
The start of the decline of the financial markets was not due to the number of US Covid19 cases. The peak for the DJI, SNP, Nasdaq were Feb 12, Feb 19, Feb 19 respectively. During that time the number of US Covid cases on those dates were 12 and 15 respectively.

The graph of the VIX showed some surprising results. On the day the VIX peaked on March 16:
    a. The number of US Covid cases were at 4,632 cases and was beginning its rapid acceleration.
    b. The first shelter in place order in the country was instituted in the greater Bay Area. This order began at 12:01 a.m. on March 17, 2020 and continued for three weeks through April 7, 2020. The rest of California and the US soon followed.
    c. The DJIA fell 2,997 points and was the worst single-day drop in history.

When VIX values are greater than 30, this is generally linked to volatility resulting from increased uncertainty, risk and investors fear. VIX values below 20 correspond to stable, stress free periods. The daily percent change graph supports this as the volatility remains low in Jan and Feb but experiences high volatility in March as the rapidly increasing number US Covid cases begin to impact the market.
    
The efficient market hypothesis states that all known information is already factored into the price of securities. From what we have seen in our analysis, we believe that is true as the market began to decline a month before its worst single day drop. When the markets begin its ascent, it could be an early indicator that the number of US Covid cases is starting to "flatten". However, a new factor has emerged that could prevent the markets from returning to levels seen at the start of the year : unemployment. As a result of Covid19 and the shelter in place across the country, a record-smashing 6.6 million unemployment claims were filed in one week.
