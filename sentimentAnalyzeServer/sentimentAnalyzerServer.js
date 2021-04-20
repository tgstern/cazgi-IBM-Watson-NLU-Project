const express = require('express');
const app = new express();
const dotenv = require('dotenv');
dotenv.config()

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const IBM_NLU = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const NLU = new IBM_NLU({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });
    return NLU;
}

const NLU = getNLUInstance()

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    const params = {
        'url': req.query.url,
        'features': {'emotion': {}},
    }

     NLU.analyze(params)
        .then(analysis => {
            return res.status(analysis.status).send(analysis.result.emotion.document.emotion)
        })
        .catch(err => {
            console.log('error:', err);
        });
});

app.get("/url/sentiment", (req,res) => {
    const params = {
        'url': req.query.url,
        'features': {'sentiment': {}},
    }

    NLU.analyze(params)
        .then(analysis => {
            return res.status(analysis.status).send(analysis.result.sentiment.document.label)
        })
        .catch(err => {
            console.log('error:', err);
        });
});

app.get("/text/emotion", (req,res) => {
    const params = {
        'text': req.query.text,
        'features': {'emotion': {}},
    }

    NLU.analyze(params)
        .then(analysis => {
            return res.status(analysis.status).send(analysis.result.emotion.document.emotion)
        })
        .catch(err => {
            console.log('error:', err);
        });
});

app.get("/text/sentiment", (req,res) => {
    const params = {
        'text': req.query.text,
        'features': {'sentiment': {}},
    }

    NLU.analyze(params)
        .then(analysis => {
            return res.status(analysis.status).send(analysis.result.sentiment.document.label)
        })
        .catch(err => {
            console.log('error:', err);
        });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})