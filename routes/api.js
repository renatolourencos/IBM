var express = require('express');
var router = express.Router();
var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');

var personality_insights = new PersonalityInsightsV3({
  username: '542ef4fe-6075-4491-b1df-4b50e25fe83a',
  password: 'u85T7M2qMqbW',
  version_date: '2016-10-19'
});

/*
 * Spanish example:
 *   'language' parameter is needed in 'es' since our
 *   text content is in Spanish.
 */
/*
personality_insights.profile(
  {
    text: 'Ingrese un texto de más de 100 palabras aquí...',
    headers: { 'Content-Language': 'es' }
  },
  function(err, response) {
    if (err) {
      console.log('error:', err);
    } else {
      console.log(JSON.stringify(response, null, 2));
    }
  }
);
*/


/* GET home page. */
router.get('/in', function(req, res, next) {
  personality_insights.profile({
      text: req.body.text
    },
    function(err, response) {
      if (err) {
        console.log('error:', err);
      } else {
        res.render('api', {
          title: 'API',
          resp: JSON.stringify(response, null, 2)
        });
        //console.log(JSON.stringify(response, null, 2));
      }
    }
  );
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('api', {
    title: 'API'
  });
});

/* post test. */
router.post('/', function(req, res) {
  personality_insights.profile({
      text: req.body.text
    },
    function(err, response) {
      if (err) {
        console.log('error:', err);
          res.render('api', { title: 'ERRO'});
      } else {
        res.render('api', {
          title: 'Analisis',
          openess : response['personality'][0].percentile,
          conscient : response['personality'][1].percentile,
          extrav : response['personality'][2].percentile,
          agreeb : response['personality'][3].percentile,
          emrang : response['personality'][4].percentile
          //resp: JSON.stringify(response, null, 2)
        });
        //console.log(JSON.stringify(response, null, 2));
      }
    }
  );
});

module.exports = router;