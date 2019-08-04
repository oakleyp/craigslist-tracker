const Parser = require('rss-parser');
const url = require('url');
const https = require('https');
const request = require('request');

require('request-debug')(request);

class CraigslistScraper {
  constructor(rootUrl, searchText) {
    this.rootUrl = rootUrl;
    this.searchText = searchText;
    this.parser = new Parser({
      headers: {
        'User-Agent': 'curl/7.49.1',
      }
    });
  }

  async getListings(count) {
    let qstring = '';
    const results = [];
    let rcount = 0;
    const searchParm = encodeURIComponent(this.searchText);
    const uri = `${this.rootUrl}?format=rss&query=${searchParm}${qstring}`;
    // const url = 'https://www.reddit.com/.rss';

    // while (rcount < count) {
      // console.log('request for', uri);

      // const parseduri = url.parse(uri)

      // const opts = parseduri;
      // opts.headers = {
      //   'User-Agent': 'curl/7.49.1',
      // };

      // console.log('opts', opts);

      // const req = https.get(opts, function(res) {
      //   // console.log('got res', res);

      //   let data = '';
      //   res.on('data', (chunk) => {
      //     data += chunk;
      //   });

      //   res.on('end', function() {
      //     console.log('got data', data);
      //     console.log(JSON.parse(data));
      //   })

      // });

      request.debug = true;

      request(uri, function(err, resp, body) {
        // console.log(err, resp, body);
      });

      // req.on('error', function(err) {
      //   console.log('req err', err);
      // });
      // try {
      //   const feed = await this.parser.parseURL(uri);
      //   console.log('got feed', feed);
      //   feed.items.forEach(console.log);
      // } catch (e) {
      //   console.log('ERR', e);
      // }

      
    // }


  }
}

module.exports = CraigslistScraper;