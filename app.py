import os
import pandas as pd
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask import Flask, jsonify, render_template, redirect
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)
#################################################
# Database Setup
#################################################
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/crypto.sqlite"
db = SQLAlchemy(app)
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)
# Save references to each table
BTC = Base.classes.index_BTC
DJI = Base.classes.index_DJI
SNP = Base.classes.index_SNP
NAS = Base.classes.index_NAS
US_Covid19 = Base.classes.US_Covid19
STOCKS = Base.classes.stocks
PRCT_BTC = Base.classes.prct_change_BTC
PRCT_DJI = Base.classes.prct_change_dji
PRCT_NAS = Base.classes.prct_change_NAS
PRCT_SNP = Base.classes.prct_change_snp

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")
#controller route - API route
@app.route("/dji")
def dji():
    # Use Pandas to perform the sql query
    query = db.session.query(DJI.id,DJI.datetime,DJI.open,DJI.high,DJI.low,DJI.close,DJI.volume).all()
    df = pd.DataFrame(query)
    # Return a list of the column names 
    return jsonify(df.to_dict("record"))
@app.route("/btc")
def btc():
    # Use Pandas to perform the sql query
    query = db.session.query(BTC.id,BTC.datetime,BTC.open,BTC.high,BTC.low,BTC.close).all()
    df = pd.DataFrame(query)
    # Return a list of the column names 
    return jsonify(df.to_dict("record"))
@app.route("/snp")
def snp():
    # Use Pandas to perform the sql query
    query = db.session.query(SNP.id,SNP.datetime,SNP.open,SNP.high,SNP.low,SNP.close).all()
    df = pd.DataFrame(query)
    # Return a list of the column names 
    return jsonify(df.to_dict("record"))
@app.route("/nas")
def nas():
    # Use Pandas to perform the sql query
    query = db.session.query(NAS.id,NAS.datetime,NAS.open,NAS.high,NAS.low,NAS.close).all()
    df = pd.DataFrame(query)
    # Return a list of the column names 
    return jsonify(df.to_dict("record"))
@app.route("/us")
def us():
    """Return a list of sample names."""
    # Use Pandas to perform the sql query
    query = db.session.query(US_Covid19.id,US_Covid19.Date,US_Covid19.Cases).all()
    df = pd.DataFrame(query)
    # Return a list of the column names 
    return jsonify(df.to_dict("record"))
@app.route("/stocks")
def stocks():
    """Return a list of sample names."""
    # Use Pandas to perform the sql query
    query = db.session.query(STOCKS.id,STOCKS.name,STOCKS.datetime,STOCKS.open,STOCKS.high,STOCKS.low,STOCKS.close).all()
    df = pd.DataFrame(query)
    # Return a list of the column names 
    return jsonify(df.to_dict("record"))

@app.route("/percentbtc")
def prct_btc():
    """Return a list of sample names."""
    # Use Pandas to perform the sql query
    query = db.session.query(PRCT_BTC.id, PRCT_BTC.datetime, PRCT_BTC.open, PRCT_BTC.high, PRCT_BTC.low, PRCT_BTC.close_dji, PRCT_BTC.prct_close, PRCT_BTC.close).all()
    df = pd.DataFrame(query)
    # Return a list of the column names 
    return jsonify(df.to_dict("record"))

@app.route("/percentdji")
def prct_dji():
    """Return a list of sample names."""
    # Use Pandas to perform the sql query
    query = db.session.query(PRCT_DJI.id, PRCT_DJI.datetime, PRCT_DJI.close_dji, PRCT_DJI.prct_close, PRCT_DJI.close).all()
    df = pd.DataFrame(query)
    # Return a list of the column names 
    return jsonify(df.to_dict("record"))

@app.route("/percentnas")
def prct_nas():
    """Return a list of sample names."""
    # Use Pandas to perform the sql query
    query = db.session.query(PRCT_NAS.id, PRCT_NAS.datetime, PRCT_NAS.open, PRCT_NAS.high, PRCT_NAS.low, PRCT_NAS.close_dji, PRCT_NAS.prct_close, PRCT_NAS.close).all()
    df = pd.DataFrame(query)
    # Return a list of the column names 
    return jsonify(df.to_dict("record"))

@app.route("/percentsnp")
def prct_snp():
    """Return a list of sample names."""
    # Use Pandas to perform the sql query
    query = db.session.query(PRCT_SNP.id, PRCT_SNP.datetime, PRCT_SNP.open, PRCT_SNP.high, PRCT_SNP.low, PRCT_SNP.close_dji, PRCT_SNP.prct_close, PRCT_SNP.close).all()
    df = pd.DataFrame(query)
    # Return a list of the column names 
    return jsonify(df.to_dict("record"))

if __name__ == "__main__":
    app.run(debug=True)