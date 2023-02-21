import app from '../src/providers/http/createApp';

import { HTTP } from '../src/types/consts';
import Chai from './global-setup';

let APP: any;

describe('Bez Pruvo', () => {
  before(async () => {
    APP = await app;
  })

  it('ask Talabi', async () => {
    const res = await Chai.request(APP)
      .get('/ask')


      res.status.should.eql(HTTP.OK)
  });

  it('convert currency', async () => {
    const res = await Chai.request(APP)
      .post('/convert')
      .send({
        "currFrom": "USD",
        "currTo": "NGN",
        "amount": 100.60
      })


      res.status.should.eql(HTTP.CREATED)
  });
});
