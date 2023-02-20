import app from '../src/providers/http/createApp';

import { HTTP } from '../src/types/consts';
import Chai from './global-setup';

let APP: any;

describe('Bez Pruvo', () => {
  before(async () => {
    APP = await app;
  })

  it('ask Talabi', async () => {
    const getUrlResult = await Chai.request(APP)
      .get('/ask')


      getUrlResult.status.should.eql(HTTP.BAD_REQUEST)
  });

  it('ask Talabi2', async () => {
    const getUrlResult = await Chai.request(APP)
      .get('/ask')


      getUrlResult.status.should.eql(HTTP.OK)
  });
});
