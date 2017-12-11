import es from 'elasticsearch'

const EsClient = new es.Client({
  host: 'localhost:9200',
  log: 'trace'
});

export default {
  EsClient
}
