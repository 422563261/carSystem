import model from './model'

let obj = {};
if (model.type) {
  obj = {
    'getCategory': '/ListKoubeiServlet.action',
    'getCountScore': '/CountPNServlet.action',
    'getCountTop5': '/CountTopWordsServlet.action',
    'getMore': '/SelectMoreServlet.action',
    'getDetail': '/SearchSentencesServlet.action',
    'getFeature': '/GetMostFeatureWordsServlet.action'
  }
} else {
  obj = {
    'getCategory': '/category',
    'getCountScore': '/countScore',
    'getCountTop5': '/countTop5',
    'getMore': '/more',
    'getDetail': '/sentence',
    'getFeature': '/feature'
  }
}
export default obj;
