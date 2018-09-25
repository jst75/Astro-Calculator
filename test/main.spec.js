const express = require('express');
const path = require('path');
const nightmare = require('nightmare');
const expect = require('chai').expect;
const axios = require('axios');

const app = express();
app.use(express.static(path.join(__dirname, '../')));
app.listen(8888);

const url = 'http://localhost:8888/index.html';


describe('Change Calculator', function () {
  this.timeout(10000);
  this.slow(3000);

  it('should load successfully', () => axios.get(url).then(r => expect(r.status === 200)));

  describe('HTML', () => {
    let pageObject;

    before(() => {
      pageObject = nightmare().goto(url);
    });

    it('should contain an <input> element with an id of "user-weight"', () =>
      pageObject
        .evaluate(() => document.querySelector('#user-weight'))
        .then(input => expect(input).to.exist)
    );

    it('should contain a <select> element with an id of "planets"', () =>
      pageObject
        .evaluate(() => document.querySelector('#planets'))
        .then(input => expect(input).to.exist)
    );

    it('should contain a <p> element with an id of "output"', () =>
      pageObject
        .evaluate(() => document.querySelector('#output'))
        .then(input => expect(input).to.exist)
    );

    it('should contain a <button> element with an id of "calculate-button"', () =>
      pageObject
        .evaluate(() => document.querySelector('#calculate-button'))
        .then(input => expect(input).to.exist)
    );
  });

  describe('Integration', () => {
    let pageObject;

    beforeEach(() => {
      pageObject = nightmare().goto(url);
    });

    /**
     * Runs through all the movements and returns the promise
     * @param {object} pageOutput
     * @param {string} planetName
     * @param {string} input
     * @param {string} output
     */
    function execute(pageOutput, planetName, input, output) {
      return pageOutput
        .type('#user-weight', input)
        .select('#planets', planetName)
        .click('#calculate-button')
        .wait('#output')
        .evaluate(() => document.querySelector('#output').innerText)
        .then(x => expect(x).to.equal(`If you were on ${planetName}, you would weigh ${output}lbs!`))
    }

    const planetExpectations = [
      ['Pluto', '100', '6'],
      ['Neptune', '100', '114.8'],
      ['Uranus', '100', '91.7'],
      ['Saturn', '100', '113.9'],
      ['Jupiter', '100', '264'],
      ['Mars', '100', '38.95'],
      ['Moon', '100', '16.55'],
      ['Earth', '100', '100'],
      ['Venus', '100', '90.32'],
      ['Mercury', '100', '37.7'],
      ['Sun', '100', '2790']
    ];

    planetExpectations.forEach(([planetName, input, output]) => {
      it(`should print ${output} with ${planetName} selected and ${input} as weight`, () =>
        execute(pageObject, planetName, input, output)
      )
    });
  });
});
